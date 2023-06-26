---
title: AI 生图
---

# AI 生图

---

## 示例图片

<script setup lang="ts">
const data = [
  {
    url: 'https://mcdn-resource.53site.com/image/2023-05-04/1d2c4d1aea2411ed9e6a8e249f94faaa.png',
    name: '夜光少年',
  },
  {
    url: 'https://github.com/posva/unplugin-vue-router/assets/96854855/22d116ca-8ec9-49f3-ab9f-4b48fcbff272',
    name: '桌面',
  },
]
</script>

<show-picture :source="data" />