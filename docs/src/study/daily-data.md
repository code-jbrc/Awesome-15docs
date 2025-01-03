---
title: 日常学习资料
---

## Javascript V8 性能优化代码

好文推荐：[Optimizing Javascript for fun and for profit](https://romgrk.com/posts/optimizing-javascript/)

## Slack 创建一个 App 应用

[官网 QuickStart](https://api.slack.com/quickstart)

[官网 App 地址](https://api.slack.com/apps)

主要按照官网的流程

1. 先创建一个 App，选择一个 Workspace
2. 添加 Bot 的权限，比如 `chat:write`
3. 在 Workspace 中添加 App，即安装 App 到频道中

发送信息

1. 配置 Bot 的监听事件，比如 `message.channels`
2. 通过 Webhook 直接用 Bot 发送消息

## Slack 创建工作流

[官网 Workflow Builder](https://slack.com/intl/zh-cn/help/articles/17542172840595-%E6%9E%84%E5%BB%BA%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%EF%BC%9A%E5%9C%A8-Slack-%E4%B8%AD%E5%BB%BA%E7%AB%8B%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B#%E5%8F%98%E9%87%8F-1)

它可以接收 webhook 和设置变量，然后重新发送到指定位置，频道/个人

## Slack 工具合集

> [Slack help center](https://slack.com/intl/zh-cn/help/categories/360000049043)
> [Slack message playground](https://app.slack.com/block-kit-builder/T011CF3CMJN#%7B%22blocks%22:%5B%5D%7D)
> [Slack api 文档](https://api.slack.com/tutorials)

## 现代 typescript 学习网站

[现代 typescript 学习网站](https://www.totaltypescript.com/)

## Heic2Png

使用 `heic2any` 库将 heic 格式的图片转换为 png 格式，heic 是 IOS 的图片格式，安卓和浏览器不支持

```ts
import heic2any from 'heic2any'

const heicList = ['image/heic', 'image/heif']

function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const blob = new Blob([e.target?.result], { type: file.type })
      resolve(blob)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

function convertFile(file: File): Promise<File> {
  return new Promise(async (resolve) => {
    if (heicList.includes(file.type)) {
      try {
        const blob = await fileToBlob(file)
        const result = (await heic2any({ blob })) as Blob
        const convertToPng = new File([result], file.name.replace(/\.(heic|heif)$/, '.png'), { type: 'image/png' })

        resolve(convertToPng)
      }
      catch {}
    }
    resolve(file)
  })
}
```

## Web 上传时压缩

1. 使用 `createImageBitmap` 和 `OffscreenCanvas` 将图片转换为 webp 格式

```ts
async function convertToWebP(pngFile) {
  try {
    // 创建 ImageBitmap
    const bitmap = await createImageBitmap(pngFile)

    // 使用 OffscreenCanvas
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    // 绘制图片
    ctx.drawImage(bitmap, 0, 0)

    // 转换为 WebP
    const blob = await canvas.convertToBlob({
      type: 'image/webp',
      quality: 0.8
    })

    bitmap.close()
    return blob
  }
  catch (error) {
    console.error('Conversion failed:', error)
    throw error
  }
}

// 使用示例
async function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file && file.type === 'image/png') {
    try {
      const webpBlob = await convertToWebP(file)
      console.log('Original size:', file.size)
      console.log('WebP size:', webpBlob.size)

      // 创建预览
      const url = URL.createObjectURL(webpBlob)
      const img = new Image()
      img.src = url
      document.body.appendChild(img)

      // 清理
      URL.revokeObjectURL(url)
    }
    catch (error) {
      console.error('Conversion failed:', error)
    }
  }
}
```

2. 在 web worker 中使用 `squoosh` 谷歌开发的可以在 web 端使用的图片压缩库
3. 最后返回压缩后的数据，重新生成 File 对象
