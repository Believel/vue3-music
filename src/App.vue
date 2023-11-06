<script setup>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
</script>
<template>
  <Header></Header>
  <Tab></Tab>
  <router-view></router-view>
  <Player></Player>
</template>
<style lang="scss">
</style>
