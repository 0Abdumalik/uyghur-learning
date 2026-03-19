<template>
  <wd-card>
    <view class="stats-inner">
      <view class="stat-item">
        <text class="stat-value">{{ elapsed }}</text>
        <text class="stat-label">{{ t.typing.time }}</text>
      </view>
      <view class="stat-item">
        <text class="stat-value" :class="{ good: accuracy >= 80, bad: accuracy < 60 }">{{ accuracy }}%</text>
        <text class="stat-label">{{ t.typing.accuracy }}</text>
      </view>
      <view class="stat-item" v-if="showWpm">
        <text class="stat-value">{{ wpm }}</text>
        <text class="stat-label">{{ t.typing.wpm }}</text>
      </view>
    </view>
  </wd-card>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

defineProps<{
  elapsed: string
  accuracy: number
  wpm?: number
  showWpm?: boolean
}>()
</script>

<style scoped>
.stats-inner {
  display: flex;
  justify-content: space-around;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-value {
  font-size: 36rpx;
  font-weight: 700;
  color: #333;
}
.stat-value.good { color: #52C41A; }
.stat-value.bad { color: #E76F51; }
.stat-label {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}
</style>
