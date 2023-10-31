<script setup>
import useScroll from './use-scroll'
import { defineProps, ref } from 'vue'

const rootRef = ref(null)
const props = defineProps({
  click: {
    type: Boolean,
    default: true
  }
})
useScroll(rootRef, props)
</script>

<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>
