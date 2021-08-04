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
  ControlPanel
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

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
    const state = reactive({
      albumData: AlbumData,
      currentSong: null as null | Song
    });

    state.currentSong = state.albumData.songList[0];

    const getDuration = (audioData: HTMLAudioElement): Promise<number> => {
      return new Promise((resolve) => {
        audioData.onloadeddata = () => {
          resolve(Math.floor(audioData.duration));
        };
      });
    };

    const playAllSongsEmitHandler = () => {
      state.currentSong = state.albumData.songList[0];
    };

    const playSongEmitHandler = (songID: string) => {
      const index: number = state.albumData.songList.findIndex((song: Song) => {
        return song.id === songID;
      });
      if (index !== -1) {
        state.currentSong = state.albumData.songList[index];
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

    // preload metadata and setting data here
    (async () => {
      state.albumData.songList = await Promise.all(
        state.albumData.songList.map(async (song) => {
          const duration = await getDuration(song.data);
          return { ...song, duration };
        })
      ).then((results) => results);
    })();

    return {
      ...toRefs(state),
      playSongEmitHandler,
      toggleSongLikeEmitHandler,
      playAllSongsEmitHandler
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
