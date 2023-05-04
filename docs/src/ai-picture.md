---
title: AI 生图
---

# AI 生图

## 示例图片

<script setup lang="ts">
const data = [
  {
    url: 'https://mcdn-resource.53site.com/image/2023-05-04/1d2c4d1aea2411ed9e6a8e249f94faaa.png',
    name: '夜光少年',
  },
  {
    url: 'https://d3t3ll7elkac89.cloudfront.net/prod/user/15ca9619-aa06-4179-9e71-98322c320ce6/f68b15f9-f7f7-4e0f-8df8-e004ca7be63c/images/image0_1024_1024_watermark.jpg?Expires=1683272845&Signature=QTvmLXAykTnhgGcyDJjSy24~MntrHLqde3asEmxxF9-Xyp89EyiSdSaBwFIDrsIALyr2W2xruSAaKVUvpFmlbph8A3rPER-nky4tawMRXq5EIlnGLdVscjkdKUVdpuOj4EJZRE8SF7v6HnIlur97WAAXBtnvWViFynXQoUz6mV71rcubPY2vLoMSESqr6a93AoMGGkeb2emxnj4Hgv1tTvMqwJEbOK36pbnXu~06O7UYTvkVo9jkRdoZ1Zx0b-hmDn0C5KPzXLOvOUDD0-CfFP1wOVvVWubayPg~z3mtwnxk7KnBjE2YwO2JB7w6k9z-Xb6rgbCHyiRPPgKlUEIbBQ__&Key-Pair-Id=K3RDDB1TZ8BHT8',
    name: '单车少年',
  }
]
</script>

<show-picture :source="data" />