<template lang="pug">
#control-panel
  .progress-bar-wrapper(@click="jumpToTime($event)")
    .progress-bar-buffered(:style="`width: ${bufferTime / duration * 100}%`")
    .progress-bar-played(:style="`width: ${currentTime / duration * 100}%`")
  .progress-bar-time-wrapper
    span.progress-bar-time {{ durationFormat(currentTime) }}
    span.progress-bar-time {{ durationFormat(duration) }}
  .controller
    .table__cell__4.song-info-wrapper
      .table__cell__3.song-info-album-wrapper
        img(:src="currentSong?.coverUrl" alt="/")
      .table__cell__9.song-info
        .song-info-name {{ currentSong?.name }}
        .song-info-artist {{ currentSong?.artist }}
    .table__cell__4.controller-main
      span.button.button-shuffle(:class="{'button-shuffle-toggled': isShuffle}" @click="shufflePlayToggle")
      span.button.button-presong(@click="prevSongPlay")
      span.button.button-controller-wrapper(@click="togglePlay")
        span(:class="[ isPlaying ? 'button-pause' : 'button-play']")
      span.button.button-nxtsong(@click="nextSongPlay")
      span.button.button-repeat(:class="{'button-repeat-toggled': isLoop}" @click="loopPlayToggle")
    .table__cell__4.controller-sub
      .table__cell__8.volume-controller
        img(src="../assets/svg/controlPanel/ic_volume_up_24px.svg")
        .volume-progress-bar-wrapper(@click="volumeUpdate($event)")
          .volume-progress-bar(:style="`width: ${volume * 100}%`")
      .table__cell__4.button(:class="[currentSong.like ? 'button-like' : 'button-not-like-yet']" @click="toggleSongLike")
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, watch } from 'vue';
import Song from '../interfaces/song';

export default defineComponent({
  name: 'ControlPanel',
  props: {
    currentSong: {
      type: Object as PropType<Song> | null,
      required: true
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      audioController: new Audio(props.currentSong?.data?.src),
      duration: props.currentSong?.duration,
      currentTime: 0,
      bufferTime: 0,
      volume: 0.5,
      isPlaying: false,
      isShuffle: false,
      isLoop: false
    });

    const audioInitSetting = () => {
      state.audioController.volume = state.volume;

      state.audioController.onloadedmetadata = () => {
        if (state.audioController.buffered.length) {
          const bufferTime: number =
            state.audioController.buffered.end(0) -
            state.audioController.buffered.start(0);
          state.bufferTime = bufferTime;
        }
        state.duration = state.audioController.duration;
      };

      state.audioController.ontimeupdate = () => {
        if (state.audioController.buffered.length) {
          const bufferTime: number =
            state.audioController.buffered.end(0) -
            state.audioController.buffered.start(0);
          state.bufferTime = bufferTime;
        }
        state.currentTime = state.audioController.currentTime;
      };

      state.audioController.onended = () => {
        nextSongPlay();
      };
    };

    audioInitSetting();

    const togglePlay = () => {
      state.isPlaying = !state.isPlaying;
    };

    const prevSongPlay = () => {
      if (state.currentTime > 1) {
        state.currentTime = 0;
        state.audioController.currentTime = 0;
      } else {
        emit('prevSongPlayEmit', {
          isShuffle: state.isShuffle,
          isLoop: state.isLoop,
          isPlaying: state.isPlaying
        });
      }
    };

    const nextSongPlay = () => {
      emit('nextSongPlayEmit', {
        isShuffle: state.isShuffle,
        isLoop: state.isLoop,
        isPlaying: state.isPlaying
      });
    };

    const shufflePlayToggle = () => {
      state.isShuffle = !state.isShuffle;
    };

    const loopPlayToggle = () => {
      state.isLoop = !state.isLoop;
    };

    const jumpToTime = (event: Event) => {
      const target = event.target as HTMLElement;
      const width: number = target.classList.contains('progress-bar-wrapper')
        ? target.offsetWidth
        : target.parentElement?.offsetWidth || 0;
      const time = ((event as PointerEvent).x / width) * state.duration;
      state.currentTime = time;
      state.audioController.currentTime = time;
    };

    const volumeUpdate = (event: Event) => {
      const target = event.target as HTMLElement;
      const width: number = target.classList.contains(
        'volume-progress-bar-wrapper'
      )
        ? target.offsetWidth
        : target.parentElement?.offsetWidth || 0;
      const left = target.classList.contains('volume-progress-bar-wrapper')
        ? target.getBoundingClientRect().left
        : target.parentElement?.getBoundingClientRect().left || 0;

      const volume = ((event as PointerEvent).x - left) / width;
      state.volume = volume;
      state.audioController.volume = volume;
    };

    const toggleSongLike = () => {
      emit('toggleSongLikeEmit', props.currentSong.id);
    };

    const durationFormat = (duration: number) => {
      const minute: string = Math.floor(duration / 60)
        .toString()
        .padStart(2, '0');
      const second: string = (Math.floor(duration) % 60)
        .toString()
        .padStart(2, '0');
      return `${minute}:${second}`;
    };

    watch(
      () => props.currentSong,
      (song: Song) => {
        state.duration = song.duration;
        state.currentTime = 0;
        // the part play/pause song
        state.audioController?.pause();
        state.audioController = new Audio(song.data?.src);
        audioInitSetting();
        if (state.isPlaying) {
          state.audioController?.play();
        }
      },
      { deep: true }
    );

    watch(
      () => state.isPlaying,
      (isPlaying: boolean) => {
        isPlaying
          ? state.audioController?.play()
          : state.audioController?.pause();
      }
    );

    return {
      ...toRefs(state),
      togglePlay,
      prevSongPlay,
      nextSongPlay,
      shufflePlayToggle,
      loopPlayToggle,
      jumpToTime,
      volumeUpdate,
      toggleSongLike,
      durationFormat
    };
  }
});
</script>

<style lang="scss" scoped>
#control-panel {
  width: calc(100% - 80px);
  min-width: 900px;
  height: 100px;
  position: absolute;
  bottom: 0;

  background: transparent linear-gradient(180deg, #772020 0%, #361024 100%) 0%
    0% no-repeat padding-box;
}

.progress-bar {
  &-wrapper {
    width: 100%;
    height: 13px;
    background-color: #fff;

    cursor: pointer;
  }

  &-buffered {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #eaeaea;
    transition: width 0.3s ease;
  }

  &-played {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #e5b4b7;
    transition: width 0.3s ease;
  }
}

.progress-bar-time {
  &-wrapper {
    width: 100%;
    height: 20px;
    padding: 2px 24px;
    display: flex;
    justify-content: space-between;
  }

  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0px;
}

.song-info {
  &-wrapper {
    display: flex;
    padding-left: 70px;
  }

  &-album-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;

    img {
      width: 40px;
      height: 40px;
    }
  }

  display: flex;
  flex-direction: column;

  &-name {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }

  &-artist {
    color: #fff;
    font-size: 12px;
    text-transform: uppercase;
  }
}

.controller {
  width: 100%;
  height: 67px;
  display: flex;
  padding-bottom: 10px;

  &-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    cursor: pointer;
    margin: 0 15px;

    &-shuffle {
      width: 16px;
      height: 16px;
      background-color: #fff;
      mask: url('../assets/svg/controlPanel/ic_shuffle_24px.svg') 0% 0%
        no-repeat padding-box;

      &-toggled {
        background-color: #964a4d;
      }
    }

    &-presong {
      width: 25px;
      height: 15px;
      background: transparent url('../assets/svg/controlPanel/Component.svg') 0%
        0% no-repeat padding-box;
      transform: matrix(-1, 0, 0, -1, 0, 0);
    }

    &-nxtsong {
      width: 25px;
      height: 15px;
      background: transparent url('../assets/svg/controlPanel/Component.svg') 0%
        0% no-repeat padding-box;
    }

    &-repeat {
      width: 18px;
      height: 20px;
      background-color: #fff;
      mask: url('../assets/svg/controlPanel/ic_repeat_24px.svg') 0% 0% no-repeat
        padding-box;

      &-toggled {
        background-color: #964a4d;
      }
    }

    &-controller-wrapper {
      width: 54px;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      border-radius: 50%;

      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.2);
      }
    }

    &-pause {
      width: 0;
      height: 22px;
      border-style: double;
      border-width: 0 0 0 22px;
      border-color: #fff;
      margin-left: 0;
      transition: all 0.3s ease;
    }

    &-play {
      width: 0;
      height: 22px;
      margin-left: 5.5px;
      border-style: solid;
      border-width: 11px 0 11px 22px;
      border-color: transparent transparent transparent #fff;
      transition: all 0.3s ease;
    }
  }

  &-sub {
    display: flex;
    align-items: center;
  }
}

.volume {
  &-controller {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-progress-bar {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    background-color: #964a4d;
    border-radius: 3px;

    &-wrapper {
      margin-left: 15px;
      width: 100px;
      height: 6px;
      background-color: #fff;
      border-radius: 3px;

      cursor: pointer;
    }
  }
}

.button-like {
  width: 24px;
  height: 22px;
  background: transparent url('../assets/svg/controlPanel/heart-like.svg')
    center center no-repeat padding-box;
}

.button-not-like-yet {
  width: 24px;
  height: 22px;
  background: transparent url('../assets/svg/controlPanel/heart-2.svg') center
    center no-repeat padding-box;
}
</style>
