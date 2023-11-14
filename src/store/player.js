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
    fullScreen: true,
    // 收藏歌曲列表
    favoriteList: [],
    // 播放历史列表
    playHistory: []
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
    setFavoriteList (list) {
      this.favoriteList = list
    },
    setPlayHistory (songs) {
      this.playHistory = songs
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
    },
    // 添加歌词
    addSongLyric ({ song, lyric }) {
      // 这里是利用对象的引用
      // playlist 里面也是改变的
      this.sequenceList.map(item => {
        if (item.mid === song.mid) {
          item.lyric = lyric
        }
        return item
      })
    },
    // 删除歌曲
    removeSong (song) {
      const sequenceList = this.sequenceList.slice()
      const playlist = this.playlist.slice()

      const sequenceIndex = findIndex(sequenceList, song)
      const playIndex = findIndex(playlist, song)
      if (sequenceIndex < 0 || playIndex < 0) {
        return
      }
      sequenceList.splice(sequenceIndex, 1)
      playlist.splice(playIndex, 1)

      let currentIndex = this.currentIndex
      if (playIndex < currentIndex || currentIndex === playIndex.length) {
        currentIndex--
      }

      this.setPlaylist(playlist)
      this.setSequenceList(sequenceList)
      this.setCurrentIndex(currentIndex)
      if (!playlist.length) {
        this.setPlayingState(false)
      }
    },
    // 添加歌曲
    addSong (song) {
      const playlist = this.playlist.slice()
      const sequenceList = this.sequenceList.slice()
      let currentIndex = this.currentIndex
      const playIndex = findIndex(playlist, song)

      if (playIndex > -1) {
        currentIndex = playIndex
      } else {
        playlist.push(song)
        currentIndex = playlist.length - 1
      }

      const sequenceIndex = findIndex(sequenceList, song)
      if (sequenceIndex === -1) {
        sequenceList.push(song)
      }

      this.setSequenceList(sequenceList)
      this.setPlaylist(playlist)
      this.setCurrentIndex(currentIndex)
      this.setPlayingState(true)
      this.setFullScreen(true)
    },
    // 清空歌曲列表
    clearSongList () {
      this.setSequenceList([])
      this.setPlaylist([])
      this.setCurrentIndex(0)
      this.setPlayingState(false)
    }
  }
})

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
