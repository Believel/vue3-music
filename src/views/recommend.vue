<script setup>
import { reactive, onBeforeMount, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Slider from '@/components/base/slider/slider'
import Scroll from '@/components/wrap-scroll'
import { getRecommend } from '@/service/recommend'
import storage from 'good-storage'
import { ALBUM_KEY } from '@/assets/js/constant'

const data = reactive({
  sliders: [],
  albums: []
})

const router = useRouter()
const title = ref('加载文案自己设定')
const selectedAlbum = ref(null)

// 计算属性
const loading = computed(() => {
  return !data.sliders.length && !data.albums.length
})

function selectItem (album) {
  selectedAlbum.value = album
  cacheAlbum(album)
  router.push({
    path: `/recommend/${album.id}`
  })
}

function cacheAlbum (album) {
  storage.session.set(ALBUM_KEY, album)
}

onBeforeMount(async () => {
  const result = await getRecommend()
  data.sliders = result.sliders
  data.albums = result.albums
})
</script>
<template>
  <div class="recommend" v-loading:[title]="loading">
    <Scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
        <div class="slider-content">
          <Slider :sliders="data.sliders" v-if="data.sliders.length"></Slider>
        </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item in data.albums"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedAlbum"></component>
      </transition>
    </router-view>
  </div>
</template>
<style lang="scss" scoped>
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: scroll;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 40%;
        overflow: hidden;
        .slider-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;
          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name {
              margin-bottom: 10px;
              color: $color-text;
            }
            .title {
              color: $color-text-d;
            }
          }
        }
      }
    }

  }
</style>
