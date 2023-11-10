<script setup>
import { computed, defineProps } from 'vue'
import { usePlayStore } from '@/store/player'
import useCd from './use-cd'
import useMiniSlider from './use-mini-slider'
import ProgressCircle from './progress-circle.vue'

defineProps({
  progress: {
    type: Number,
    default: 0
  },
  togglePlay: Function
})
const store = usePlayStore()
const fullScreen = computed(() => store.fullScreen)
const currentSong = computed(() => store.currentSong)
const playing = computed(() => store.playing)
const playlist = computed(() => store.playlist)

const { cdCls, cdRef, cdImageRef } = useCd()
const { sliderWrapperRef } = useMiniSlider()

const miniPlayIcon = computed(() => {
  return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
})

function showNormalPlayer () {
  store.setFullScreen(true)
}

</script>

<template>
  <transition name="mini">
    <div
      class="mini-player"
      v-show="!fullScreen"
      @click="showNormalPlayer"
    >
      <!-- cd -->
      <div class="cd-wrapper">
        <div class="cd" ref="cdRef">
          <img
            ref="cdImageRef"
            :src="currentSong.pic"
            width="40"
            height="40"
            :class="cdCls"
          >
        </div>
      </div>
      <!-- 手指滑动播放上或下首歌曲 -->
      <div class="slider-wrapper" ref="sliderWrapperRef">
        <div class="slider-group">
          <div
            class="slider-page"
            v-for="song in playlist"
            :key="song.id"
          >
            <h2 class="name">{{song.name}}</h2>
            <p class="desc">{{song.singer}}</p>
          </div>
        </div>
      </div>
      <!-- player/pause btn -->
      <div class="control">
        <ProgressCircle :radius="32" :progress="progress">
          <i
            class="icon-mini"
            :class="miniPlayIcon"
            @click.stop="togglePlay"
          ></i>
        </ProgressCircle>
      </div>
    </div>
  </transition>

</template>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      height: 100%;
      width: 100%;
      img {
        border-radius: 50%;
        &.playing {
          animation: rotate 10s linear infinite;
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme-d;
    }
    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }
  }
}
.mini-enter-active, .mini-leave-active {
  transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
}
.mini-enter-from, .mini-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
</style>
