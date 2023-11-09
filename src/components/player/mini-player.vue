<script setup>
import { computed, defineProps } from 'vue'
import { usePlayStore } from '@/store/player'
import useCd from './use-cd'
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

const { cdCls, cdRef, cdImageRef } = useCd()

const miniPlayIcon = computed(() => {
  return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
})

function showNormalPlayer () {
  store.setFullScreen(true)
}

</script>

<template>
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
</style>
