<template lang="pug">
#artist-panel
  .artist-info
    .artist-info-top
      .artist-info-subtitle ARTIST
      .artist-info-name anno domini beats
    .artist-info-bot
      .artist-info-follower
        span ???,???
        span Followers
      .button.button-following following
      .button.button-play-all-songs(@click="playAllSongs") play
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArtistPanel',
  setup(props, { emit }) {
    const playAllSongs = () => {
      emit('playAllSongsEmit');
    };

    return {
      playAllSongs
    };
  }
});
</script>

<style lang="scss" scoped>
#artist-panel {
  min-width: 400px;
  background-image: url('../../assets/Anno_Domini_Beats.jpg');
  background-size: cover;
}

.artist-info {
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;

  padding: 0 40px 60px 40px;

  &-top,
  &-bot {
    width: 100%;
    height: 50%;
    display: flex;
  }

  &-top {
    flex-direction: column;
  }

  &-bot {
    justify-content: space-between;
    align-items: flex-end;
  }

  &-subtitle {
    font-size: 14px;
    color: #e5b4b7;
    text-transform: uppercase;
  }

  &-name {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
  }

  &-follower {
    display: flex;
    flex-direction: column;

    span {
      font-size: 11px;
      color: #fff;
    }
  }
}
.button {
  cursor: pointer;
  width: 128px;
  height: 30px;
  border-radius: 17px;

  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 30px;
  text-align: center;
}

.button-following {
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid #fff;
}

.button-play-all-songs {
  border: 1px solid #964a4d;
  background-color: #964a4d;
  color: #fff;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
