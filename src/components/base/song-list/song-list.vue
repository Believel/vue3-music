<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  songs: {
    type: Array,
    default () {
      return []
    }
  }
})

const emit = defineEmits(['select'])

function getDesc (song) {
  return `${song.singer}.${song.album}`
}
function selectItem (song, index) {
  emit('select', { song, index })
}
</script>
<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="(song, index) in props.songs"
      :key="song.id"
      @click="selectItem(song, index)"
    >
    <!-- <div class="rank">
      <span>{{ index + 1 }}</span>
    </div> -->
    <div class="content">
      <h2 class="name">{{ song.name }}</h2>
      <p class="desc">{{ getDesc(song) }}</p>
    </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name {
          @include no-wrap();
          color: $color-text
        }
        .desc {
          @include no-wrap();
          margin-top: 4px;
          color: $color-text-d;
        }
      }
  }
}
</style>
