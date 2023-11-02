<script setup>
import { onBeforeMount, reactive, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list'

const data = reactive({
  songs: []
})
const props = defineProps({
  data: Object
})
onBeforeMount(async () => {
  const route = useRoute()
  const result = await getSingerDetail({
    mid: route.params.id
  })
  data.songs = await processSongs(result.songs)
})

</script>

<template>
  <div class="singer-detail">
    <music-list :songs="data.songs" :data="props.data"></music-list>
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
