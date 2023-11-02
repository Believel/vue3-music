<script setup>
import { onBeforeMount } from 'vue'
import { getSingerDetail } from '@/service/singer'

onBeforeMount(async () => {
  const result = await getSingerDetail({
    mid: '0025NhlN2yWrP4'
  })

  console.log(result)
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
