import { computed } from 'vue'
import { usePlayStore } from '@/store/player'
import { PLAY_MODE } from '@/assets/js/constant'

export default function useMode () {
  const store = usePlayStore()
  // 播放模式
  const playMode = computed(() => store.playMode)

  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? 'icon-sequence'
      : playModeVal === PLAY_MODE.random
        ? 'icon-random'
        : 'icon-loop'
  })

  function changeMode () {
    const mode = (playMode.value + 1) % 3
    store.changeMode(mode)
  }

  const modeText = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence
      ? '顺序播放'
      : playModeVal === PLAY_MODE.random
        ? '随机播放'
        : '循环播放'
  })

  return {
    modeIcon,
    changeMode,
    modeText
  }
}
