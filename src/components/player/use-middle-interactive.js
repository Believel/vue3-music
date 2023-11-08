
import { ref } from 'vue'
// 在滑动过程中
// cd page  控制 opacity
// lyric page 控制   offsetWidth
export default function useMiddleInteractive () {
  // 在手指滑动过程中展示的是哪个页面: cd | lyric
  const currentShow = ref('cd')
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)

  const touch = {}

  let currentView = 'cd'

  function onMiddleTouchStart (e) {
    touch.x = e.touches[0].pageX
  }
  function onMiddleTouchMove (e) {
    const delta = e.touches[0].pageX - touch.x
    const left = currentView === 'cd' ? 0 : -window.innerWidth
    // 滑动宽度：最大不能超过屏幕宽度
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + delta))
    touch.percent = Math.abs(offsetWidth / window.innerWidth)
    if (currentView === 'cd') {
      if (touch.percent > 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }
    middleLStyle.value = {
      opacity: 1 - touch.percent
    }
    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`
    }
  }
  function onMiddleTouchEnd () {
    let offsetWidth
    let opacity
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }
    const duration = 300
    middleLStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`
    }
    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `${duration}ms`
    }
  }

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}
