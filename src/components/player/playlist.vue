<script setup>
import { ref, computed, defineExpose, nextTick } from 'vue'
import { usePlayStore } from '@/store/player'
import Scroll from '@/components/base/scroll/scroll'
import useMode from './use-mode'
import useFavorite from './use-favorite'

const visible = ref(false)
const scrollRef = ref(null)
const removing = ref(false)

const store = usePlayStore()
const playlist = computed(() => store.playlist)
const sequenceList = computed(() => store.sequenceList)
const currentSong = computed(() => store.currentSong)

const { changeMode, modeIcon, modeText } = useMode()
const { getFavoriteIcon, toggleFavorite } = useFavorite()

function getCurrentIcon (song) {
  if (song.id === currentSong.value.id) {
    return 'icon-play'
  }
}

function removeSong (song) {
  if (removing.value) {
    return
  }
  removing.value = true
  store.removeSong(song)

  setTimeout(() => {
    removing.value = false
  }, 300)
}

function refreshScroll () {
  scrollRef.value.scroll.refresh()
}

async function show () {
  visible.value = true
  await nextTick()
  refreshScroll()
}

function hide () {
  visible.value = false
}

defineExpose({
  show
})
</script>
<template>
  <teleport to='body'>
    <transition name="list-fade">
      <div
        class="playlist"
        v-show="visible && playlist.length"
        @click="hide"
      >
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <i
                class="icon"
                :class="modeIcon"
                @click="changeMode"
              >
              </i>
              <span class="text">{{ modeText }}</span>
            </h1>
          </div>
          <Scroll
            class="list-content"
            ref="scrollRef"
          >
            <ul>
              <li
                class="item"
                v-for="song in sequenceList"
                :key="song.id"
              >
                <i class="current" :class="getCurrentIcon(song)"></i>
                <span class="text">{{ song.name }}</span>
                <span class="favorite" @click.stop="toggleFavorite(song)">
                  <i :class="getFavoriteIcon(song)"></i>
                </span>
                <span
                  class="delete"
                  @click.stop="removeSong(song)"
                  :class="{'disable': removing}"
                >
                  <i class="icon-delete"></i>
                </span>
              </li>
            </ul>
          </Scroll>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
  .playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: $color-background-d;
    &.list-fade-enter-active, &.list-fade-leave-active {
      transition: opacity .3s;
      .list-wrapper {
        transition: all .3s;
      }
    }
    &.list-fade-enter-from, &.list-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .list-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 210;
      width: 100%;
      background-color: $color-highlight-background;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 10px;
            font-size: 24px;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: $font-size-small;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            @include no-wrap();
            font-size: $font-size-medium;
            color: $color-text-d;
          }
          .favorite {
            @include extend-click();
            margin-right: 15px;
            font-size: $font-size-small;
            color: $color-theme;
            .icon-favorite {
              color: $color-sub-theme;
            }
          }
          .delete {
            @include extend-click();
            font-size: $font-size-small;
            color: $color-theme;
            &.disable {
              color: $color-theme-d;
            }
          }
        }
      }
    }
  }
</style>
