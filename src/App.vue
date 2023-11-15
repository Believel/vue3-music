<script setup>
import { computed } from 'vue'
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'

import { usePlayStore } from '@/store/player'

const store = usePlayStore()
const playlist = computed(() => store.playlist)

const viewStyle = computed(() => {
  const bottom = playlist.value.length ? '60px' : '0'
  return {
    bottom
  }
})

</script>
<template>
  <Header></Header>
  <Tab></Tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <!-- 过渡动效 -->
  <router-view
    :style="viewStyle"
    name="user"
    v-slot="{ Component }"
  >
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
  <Player></Player>
</template>
<style lang="scss">
</style>
