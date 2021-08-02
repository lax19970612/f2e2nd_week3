<template lang="pug">
.container
  .home-contain-wrapper
    ArtistPanel.table__cell__4
    Album.table__cell__8
  UserPanel
  ControlPanel
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserPanel from '../components/UserPanel.vue';
import ControlPanel from '../components/ControlPanel.vue';
import Album from './home/Album.vue';
import ArtistPanel from './home/ArtistPanel.vue';

export default defineComponent({
  name: 'Home',
  components: {
    UserPanel,
    ControlPanel,
    Album,
    ArtistPanel
  },

  setup() {}
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
