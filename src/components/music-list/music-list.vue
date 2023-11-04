<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Scroll from '@/components/base/scroll/scroll'
import SongList from '@/components/base/song-list/song-list'

const RESERVED_HEIGHT = 40

const props = defineProps({
  songs: {
    type: Array,
    default () {
      return []
    }
  },
  pic: String,
  title: String
})
const scrollY = ref(0)
const maxTranslateY = ref(0)
// 背景图片高度
const imageHeight = ref(0)
const bgImage = ref(null)
// 动态计算图片样式
const bgImageStyle = computed(() => {
  // 滚动列表 Y 值
  const scrollYVal = scrollY.value
  const maxTranslateYVal = maxTranslateY.value
  let zIndex = 0
  let paddingTop = '70%'
  let height = 0
  // const translateZ = 0
  // 向上滚动 背景图片收起高度
  if (scrollYVal > maxTranslateYVal) {
    zIndex = 10
    paddingTop = 0
    height = `${RESERVED_HEIGHT}px`
  }
  let scale = 1
  // 向下滚动
  if (scrollYVal < 0) {
    // 背景图片放大
    scale = 1 + Math.abs(scrollYVal / imageHeight.value)
  }

  return {
    zIndex,
    paddingTop,
    height,
    backgroundImage: `url(${props.pic})`,
    transform: `scale(${scale})`
  }
})
const playBtnStyle = computed(() => {
  let display = ''
  if (scrollY.value >= maxTranslateY.value) {
    display = 'none'
  }
  return {
    display
  }
})
// 歌手列表样式
const scrollStyle = computed(() => {
  const bottom = props.songs.length ? '60px' : 0
  return {
    top: `${imageHeight.value}px`,
    bottom
  }
})

// 高斯模糊效果
const filterStyle = computed(() => {
  let blur = 0
  const imageHeightVal = imageHeight.value
  const scrollYVal = scrollY.value
  // 向上滚动
  if (scrollYVal >= 0) {
    blur = Math.min(maxTranslateY.value / imageHeightVal, scrollYVal / imageHeightVal) * 20
  }
  return {
    backdropFilter: `blur(${blur}px)`
  }
})
const router = useRouter()
const goBack = () => {
  router.back()
}
onMounted(() => {
  // 动态获取图片高度是为了方便设置下面列表的top值
  imageHeight.value = bgImage.value.clientHeight
  maxTranslateY.value = imageHeight.value - RESERVED_HEIGHT
})
function onScroll (pos) {
  scrollY.value = -pos.y
}
</script>
<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <!-- 歌单列表 -->
    <Scroll
      class="list"
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <SongList :songs="songs"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
          .icon-play {
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: $font-size-medium-x;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            font-size: $font-size-small;
          }
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-wrapper {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>
