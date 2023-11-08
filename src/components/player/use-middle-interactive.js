
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
    touch.y = e.touches[0].pageY
    touch.directionLocked = ''
  }
  function onMiddleTouchMove (e) {
    const deltaX = e.touches[0].pageX - touch.x
    const deltaY = e.touches[0].pageY - touch.y

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    // 通过滑动的 x 偏移量和 y 偏移量的多少来确定在哪个方向滑动
    if (!touch.directionLocked) {
      touch.directionLocked = absDeltaX >= absDeltaY ? 'h' : 'v'
    }
    // 如果是 Y 方向就什么也不做
    if (touch.directionLocked === 'v') {
      return
    }
    const left = currentView === 'cd' ? 0 : -window.innerWidth
    // 滑动宽度：最大不能超过屏幕宽度
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
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
