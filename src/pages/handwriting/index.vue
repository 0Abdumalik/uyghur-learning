<template>
  <view class="page">
    <view class="header">
      <text class="page-title">{{ t.handwriting.title }}</text>
    </view>

    <!-- Letter selector -->
    <view class="letter-selector">
      <view class="selector-scroll">
        <view
          v-for="letter in letters"
          :key="letter.id"
          class="sel-item"
          :class="{ active: currentIdx === letter.id - 1 }"
          @click="currentIdx = letter.id - 1"
        >
          <text class="sel-char ug-text">{{ letter.forms.isolated }}</text>
        </view>
      </view>
    </view>

    <!-- Current letter display -->
    <view v-if="currentLetter" class="current-letter">
      <UgLetterDisplay :letter="currentLetter" :showForms="true" />
    </view>

    <!-- Trace / Drawing area -->
    <view v-if="currentLetter" class="draw-area">
      <LetterTrace :letterChar="currentLetter.forms.isolated" :size="280" />
    </view>

    <!-- Nav buttons -->
    <view class="nav-row">
      <wd-button size="small" :disabled="currentIdx <= 0" @click="currentIdx--">{{ t.handwriting.prev }}</wd-button>
      <wd-button size="small" :disabled="currentIdx >= letters.length - 1" @click="currentIdx++">{{ t.handwriting.next }}</wd-button>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { letters } from '@/data/letters'
import { useI18n } from '@/composables/useI18n'
import CustomTabBar from '@/components/CustomTabBar.vue'
import UgLetterDisplay from '@/components/UgLetterDisplay.vue'
import LetterTrace from '@/components/LetterTrace.vue'

const { t } = useI18n()

const currentIdx = ref(0)
const currentLetter = computed(() => letters[currentIdx.value] || null)
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
.letter-selector {
  padding: 16rpx 24rpx;
}
.selector-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  justify-content: center;
  direction: rtl;
}
.sel-item {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.sel-item.active {
  background: #1E6B5C;
}
.sel-item.active .sel-char {
  color: #fff;
}
.sel-char {
  font-size: 32rpx;
  color: #333;
}
.current-letter {
  padding: 16rpx 24rpx;
}
.draw-area {
  display: flex;
  justify-content: center;
  padding: 16rpx;
}
.nav-row {
  display: flex;
  justify-content: center;
  gap: 32rpx;
  padding: 24rpx;
}
</style>
