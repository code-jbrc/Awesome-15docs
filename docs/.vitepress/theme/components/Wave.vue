<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { isClient } from '@/utils'

const canvas = ref<HTMLCanvasElement | null>(null)
const rootEl = isClient ? document.documentElement : null
let isMounted = false
let cancelAnimate: (() => void) | undefined
let rootClass = rootEl?.getAttribute('class')
function animateWave() {
  // 获取画布
  const canvasEl = canvas.value!
  const canvasPen = canvasEl.getContext('2d')! // 设置波浪海域（海浪宽度，高度）
  const canvasWidth = canvasEl.width
  const canvasHeight = canvasEl.height
  const lineWidth = 2 // 曲线
  const sinX = 0
  const sinY = canvasHeight / 2 // 轴长
  const axisLength = canvasWidth // 弧度宽度
  const waveWidth = 0.01 // 海浪高度
  const waveHeight = canvasHeight / 12.0
  const speed = 0.06 // 数值越大速率越快
  const precision = 1
  const closeHeight = canvasHeight || 0
  let offsetX = 0 // 波浪横向的偏移量
  let rand = canvasHeight // 波浪高度
  let canceled = false
  canvasPen.lineWidth = lineWidth
  const rootStyle = getComputedStyle(rootEl!)
  const bgColor = rootStyle.getPropertyValue('--vp-c-bg')
  // 创建静态的曲线
  function drawWave(offsetX = 0) {
    canvasPen.save() // 存放贝塞尔曲线的各个点
    canvasPen.beginPath() // 创建贝塞尔点
    const points: number[][] = []
    for (let x = sinX; x < sinX + axisLength; x += 80 / axisLength) {
      const y = -Math.sin((sinX + x) * waveWidth + offsetX)
      points.push([x, rand + y * waveHeight])
      canvasPen.lineTo(x, sinY + y * waveHeight)
    }
    canvasPen.lineTo(axisLength, closeHeight)
    canvasPen.lineTo(sinX, closeHeight)
    canvasPen.lineTo(points[0][0], points[0][1])
    canvasPen.stroke()
    canvasPen.restore() // 贝塞尔曲线样式设置
    canvasPen.strokeStyle = 'transparent'
    canvasPen.fillStyle = bgColor
    canvasPen.fill()
  }
  function render() {
    canvasPen.clearRect(0, 0, canvasWidth, canvasHeight) // 控制海浪高度
    rand -= precision
    // 控制循环涨潮
    if (Math.floor(canvasHeight - rand) === canvasHeight)
      rand = canvasHeight

    drawWave(offsetX)
    offsetX += speed
    !canceled && requestAnimationFrame(render)
  }
  drawWave()
  render()
  return () => {
    canceled = true
  }
}
onMounted(() => {
  isMounted = true
  refresh()
  activeClick()
})
onBeforeUnmount(() => cancelAnimate?.())
defineExpose({ refresh })
function refresh() {
  if (cancelAnimate) {
    cancelAnimate()
    cancelAnimate = undefined
  }
  if (isMounted && canvas.value) {
    canvas.value.setAttribute('width', `${canvas.value.offsetWidth}`)
    canvas.value.setAttribute('height', `${canvas.value.offsetHeight}`)
    cancelAnimate = animateWave()
  }
}

function activeClick() {
  isClient && window.addEventListener('click', () => {
    const newClass = rootEl?.getAttribute('class')

    if (rootClass?.length !== newClass?.length) {
      refresh()
      rootClass = newClass
    }
  })
}
</script>

<template>
  <div class="wave-container">
    <div class="wave-block" />
    <canvas ref="canvas" class="wave" />
  </div>
</template>

<style scoped>
.wave-container {
  position: absolute;
  top: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: none;
}
.wave-block {
  height: 500px;
  background-image: linear-gradient(to bottom, transparent, var(--vp-c-brand));
}
.wave {
  position: relative;
  top: -150px;
  right: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background-color: transparent;
}
</style>
