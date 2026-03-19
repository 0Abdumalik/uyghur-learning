<template>
  <view class="letter-trace-wrap">
    <view class="trace-container" :style="{ width: size + 'px', height: size + 'px' }">
      <!-- Trace template (semi-transparent letter) -->
      <view v-if="showTrace" class="trace-template ug-text">
        <text>{{ letterChar }}</text>
      </view>
      <!-- Drawing canvas overlaid -->
      <canvas
        canvas-id="traceCanvas"
        id="traceCanvas"
        class="trace-canvas"
        :style="{ width: size + 'px', height: size + 'px' }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      />
    </view>
    <view class="trace-actions">
      <wd-button size="small" @click="toggleTrace">
        {{ showTrace ? t.handwriting.hideTrace : t.handwriting.showTrace }}
      </wd-button>
      <wd-button size="small" @click="handleUndo">
        {{ t.handwriting.undo }}
      </wd-button>
      <wd-button size="small" type="error" plain @click="handleClear">
        {{ t.handwriting.clear }}
      </wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useDrawing } from '@/composables/useDrawing'

const props = withDefaults(defineProps<{
  letterChar: string
  size?: number
}>(), { size: 280 })

const { t } = useI18n()
const drawing = useDrawing()
const showTrace = ref(true)

onMounted(() => {
  const sysInfo = uni.getSystemInfoSync()
  const query = uni.createSelectorQuery()
  query.select('#traceCanvas')
    .fields({ node: true, size: true })
    .exec((res: any) => {
      if (res && res[0] && res[0].node) {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = sysInfo.pixelRatio || 1
        canvas.width = props.size * dpr
        canvas.height = props.size * dpr
        drawing.init(ctx, props.size, props.size, dpr)
      } else {
        const ctx = uni.createCanvasContext('traceCanvas')
        drawing.init(ctx, props.size, props.size, 1)
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

function toggleTrace() {
  showTrace.value = !showTrace.value
}

function handleUndo() {
  drawing.undo()
}

function handleClear() {
  drawing.clear()
}
</script>

<style scoped>
.letter-trace-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.trace-container {
  position: relative;
  border: 2rpx solid #e8e8e8;
  border-radius: 12rpx;
  overflow: hidden;
  background: #fff;
}
.trace-template {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 200rpx;
  color: rgba(30, 107, 92, 0.15);
  pointer-events: none;
  z-index: 1;
}
.trace-canvas {
  position: relative;
  z-index: 2;
}
.trace-actions {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
}
</style>
