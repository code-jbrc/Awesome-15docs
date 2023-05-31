<script setup lang="ts">
defineProps<{
  readTime: string
  words: string
}>()
</script>

<template>
  <section class="w-100% justify-center text-14px color-[var(--vp-c-text-2)] border-[var(--vp-c-divider)] w-full mt-[24px] flex gap-[12px] mb-[18px] flex-wrap">
    <div class="flex gap-[4px] items-center">
      <IconTool icon="pepicons-pop:pen" />
      字数:<span>{{ words }} 字</span>
    </div>
    <div class="flex gap-[4px] items-center">
      <IconTool icon="pepicons-pop:rewind-time" />
      预计:<span>{{ readTime }} 分钟</span>
    </div>
    <div class="flex gap-[4px] items-center">
      <IconTool icon="pepicons-pop:cellphone-eye" />
      阅读量:<span id="busuanzi_container_page_pv"><span id="busuanzi_value_page_pv" /></span>
    </div>
  </section>
</template>
