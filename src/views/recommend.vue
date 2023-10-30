<script setup>
import { onBeforeMount } from 'vue'
import { getRecommend } from '@/service/recommend'

onBeforeMount(async () => {
  const result = await getRecommend()
  console.log(result)
})
</script>
<template>
  <div>
    推荐页面
  </div>
</template>
