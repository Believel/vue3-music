import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(ObserveDOM)
export default function useScroll (wrapperRef, options, emit) {
  const scroll = ref(null)
  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
      // 监听DOM变化时更新页面高度或宽度
      observeDOM: true,
      ...options
    })
    if (options.probeType > 0) {
      scrollVal.on('scroll', pos => {
        // 向父级派发 scroll 事件
        emit('scroll', pos)
      })
    }
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })
  return scroll
}
