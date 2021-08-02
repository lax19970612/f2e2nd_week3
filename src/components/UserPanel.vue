<template lang="pug">
#user-panel
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

  background-color: #4b3434;
}
</style>
