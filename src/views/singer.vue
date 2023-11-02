<script setup>
import { reactive, onBeforeMount } from 'vue'
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'

const data = reactive({
  singers: []
})
onBeforeMount(async () => {
  const result = await getSingerList()
  data.singers = result.singers
})
</script>
<template>
  <div class="singer" v-loading="!data.singers.length">
    <IndexList :singers="data.singers">
    </IndexList>
    <router-view></router-view>
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
