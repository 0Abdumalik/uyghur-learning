<template>
  <view class="drawing-canvas-wrap">
    <canvas
      canvas-id="drawCanvas"
      id="drawCanvas"
      class="draw-canvas"
      :style="{ width: canvasW + 'px', height: canvasH + 'px' }"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    />
    <view class="canvas-actions">
      <view class="action-btn" @click="handleUndo">
        <text>{{ t.handwriting.undo }}</text>
      </view>
      <view class="action-btn danger" @click="handleClear">
        <text>{{ t.handwriting.clear }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useDrawing } from '@/composables/useDrawing'

const { t } = useI18n()
const drawing = useDrawing()

const canvasW = ref(300)
const canvasH = ref(300)

onMounted(() => {
  const sysInfo = uni.getSystemInfoSync()
  canvasW.value = Math.min(sysInfo.windowWidth - 40, 350)
  canvasH.value = canvasW.value

  const query = uni.createSelectorQuery()
  query.select('#drawCanvas')
    .fields({ node: true, size: true })
    .exec((res: any) => {
      if (res && res[0] && res[0].node) {
        // Canvas 2D (H5 / newer MP)
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = sysInfo.pixelRatio || 1
        canvas.width = canvasW.value * dpr
        canvas.height = canvasH.value * dpr
        drawing.init(ctx, canvasW.value, canvasH.value, dpr)
      } else {
        // Fallback: old canvas API
        const ctx = uni.createCanvasContext('drawCanvas')
        drawing.init(ctx, canvasW.value, canvasH.value, 1)
      }
    })
})

function getPos(e: any) {
  const touch = e.touches ? e.touches[0] : e.changedTouches[0]
  return { x: touch.x, y: touch.y }
}

function onTouchStart(e: any) {
  const { x, y } = getPos(e)
  drawing.touchStart(x, y)
}

function onTouchMove(e: any) {
  const { x, y } = getPos(e)
  drawing.touchMove(x, y)
}

function onTouchEnd() {
  drawing.touchEnd()
}

function handleUndo() {
  drawing.undo()
}

function handleClear() {
  drawing.clear()
}

defineExpose({ clear: handleClear })
</script>

<style scoped>
.drawing-canvas-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
}
.draw-canvas {
  background: #fff;
  border: 2rpx solid #e8e8e8;
  border-radius: 12rpx;
}
.canvas-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 16rpx;
}
.action-btn {
  padding: 12rpx 32rpx;
  background: #f0f0f0;
  border-radius: 8rpx;
  font-size: 26rpx;
  color: #333;
}
.action-btn:active {
  background: #ddd;
}
.action-btn.danger {
  background: #fef0ed;
  color: #E76F51;
}
</style>
