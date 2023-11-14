<script setup>
import { ref, defineExpose, computed } from 'vue'
import SearchInput from '@/components/search/search-input'
import Switches from '@/components/base/switches/switches'
import Scroll from '@/components/base/scroll/scroll'
import SongList from '@/components/base/song-list/song-list'
import Message from '@/components/base/message/message'
import { usePlayStore } from '@/store/player'

const visible = ref(false)
const query = ref('')
const currentIndex = ref(0)
const messageRef = ref(null)

const store = usePlayStore()
const playHistory = computed(() => store.playHistory)

function show () {
  visible.value = true
}

function hide () {
  visible.value = false
}

function selectItem ({ song }) {
  addSong(song)
}

function addSong (song) {
  store.addSong(song)
  showMessage()
}

function showMessage () {
  messageRef.value.show()
}

defineExpose({
  show
})

</script>
<template>
  <!-- 添加歌曲到队列 -->
  <teleport to='body'>
    <transition name="slide">
      <div class="add-song" v-show="visible">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide">
            <i class="icon-close"></i>
          </div>
        </div>
        <div class="search-input-wrapper">
          <SearchInput v-model="query" placeholder="搜索歌曲"></SearchInput>
        </div>
        <div v-show="!query">
          <Switches
            :items="['最近播放', '搜索历史']"
            v-model="currentIndex"
          >
          </Switches>
          <div class="list-wrapper">
            <Scroll
              v-if="currentIndex === 0"
              class="list-scroll"
            >
              <div class="list-inner">
                <SongList
                  :songs="playHistory"
                  @select="selectItem"
                >
                </SongList>
              </div>
            </Scroll>
            <Scroll
              v-if="currentIndex === 1"
              class="list-scroll"
            >
              <div class="list-inner">
                搜索历史列表 TODO
              </div>
            </Scroll>
          </div>
        </div>
        <Message ref="messageRef">
          <div class="message-title">
            <i class="icon-ok"></i>
            <span class="text">1首歌曲已添加到播放列表</span>
          </div>
        </Message>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 300;
  background: $color-background;
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .search-input-wrapper {
    margin: 20px;
  }
  .list-wrapper {
    position: absolute;
    top: 165px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 20px 30px;
      }
    }
  }
}
.message-title {
  text-align: center;
  padding: 18px 0;
  font-size: 0;
  .icon-ok {
    font-size: $font-size-medium;
    color: $color-theme;
    margin-right: 4px;
  }
  .text {
    font-size: $font-size-medium;
    color: $color-text;
  }
}
</style>
