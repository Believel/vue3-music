import { defineStore } from 'pinia'
import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

export const usePlayStore = defineStore('play', {
  state: () => ({
    // 顺序播放列表
    sequenceList: [],
    // 播放列表
    playlist: [],
    // 是否播放
    playing: false,
    // 播放模式
    playMode: PLAY_MODE.sequence,
    // 播放列表索引
    currentIndex: 0,
    // 是否全屏
    fullScreen: true
  }),
  getters: {
    currentSong: (state) => {
      return state.playlist[state.currentIndex] || {}
    }
  },
  actions: {
    setPlayingState (playing) {
      this.playing = playing
    },
    setSequenceList (list) {
      this.sequenceList = list
    },
    setPlaylist (list) {
      this.playlist = list
    },
    setPlayMode (mode) {
      this.playMode = mode
    },
    setCurrentIndex (index) {
      this.currentIndex = index
    },
    setFullScreen (fullScreen) {
      this.fullScreen = fullScreen
    },
    // 播放歌曲
    selectPlay (list, index) {
      this.setPlayMode(PLAY_MODE.sequence)
      this.setSequenceList(list)
      this.setPlaylist(list)
      this.setPlayingState(true)
      this.setFullScreen(true)
      this.setCurrentIndex(index)
    },
    // 随机播放歌曲
    randomPlay (list) {
      this.setPlayMode(PLAY_MODE.random)
      this.setSequenceList(list)
      this.setPlayingState(true)
      this.setFullScreen(true)
      this.setPlaylist(shuffle(list))
      this.setCurrentIndex(0)
    },
    // 点击播放模式
    changeMode (mode) {
      const currentId = this.currentSong.id
      if (mode === PLAY_MODE.random) {
        this.setPlaylist(shuffle(this.sequenceList))
      } else {
        this.setPlaylist(this.sequenceList)
      }
      const index = this.playlist.findIndex(song => {
        return song.id === currentId
      })
      this.setCurrentIndex(index)
      this.setPlayMode(mode)
    }
  }
})
