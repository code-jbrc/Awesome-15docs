<script lang="ts" setup>
import { Icon } from '@iconify/vue'

defineProps({
  size: {
    type: String,
    default: '20',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <Icon :icon="icon" />
</template>
