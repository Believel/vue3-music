<script setup>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, ref, defineProps } from 'vue'
BScroll.use(Slide)
const currentPageIndex = ref(0)
const rootRef = ref(null)
const props = defineProps({
  sliders: Array
})
onMounted(() => {
  init()
})

function init () {
  const slider = new BScroll(rootRef.value, {
    scrollX: true,
    scrollY: false,
    slide: true,
    momentum: false,
    bounce: false,
    probeType: 3
  })
  slider.on('slideWillChange', (page) => {
    currentPageIndex.value = page.pageX
  })
}
</script>
<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div class="slider-page" v-for="item in props.sliders" :key="item.id">
        <a :href="item.link">
          <img :src="item.pic" />
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in props.sliders"
        :key="item.id"
        :class="{'active': currentPageIndex === index}"></span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  // TODO
  position: relative;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots-wrapper {
    position: absolute;
    bottom: 12px;
    left: 50%;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      transform: translateZ(1px);
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;;
      }
    }
  }
}

</style>
