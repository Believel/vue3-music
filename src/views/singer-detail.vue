<script setup>
import { defineProps } from 'vue'
import { getSingerDetail } from '@/service/singer'
import { SINGER_KEY } from '@/assets/js/constant'
import MusicList from '@/components/music-list/music-list'
import useDetailComponent from '@/hooks/useDetailComponent'

const props = defineProps({
  data: Object
})
const { title, pic, songs, loading } = useDetailComponent(props, SINGER_KEY, getSingerDetail)

</script>

<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :pic="pic"
      :title="title"
      :loading="loading"
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
