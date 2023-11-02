<script setup>
import { onBeforeMount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
const data = reactive({
  songs: []
})
onBeforeMount(async () => {
  const route = useRoute()
  const result = await getSingerDetail({
    mid: route.params.id
  })
  data.songs = await processSongs(result.songs)
  console.log(data.songs)
})

</script>

<template>
  <div class="singer-detail">
    歌手详情
  </div>
</template>

<style lang="scss" scode>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
