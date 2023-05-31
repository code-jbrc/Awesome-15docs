<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '18',
  },
  icon: {
    type: String,
    default: '',
  },
})

const height = ref(props.size)
const width = ref(props.size)
</script>

<template>
  <Icon :height="height" :width="width" :icon="icon" />
</template>
