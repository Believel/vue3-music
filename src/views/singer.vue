<script setup>
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'

const router = useRouter()
const data = reactive({
  singers: [],
  selectedSinger: null
})
onBeforeMount(async () => {
  const result = await getSingerList()
  data.singers = result.singers
})
const selectSinger = (singer) => {
  data.selectedSinger = singer
  // 路由跳转歌手详情页
  router.push({
    path: `/singer/${singer.mid}`
  })
}
</script>
<template>
  <div class="singer" v-loading="!data.singers.length">
    <IndexList :singers="data.singers" @select="selectSinger">
    </IndexList>
    <!-- 在路径组件上使用转场，并对导航进行动画处理 -->
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="data.selectedSinger"/>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
