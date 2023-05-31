<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { getDate, getFromNow } from '@/utils'

const defaultAuthor = 'winches'
const author = ref(defaultAuthor)
const { frontmatter, page } = useData()

const publishedTime = getDate(frontmatter.value?.date)

if (frontmatter.value?.author)
  author.value = frontmatter.value?.author

const lastUpdatedDate = computed(() => new Date(page.value.lastUpdated!))
const isoDatetime = computed(() => lastUpdatedDate.value.toISOString())
const timeFormNow = getFromNow(isoDatetime.value)
</script>

<template>
  <section
    class="w-100% text-14px color-[var(--vp-c-text-2)] border-b-1 border-[var(--vp-c-divider)] w-full border-b-solid mt-[12px] pb-[24px] flex gap-[12px] mb-[12px] flex-wrap"
  >
    <div class="flex gap-[4px] items-center">
      <IconTool icon="pepicons-pop:person-filled" />
      作者:<span>
        {{ author }}
      </span>
    </div>
    <div v-if="publishedTime" class="flex gap-[4px] items-center">
      <IconTool icon="eos-icons:modified-date" />
      发表于:<span>{{ publishedTime }}</span>
    </div>
    <div class="flex gap-[4px] items-center">
      <IconTool icon="pepicons-pop:refresh" />
      更新于:<span>{{ timeFormNow }}</span>
    </div>
  </section>
</template>
