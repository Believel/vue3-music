<script setup>
import { reactive, onBeforeMount } from 'vue'
import { getSingerList } from '@/service/singer'

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
    歌手页面
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
