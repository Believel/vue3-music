<script setup>
import { computed } from 'vue'
import { usePlayStore } from '@/store/player'
import useCd from './use-cd'

const store = usePlayStore()
const fullScreen = computed(() => store.fullScreen)
const currentSong = computed(() => store.currentSong)

const { cdCls, cdRef, cdImageRef } = useCd()

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
}
</style>
