<script setup>
import { reactive, onBeforeMount } from 'vue'
import Slider from '@/components/slider/slider'
import { getRecommend } from '@/service/recommend'

const data = reactive({
  sliders: []
})

onBeforeMount(async () => {
  const result = await getRecommend()
  data.sliders = result.sliders
})
</script>
<template>
  <div>
    <Slider :sliders="data.sliders" v-if="data.sliders.length"></Slider>
  </div>
</template>
