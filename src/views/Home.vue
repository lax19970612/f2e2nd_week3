<template lang="pug">
.container
  .home-contain-wrapper
    ArtistPanel.table__cell__4(
      @playAllSongsEmit="playAllSongsEmitHandler"
    )
    Album.table__cell__8(
      :data="albumData"
      :currentSong="currentSong"
      @playSongEmit="playSongEmitHandler"
      @toggleSongLikeEmit="toggleSongLikeEmitHandler")
  UserPanel
  ControlPanel(
    ref="controlPanelRef"
    :currentSong="currentSong"
    @prevSongPlayEmit="prevSongPlayEmitHandler"
    @nextSongPlayEmit="nextSongPlayEmitHandler"
    @toggleSongLikeEmit="toggleSongLikeEmitHandler"
  )
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';

import UserPanel from '../components/UserPanel.vue';
import ControlPanel from '../components/ControlPanel.vue';
import Album from './home/Album.vue';
import ArtistPanel from './home/ArtistPanel.vue';

import Song from '../interfaces/song';
import AlbumData from '../assets/AlbumData';

export default defineComponent({
  name: 'Home',
  components: {
    UserPanel,
    ControlPanel,
    Album,
    ArtistPanel
  },

  setup() {
    const controlPanelRef = ref();

    const state = reactive({
      albumData: AlbumData,
      currentSong: null as null | Song,
      playList: JSON.parse(JSON.stringify(AlbumData.songList)),
      shufflePlayList: [] as Song[]
    });

    const getDuration = (audioData: HTMLAudioElement): Promise<number> => {
      return new Promise((resolve) => {
        audioData.onloadedmetadata = () => {
          resolve(Math.floor(audioData.duration));
        };
      });
    };

    // shuffle playlist
    const shufflePlayList = (array: any[]): any[] => {
      let shuffledArray = JSON.parse(JSON.stringify(array));
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j: number = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i]
        ];
      }
      return shuffledArray;
    };

    state.currentSong = state.playList[0];
    state.shufflePlayList = shufflePlayList(state.playList) as Song[];

    // album and atrist component handler
    const playAllSongsEmitHandler = () => {
      state.playList = state.albumData.songList;
      state.currentSong = state.playList[0];
    };

    const playSongEmitHandler = (songID: string) => {
      const index: number = state.albumData.songList.findIndex((song: Song) => {
        return song.id === songID;
      });
      if (index !== -1) {
        state.playList = state.albumData.songList.slice(index);
        state.currentSong = state.playList[0];
      }
    };

    const toggleSongLikeEmitHandler = (songID: string) => {
      const index: number = state.albumData.songList.findIndex((song: Song) => {
        return song.id === songID;
      });

      if (index !== -1) {
        state.albumData.songList[index].like =
          !state.albumData.songList[index].like;
      }
    };

    // control panel component handler
    const prevSongPlayEmitHandler = (preload: {
      isShuffle: boolean;
      isLoop: boolean;
      isPlaying: boolean;
    }) => {
      if (preload.isShuffle) {
        const curShuffleSongIndex = state.shufflePlayList.findIndex((song) => {
          return song.id === state.currentSong?.id;
        });
        let nextShuffleSongIndex: number =
          curShuffleSongIndex - 1 < 0
            ? state.shufflePlayList.length - 1
            : curShuffleSongIndex - 1;
        state.currentSong = state.shufflePlayList[nextShuffleSongIndex];

        // reorder playlist
        let songIndex: number = state.albumData.songList?.findIndex((song) => {
          return song.id === state.currentSong?.id;
        });
        state.playList = JSON.parse(
          JSON.stringify(state.albumData.songList)
        ).splice(songIndex);
      } else {
        const curIndex: number = state.albumData.songList.findIndex(
          (song: Song) => {
            return song.id === state.currentSong?.id;
          }
        );
        if (curIndex !== -1) {
          if (curIndex !== 0) {
            state.playList.unshift(state.albumData.songList[curIndex - 1]);
          } else {
            if (preload.isLoop) {
              state.playList = [
                state.albumData.songList[state.albumData.songList.length - 1]
              ];
            } else {
              if (preload.isPlaying) controlPanelRef.value.togglePlay();
            }
          }
          state.currentSong = state.playList[0];
        }
      }
    };

    const nextSongPlayEmitHandler = (preload: {
      isShuffle: boolean;
      isLoop: boolean;
      isPlaying: boolean;
    }) => {
      if (preload.isShuffle) {
        const curShuffleSongIndex = state.shufflePlayList.findIndex((song) => {
          return song.id === state.currentSong?.id;
        });
        let nextShuffleSongIndex: number =
          curShuffleSongIndex + 1 >= state.shufflePlayList.length
            ? 0
            : curShuffleSongIndex + 1;
        state.currentSong = state.shufflePlayList[nextShuffleSongIndex];

        // reorder playlist
        let songIndex: number = state.albumData.songList?.findIndex((song) => {
          return song.id === state.currentSong?.id;
        });
        state.playList = JSON.parse(
          JSON.stringify(state.albumData.songList)
        ).splice(songIndex);
      } else {
        state.playList.shift();
        if (!state.playList.length) {
          state.playList = JSON.parse(JSON.stringify(state.albumData.songList));
          if (!preload.isLoop && preload.isPlaying) {
            controlPanelRef.value.togglePlay();
          }
        }
        state.currentSong = state.playList[0];
      }
    };

    // preload metadata and setting data here
    (async () => {
      state.albumData.songList = await Promise.all(
        state.albumData.songList.map(async (song) => {
          const duration = await getDuration(new Audio(song.audioUrl));
          return { ...song, duration };
        })
      ).then((results) => results);
    })();

    return {
      controlPanelRef,
      ...toRefs(state),
      playSongEmitHandler,
      toggleSongLikeEmitHandler,
      playAllSongsEmitHandler,
      prevSongPlayEmitHandler,
      nextSongPlayEmitHandler
    };
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.home-contain {
  &-wrapper {
    width: calc(100% - 80px);
    height: calc(100% - 100px);

    background-color: #1a1a1a;
    display: flex;
  }
}
</style>
