<template lang="pug">
#album
  .album-info-wrapper
    .table__cell__3.album-cover-wrapper
      img.album-cover(src="../../assets/Anno_Domini_Beats.jpg")
    .table__cell__9.album-info
      .album-publish-years 2019
      .album-title ANNO DOMINI BEATS
      .album-button-play-all-songs PLAY
  .album-songlist
    .album-songlist-table-header
      .table__cell__2
      .table__cell__5.album-songlist-song-name TITLE
      .table__cell__2.album-songlist-song-length LENGTH
      .table__cell__3.album-songlist-song-like
        img(src="../../assets/svg/album/heart-header.svg")
    .album-songlist-table-row
      .table__cell__2.album-songlist-song-index
        img(src="../../assets/svg/album/ic_music_note_24px.svg")
        span 1
      .table__cell__5.album-songlist-song-name Homebound
      .table__cell__2.album-songlist-song-length 3:17
      .table__cell__3.album-songlist-song-like
        span 12,523
        .button-song.button-song-notlike-yet
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Album',
  setup() {}
});
</script>

<style lang="scss" scoped>
#album {
  background-color: #1a1a1a;
  min-width: 575px;
  overflow-x: hidden;
}

.album {
  &-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &-wrapper {
      width: 100%;
      height: 23%;
      display: flex;
    }
  }

  &-cover {
    width: 90px;
    height: 90px;

    &-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding-right: 30px;
    }
  }

  &-publish-years {
    color: #707070;
    font-weight: bold;
    font-size: 14px;
  }

  &-title {
    font-size: 32px;
    color: #fff;
    font-weight: bold;
  }

  &-button-play-all-songs {
    width: 128px;
    height: 30px;
    border-radius: 17px;
    background-color: #964a4d;
    border: 1px solid #964a4d;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;

    cursor: pointer;
  }

  &-songlist {
    width: 100%;
    height: 77%;
    padding-top: 30px;

    & > * {
      border-bottom: 0.2px solid #707070;
    }

    &-table {
      &-header {
        display: flex;
        height: 30px;
        color: #964a4d;
        font-size: 14px;
        font-weight: bold;

        & > div {
          line-height: 30px;
        }
      }

      &-row {
        display: flex;
        width: 100%;
        height: 56px;
        color: #fff;
        font-size: 18px;

        & > div {
          line-height: 56px;
        }
      }
    }

    &-song {
      &-index,
      &-length,
      &-like {
        text-align: center;
      }
      &-name {
        text-align: left;
      }
      &-index,
      &-like {
        & > *:not(:first-child) {
          margin-left: 20px;
        }
      }
      &-index {
        padding-right: 15px;
      }
    }
  }
}

.button-song {
  display: inline-block;
  width: 15px;
  height: 13.875px;
  cursor: pointer;
}

.button-song-like {
  background: transparent url('../../assets/svg/album/heart-like.svg') 0% 0%
    no-repeat padding-box;
}

.button-song-notlike-yet {
  background: transparent url('../../assets/svg/album/heart-2.svg') 0% 0%
    no-repeat padding-box;
}
</style>
