<script setup>
import { onBeforeMount, reactive, defineProps, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import MusicList from '@/components/music-list/music-list'

const route = useRoute()
const router = useRouter()
const data = reactive({
  songs: []
})
const props = defineProps({
  data: Object
})

const singerComputed = computed(() => {
  let ret = null
  if (props.data) {
    ret = props.data
  } else {
    const singer = storage.session.get(SINGER_KEY)
    if (singer && singer.mid === route.params.id) {
      ret = singer
    }
  }
  return ret
})
const pic = computed(() => {
  const data = singerComputed.value
  return data && data.pic
})
const title = computed(() => {
  const data = singerComputed.value
  return data && (data.name || data.title)
})
onBeforeMount(async () => {
  const singer = singerComputed.value
  // url 地址参数被直接在地址栏修改时
  if (!singer) {
    const path = route.matched[0].path
    router.push({
      path
    })
    return
  }
  const result = await getSingerDetail(singer)
  data.songs = await processSongs(result.songs)
})

</script>

<template>
  <div class="singer-detail">
    <music-list
      :songs="data.songs"
      :pic="pic"
      :title="title"
    >
    </music-list>
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
