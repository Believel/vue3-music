import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { usePlayStore } from '@/store/player'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default function useMiniSlider () {
  const sliderWrapperRef = ref(null)
  const slider = ref(null)

  const store = usePlayStore()

  const fullScreen = computed(() => store.fullScreen)
  const playlist = computed(() => store.playlist)
  const currentIndex = computed(() => store.currentIndex)

  const sliderShow = computed(() => {
    return !fullScreen.value && !!playlist.value
  })

  onMounted(() => {
    let sliderVal
    watch(sliderShow, async newSliderShow => {
      if (newSliderShow) {
        await nextTick()
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true
            }
          })
          // 当 slide 切换 page 之后触发
          sliderVal.on('slidePageChanged', ({ pageX }) => {
            store.setCurrentIndex(pageX)
          })
        } else {
          // 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
          sliderVal.refresh()
        }
        // 滚动到指定的 Page 位置
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })
    watch(currentIndex, (newIndex) => {
      if (sliderVal && sliderShow.value) {
        sliderVal.goToPage(newIndex, 0, 0)
      }
    })
  })
  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy()
    }
  })

  return {
    sliderWrapperRef
  }
}
