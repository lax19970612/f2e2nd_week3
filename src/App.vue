<template lang="pug">
Home
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './views/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home
  }
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  position: relative;
}

html,
body {
  margin: 0 auto;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
