<script setup lang="ts">
const props = defineProps<{
  data: {
    src: string
    title: string
    link: string
    desc?: string
  }[]
}>()

function handleLink(target: {
  src: string
  title: string
  link: string
  desc?: string
}) {
  if (target.link)
    window.open(target.link)
}
</script>

<template>
  <div class="ai-site-wrap">
    <div v-for="(item, index) in props.data" :key="index" class="ai-site-container" @click="handleLink(item)">
      <div class="ai-site-top">
        <div class="ai-img-wrap">
          <img class="ai-img-main" :src="item.src">
        </div>
        <div class="ai-site-title">
          {{ item.title }}
        </div>
      </div>

      <div class="ai-site-bottom">
        <div class="ai-bottom-text">
          {{ item.desc || '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-site-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: minmax(64px, auto);
  grid-auto-flow: row dense;
}

@media screen and (max-width: 575px) {
  .ai-site-wrap {
    grid-template-columns: 180px 180px;
  }

  .ai-site-wrap .ai-site-container {
    width: 170px;
  }

  .ai-site-wrap .ai-site-title {
    font-size: 14px;
  }
}

@media screen and (max-width: 375px) {
  .ai-site-wrap {
    grid-template-columns: 170px 170px;
  }

  .ai-site-wrap .ai-site-container {
    width: 160px;
  }

  .ai-site-wrap .ai-site-title {
    font-size: 14px;
  }
}

.ai-site-container {
  width: 240px;
  min-height: 64px;
  max-height: 110px;
  margin: 10px 0 20px 0;
  padding: 12px;
  background-color: var(--vp-sidebar-bg-color);
  border-radius: 5px;
  border: 1px solid var(--vp-sidebar-bg-color);
  transition: all .25s;
  cursor: pointer;
}

.ai-site-container:hover {
  border: 1px solid var(--vp-c-brand);
  background-color: var(--pic-bg);
}

.ai-site-top {
  display: flex;
  align-items: center;
}

.ai-site-title {
  margin-left: 15px;
  font-size: 17px;
  font-weight: 600;
}

.ai-img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--site-img-bg);
  border-radius: 6px;
}

.ai-img-main {
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.ai-bottom-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
}

.ai-site-bottom {
  margin-top: 4px;
  line-height: 24px;
}
</style>
