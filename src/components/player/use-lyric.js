import { watch, computed, ref } from 'vue'
import { usePlayStore } from '@/store/player'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

export default function useLyric ({ currentTime, songReady }) {
  // 当前歌词
  const currentLyric = ref(null)
  // 当前播放的索引值
  const currentLineNum = ref(0)
  // 正在播放的歌词
  const playingLyric = ref(null)

  const store = usePlayStore()

  const currentSong = computed(() => store.currentSong)

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }

    const lyric = await getLyric(newSong)
    store.addSongLyric({
      song: newSong,
      lyric
    })
    if (currentSong.value.lyric !== lyric) {
      return
    }
    currentLyric.value = new Lyric(lyric, handleLyric)
    console.log(currentLyric.value)
    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      if (songReady.value) {
        playLyric()
      }
    }
  })

  function playLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }
  function stopLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  function handleLyric ({ lineNum, txt }) {
    console.log(lineNum)
    console.log(txt)
    currentLineNum.value = lineNum
    playingLyric.value = txt
  }
  return {
    currentLyric,
    currentLineNum,
    playLyric,
    stopLyric
  }
}
