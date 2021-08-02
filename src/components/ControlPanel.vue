<template lang="pug">
#control-panel
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ControlPanel',
  setup() {}
});
</script>

<style lang="scss" scoped>
#control-panel {
  width: calc(100% - 80px);
  height: 100px;
  position: absolute;
  bottom: 0;

  background: transparent linear-gradient(180deg, #772020 0%, #361024 100%) 0%
    0% no-repeat padding-box;
}
</style>
