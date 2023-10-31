import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(ObserveDOM)
export default function useScroll (wrapperRef, options) {
  const scroll = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      // 监听DOM变化时更新页面高度或宽度
      observeDOM: true,
      ...options
    })
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })
  return scroll
}
