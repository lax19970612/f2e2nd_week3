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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap');

@mixin table__cell($ratio) {
  width: calc(100% / 12 * #{$ratio});
  height: 100%;
}

.table__cell__1 {
  @include table__cell(1);
}
.table__cell__2 {
  @include table__cell(2);
}
.table__cell__3 {
  @include table__cell(3);
}
.table__cell__4 {
  @include table__cell(4);
}
.table__cell__5 {
  @include table__cell(5);
}
.table__cell__6 {
  @include table__cell(6);
}
.table__cell__7 {
  @include table__cell(7);
}
.table__cell__8 {
  @include table__cell(8);
}
.table__cell__9 {
  @include table__cell(9);
}
.table__cell__10 {
  @include table__cell(10);
}
.table__cell__11 {
  @include table__cell(11);
}
.table__cell__12 {
  @include table__cell(12);
}

* {
  box-sizing: border-box;
  position: relative;
  font-family: 'Poppins', sans-serif;
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
