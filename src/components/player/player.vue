<script setup>
import { computed } from 'vue'
import { usePlayStore } from '@/store/player'

const store = usePlayStore()

const currentSong = computed(() => store.currentSong)
const playlist = computed(() => store.playlist)
</script>

<template>
  <div class="player" v-show="playlist.length">
    <!-- 全屏播放 -->
    <div class="normal-player">
      <div class="background">
        <img :src="currentSong.pic">
      </div>
      <div class="top">
        <i class="icon-back"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      background: $color-background;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .top {
        position: relative;
        margin-bottom: 25px;
        .back {
          position: absolute;
          top: 0;
          left: 6px;
          z-index: 50;
        }
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }
    }
  }
</style>