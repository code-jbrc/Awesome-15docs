<script setup lang="ts">
const props = defineProps<{
  source: any[]
}>()

function showPicture(picInfo: any) {
  window.open(picInfo.url)
}
</script>

<template>
  <div class="picture-wrap">
    <template v-for="(item, index) in props.source" :key="index">
      <div class="picture-container">
        <img :src="item.url" :alt="item.name" class="picture-show" @click="showPicture(item)">
        <div class="picture-name">
          {{ item.name }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.picture-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: fit-content;
  flex-wrap: wrap;
}

.picture-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 372px;
  height: fit-content;
  padding: 20px;
  background-color: var(--vp-sidebar-bg-color);
  border-radius: 20px;
  margin: 10px;
}

.picture-show {
  width: 96%;
  cursor: pointer;
}

.picture-name {
  margin-top: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
</style>
