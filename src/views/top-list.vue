<script setup>
import { ref, onBeforeMount } from 'vue'
import { getTopList } from '@/service/top-list'
import { TOP_KEY } from '@/assets/js/constant'
import storage from 'good-storage'
import { useRouter } from 'vue-router'
import Scroll from '@/components/wrap-scroll'

const router = useRouter()

const topList = ref([])
const loading = ref(true)
const selectedTop = ref(null)

onBeforeMount(async () => {
  const result = await getTopList()
  topList.value = result.topList
  loading.value = false
})

function selectItem (top) {
  selectedTop.value = top
  cacheTop(top)
  router.push({
    path: `/top-list/${top.id}`
  })
}

function cacheTop (top) {
  storage.session.set(TOP_KEY, top)
}

</script>
<template>
  <div class="top-list" v-loading="loading">
    <Scroll class="top-list-content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img v-lazy="item.pic" width="100" height="100">
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songList"
              :key="song.id"
            >
              <span>{{ index + 1 }}.</span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<style lang="scss" scoped>
.top-list {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .top-list-content {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100%;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
        }
      }
    }
  }
}
</style>
