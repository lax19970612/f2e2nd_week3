<template lang="pug">
aside#user-panel
  .avatar-wrapper
    .avatar
  nav.nav-bar
    a.link-button
      img(src="../assets/svg/userPanel/home-52.svg")
    a.link-button
      img(src="../assets/svg/userPanel/ic_library_music_48px.svg")
    a.link-button
      img(src="../assets/svg/userPanel/archive-2.svg")
  .setting-bar
    a.link-button
      img(src="../assets/svg/userPanel/zoom-2.svg")
    a.link-button
      img(src="../assets/svg/userPanel/settings-gear-63.svg")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserPanel',
  setup() {}
});
</script>

<style lang="scss" scoped>
#user-panel {
  width: 80px;
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 3;

  background-color: #4b3434;
}

.avatar-wrapper {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;

  .avatar {
    width: 56px;
    height: 56px;
    background-color: #ffffff34;
    border: 1px solid #707070;
    border-radius: 50%;
  }
}

.nav-bar {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.setting-bar {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.link-button {
  margin: 25px 0;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
}
</style>
