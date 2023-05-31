<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, watch, watchEffect } from 'vue'
import { useSidebar } from '../composables/sidebar'
import { isClient } from '@/utils'

const { frontmatter } = useData()
const isShow = ref(frontmatter.value.customShow)
const updatedHeaders = ref<any[]>([])
let remove: any

watchEffect(() => {
  isShow.value = frontmatter.value.customShow
})
isClient && watchEffect(() => {
  if (isShow.value) {
    const url = location?.hash

    changeActive(url)
  }
})

isClient && watch(isShow, async (val) => {
  if (val)
    remove = await useSidebar(isShow, updatedHeaders)
  else
    remove?.removeAll()
}, { immediate: true })

function handleClick(header: { link: string }) {
  if (!isClient)
    return
  if (decodeURI(location?.href || '').includes(header.link))
    return

  location?.assign(header.link)
}

function changeActive(url: string) {
  updatedHeaders.value = updatedHeaders.value.map((i) => {
    if (decodeURI(url).includes(i.link)) {
      return {
        ...i,
        active: true,
      }
    }

    return {
      ...i,
      active: false,
    }
  })
}
</script>

<template>
  <div v-if="isShow" class="side-bar-wrap">
    <div class="side-bar-title">
      AI 推荐
    </div>

    <div class="side-bar-main">
      <div v-for="(item, index) in updatedHeaders" :key="index" class="side-bar-item" @click="handleClick(item)">
        <p class="side-bar-text" :class="item.active ? 'side-bar-active' : ''">
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-bar-wrap {
  margin-top: 15px;
}

.side-bar-main {
  margin-top: 4px;
}

.side-bar-item {
  line-height: 24px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.side-bar-item:hover {
  color: var(--vp-c-brand)
}
.side-bar-active {
  color: var(--vp-c-brand)
}

.side-bar-title {
  flex-grow: 1;
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s;
  font-weight: 700;
}

.side-bar-text {
  padding: 4px 0;
  font-weight: 500;
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s;
  box-sizing: border-box;
  user-select: none;
}
</style>
