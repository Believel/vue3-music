<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { debounce } from 'throttle-debounce'

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: '搜素歌曲、歌手'
  }
})

const emit = defineEmits(['update:modelValue'])

const query = ref(props.modelValue)

watch(() => query.value, debounce(300, (newQuery) => {
  emit('update:modelValue', newQuery.trim())
}))

function clear () {
  query.value = ''
}

</script>

<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input
      class="input-inner"
      v-model="query"
      :placeholder="placeholder"
    />
    <i
      class="icon-dismiss"
      v-show="query"
      @click="clear"
    >
    </i>
  </div>
</template>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>
