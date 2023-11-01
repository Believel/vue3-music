<script setup>
import useScroll from './use-scroll'
import { defineProps, ref, defineEmits, defineExpose } from 'vue'

const rootRef = ref(null)
const props = defineProps({
  click: {
    type: Boolean,
    default: true
  },
  // 决定是否派发scroll事件
  probeType: {
    type: Number,
    default: 0
  }
})
// 定义向父元素派发的事件
const emit = defineEmits(['scroll'])
const scroll = useScroll(rootRef, props, emit)
// 对外暴露属性
defineExpose({
  scroll
})
</script>

<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>
