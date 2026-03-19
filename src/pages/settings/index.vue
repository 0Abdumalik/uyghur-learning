<template>
  <view class="page">
    <view class="header">
      <text class="page-title">{{ t.settings.title }}</text>
    </view>

    <!-- Language -->
    <view class="section">
      <text class="section-title">{{ t.settings.language }}</text>
      <view class="lang-area">
        <LangSwitcher />
      </view>
    </view>

    <!-- Clear data -->
    <view class="section">
      <wd-button type="error" plain block @click="confirmClear">{{ t.settings.clearData }}</wd-button>
    </view>

    <!-- About -->
    <view class="section">
      <text class="section-title">{{ t.settings.about }}</text>
      <view class="about-card">
        <text class="about-text">{{ t.settings.aboutText }}</text>
        <text class="about-version">{{ t.settings.version }}: 1.0.0</text>
      </view>
    </view>

    <!-- Clear confirm dialog -->
    <view v-if="showConfirm" class="confirm-overlay" @click.self="showConfirm = false">
      <view class="confirm-card">
        <text class="confirm-text">{{ t.settings.clearConfirm }}</text>
        <view class="confirm-actions">
          <wd-button size="small" @click="showConfirm = false">{{ t.settings.cancel }}</wd-button>
          <wd-button size="small" type="error" @click="doClear">{{ t.settings.confirm }}</wd-button>
        </view>
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useProgress } from '@/composables/useProgress'
import CustomTabBar from '@/components/CustomTabBar.vue'
import LangSwitcher from '@/components/LangSwitcher.vue'

const { t } = useI18n()
const { clearProgress } = useProgress()

const showConfirm = ref(false)

function confirmClear() {
  showConfirm.value = true
}

function doClear() {
  clearProgress()
  showConfirm.value = false
  uni.showToast({ title: t.value.settings.clearDone, icon: 'success' })
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
.section {
  padding: 24rpx 32rpx;
}
.section-title {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}
.lang-area {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.about-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.about-text {
  display: block;
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}
.about-version {
  display: block;
  font-size: 22rpx;
  color: #999;
  margin-top: 16rpx;
}
.confirm-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.confirm-card {
  width: 80%;
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx 32rpx;
  text-align: center;
}
.confirm-text {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 32rpx;
  line-height: 1.5;
}
.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 24rpx;
}
</style>
