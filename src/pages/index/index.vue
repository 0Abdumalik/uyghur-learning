<template>
  <view class="page">
    <view class="header">
      <text class="page-title">{{ t.home.title }}</text>
      <text class="page-subtitle">{{ t.home.subtitle }}</text>
      <LangSwitcher />
    </view>

    <!-- Filter tabs -->
    <view class="filter-row">
      <wd-button size="small" :type="filter === 'all' ? 'primary' : 'default'" @click="filter = 'all'">{{ t.home.allLetters }}</wd-button>
      <wd-button size="small" :type="filter === 'vowel' ? 'primary' : 'default'" @click="filter = 'vowel'">{{ t.home.vowels }}</wd-button>
      <wd-button size="small" :type="filter === 'consonant' ? 'primary' : 'default'" @click="filter = 'consonant'">{{ t.home.consonants }}</wd-button>
    </view>

    <!-- Letter grid -->
    <view class="letter-grid">
      <view
        v-for="letter in filteredLetters"
        :key="letter.id"
        class="letter-cell"
        :class="{ active: selectedLetter?.id === letter.id }"
        @click="selectLetter(letter)"
      >
        <text class="cell-char ug-text">{{ letter.forms.isolated }}</text>
        <text class="cell-name">{{ letter.name[currentLang] || letter.name.en }}</text>
      </view>
    </view>

    <!-- Letter detail modal -->
    <view v-if="selectedLetter" class="detail-overlay" @click.self="selectedLetter = null">
      <view class="detail-card">
        <view class="detail-close" @click="selectedLetter = null">✕</view>
        <UgLetterDisplay :letter="selectedLetter" :showForms="true" :showKey="true" />
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { letters, type UgLetter } from '@/data/letters'
import { useI18n } from '@/composables/useI18n'
import CustomTabBar from '@/components/CustomTabBar.vue'
import LangSwitcher from '@/components/LangSwitcher.vue'
import UgLetterDisplay from '@/components/UgLetterDisplay.vue'

const { t, currentLang } = useI18n()

const filter = ref<'all' | 'vowel' | 'consonant'>('all')
const selectedLetter = ref<UgLetter | null>(null)

const filteredLetters = computed(() => {
  if (filter.value === 'all') return letters
  return letters.filter(l => l.type === filter.value)
})

function selectLetter(letter: UgLetter) {
  selectedLetter.value = letter
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding-bottom: 120rpx;
  background: #f5f5f5;
}
.header {
  padding: 40rpx 32rpx 20rpx;
  text-align: center;
}
.page-title {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  color: #1E6B5C;
}
.page-subtitle {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
  margin-bottom: 16rpx;
}
.filter-row {
  display: flex;
  justify-content: center;
  gap: 16rpx;
  padding: 16rpx 32rpx;
}
.letter-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 16rpx 24rpx;
  gap: 16rpx;
  justify-content: center;
  direction: rtl;
}
.letter-cell {
  width: 120rpx;
  height: 140rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.2s;
}
.letter-cell:active,
.letter-cell.active {
  background: #e8f5f1;
  box-shadow: 0 2px 12px rgba(30,107,92,0.15);
}
.cell-char {
  font-size: 48rpx;
  color: #1E6B5C;
  line-height: 1.3;
}
.cell-name {
  font-size: 18rpx;
  color: #999;
  margin-top: 4rpx;
}
.detail-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.detail-card {
  width: 85%;
  max-width: 600rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx 32rpx;
  position: relative;
}
.detail-close {
  position: absolute;
  top: 20rpx;
  right: 24rpx;
  font-size: 36rpx;
  color: #999;
  padding: 8rpx;
}
</style>
