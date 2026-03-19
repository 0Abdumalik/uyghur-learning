<template>
  <view class="page">
    <view class="header">
      <text class="page-title">{{ t.progress.title }}</text>
    </view>

    <!-- Summary cards -->
    <view class="summary-grid">
      <view class="summary-card">
        <text class="summary-val">{{ totalSessions }}</text>
        <text class="summary-label">{{ t.progress.totalSessions }}</text>
      </view>
      <view class="summary-card">
        <text class="summary-val">{{ totalTimeMin }}{{ t.progress.minutes }}</text>
        <text class="summary-label">{{ t.progress.totalTime }}</text>
      </view>
      <view class="summary-card">
        <text class="summary-val">{{ avgAccuracy }}%</text>
        <text class="summary-label">{{ t.progress.avgAccuracy }}</text>
      </view>
      <view class="summary-card accent">
        <text class="summary-val">{{ streak }}</text>
        <text class="summary-label">{{ t.progress.streak }} ({{ t.progress.days }})</text>
      </view>
    </view>

    <!-- Letter accuracy -->
    <view class="section">
      <text class="section-title">{{ t.progress.letterAccuracy }}</text>
      <view v-if="letterEntries.length" class="letter-acc-grid">
        <view v-for="item in letterEntries" :key="item.letter" class="letter-acc-item">
          <text class="la-char ug-text">{{ item.letter }}</text>
          <wd-progress :percentage="item.pct" :color="item.pct >= 80 ? '#52C41A' : item.pct >= 50 ? '#FAAD14' : '#E76F51'" />
        </view>
      </view>
      <view v-else class="empty-hint">
        <text>{{ t.progress.noData }}</text>
      </view>
    </view>

    <!-- History -->
    <view class="section">
      <text class="section-title">{{ t.progress.history }}</text>
      <view v-if="sessions.length" class="history-list">
        <view v-for="s in recentSessions" :key="s.id" class="history-item">
          <view class="hi-left">
            <text class="hi-type">{{ sessionLabel(s) }}</text>
            <text class="hi-date">{{ formatDate(s.date) }}</text>
          </view>
          <view class="hi-right">
            <text class="hi-acc" :class="{ good: s.accuracy >= 80, bad: s.accuracy < 60 }">{{ Math.round(s.accuracy) }}%</text>
            <text v-if="s.wpm" class="hi-wpm">{{ s.wpm }} WPM</text>
          </view>
        </view>
      </view>
      <view v-else class="empty-hint">
        <text>{{ t.progress.noData }}</text>
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useI18n } from '@/composables/useI18n'
import { useProgress, type SessionRecord } from '@/composables/useProgress'
import CustomTabBar from '@/components/CustomTabBar.vue'

const { t } = useI18n()
const { sessions, totalSessions, totalTime, avgAccuracy, streak, letterAccuracy, reload } = useProgress()

onShow(() => { reload() })

const totalTimeMin = computed(() => Math.round(totalTime.value / 60))

const letterEntries = computed(() => {
  const map = letterAccuracy.value
  return Object.entries(map).map(([letter, stat]) => ({
    letter,
    pct: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
  })).sort((a, b) => a.pct - b.pct)
})

const recentSessions = computed(() => sessions.value.slice(0, 20))

function sessionLabel(s: SessionRecord): string {
  if (s.category === 'test') return t.value.progress.typingTest
  if (s.type === 'handwriting') return t.value.progress.handwritingPractice
  return t.value.progress.typingPractice
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding-bottom: 120rpx;
  background: #f5f5f5;
}
.header {
  padding: 40rpx 32rpx 12rpx;
  text-align: center;
}
.page-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1E6B5C;
}
.summary-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 20rpx 24rpx;
  justify-content: center;
}
.summary-card {
  width: 44%;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx 16rpx;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.summary-card.accent {
  background: #e8f5f1;
}
.summary-val {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  color: #1E6B5C;
}
.summary-label {
  display: block;
  font-size: 22rpx;
  color: #999;
  margin-top: 8rpx;
}
.section {
  padding: 20rpx 24rpx;
}
.section-title {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}
.letter-acc-grid {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.letter-acc-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #fff;
  padding: 12rpx 20rpx;
  border-radius: 12rpx;
}
.la-char {
  font-size: 36rpx;
  color: #1E6B5C;
  width: 60rpx;
  text-align: center;
}
.empty-hint {
  text-align: center;
  padding: 40rpx;
  color: #999;
  font-size: 26rpx;
}
.history-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 20rpx 24rpx;
  border-radius: 12rpx;
}
.hi-left {
  display: flex;
  flex-direction: column;
}
.hi-type {
  font-size: 26rpx;
  color: #333;
}
.hi-date {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}
.hi-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.hi-acc {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}
.hi-acc.good { color: #52C41A; }
.hi-acc.bad { color: #E76F51; }
.hi-wpm {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}
</style>
