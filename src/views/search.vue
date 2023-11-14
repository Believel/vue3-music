<script setup>
import { ref, watch } from 'vue'
import SearchInput from '@/components/search/search-input'

const query = ref('')

watch(query, newQuery => {
  console.log(newQuery)
})

</script>
<template>
  <div class="search">
    <div class="search-input-wrapper">
      <SearchInput v-model="query"></SearchInput>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
}
</style>
