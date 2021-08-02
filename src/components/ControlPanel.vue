<template lang="pug">
#control-panel
  .progress-bar-wrapper
    .progress-bar-buffered
    .progress-bar-played
  .progress-bar-time-wrapper
    span.progress-bar-time 1:38
    span.progress-bar-time 3:39
  .controller
    .table__cell__4.song-info-wrapper
      .table__cell__3.song-info-album-wrapper
        img(src="../assets/Anno_Domini_Beats.jpg" alt="/")
      .table__cell__9.song-info
        .song-info-name Homebound
        .song-info-artist ANNO DOMINI BEATS
    .table__cell__4.controller-main
      span.button.button-shuffle
      span.button.button-presong
      span.button.button-controller-wrapper
        span.button-pause
      span.button.button-nxtsong
      span.button.button-repeat
    .table__cell__4.controller-sub
      .table__cell__8.volumn-controller
        img(src="../assets/svg/controlPanel/ic_volume_up_24px.svg")
        .volumn-progress-bar-wrapper
          .volumn-progress-bar
      .table__cell__4.button.button-not-like-yet
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
  }

  &-buffered {
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    background-color: #eaeaea;
  }

  &-played {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background-color: #e5b4b7;
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

.volumn {
  &-controller {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-progress-bar {
    position: absolute;
    top: 0;
    left: 0;

    width: 70%;
    height: 100%;
    background-color: #964a4d;
    border-radius: 3px;

    &-wrapper {
      margin-left: 15px;
      width: 100px;
      height: 6px;
      background-color: #fff;
      border-radius: 3px;
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
