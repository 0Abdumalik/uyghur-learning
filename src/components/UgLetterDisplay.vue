<template>
  <view class="letter-display" :class="{ rtl: true }">
    <view class="letter-main ug-text">{{ letter.forms.isolated }}</view>
    <view v-if="showForms" class="forms-row">
      <view class="form-item" v-for="(form, key) in formLabels" :key="key">
        <text class="form-char ug-text">{{ letter.forms[key] }}</text>
        <text class="form-label">{{ form }}</text>
      </view>
    </view>
    <view class="letter-info">
      <text class="letter-name">{{ letter.name[currentLang] || letter.name.en }}</text>
      <text class="letter-roman">[{{ letter.romanized }}]</text>
      <text v-if="showKey" class="letter-key">{{ t.typing.letterHint }}{{ letter.keyboardKey }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import type { UgLetter } from '@/data/letters'

const props = withDefaults(defineProps<{
  letter: UgLetter
  showForms?: boolean
  showKey?: boolean
}>(), { showForms: false, showKey: false })

const { t, currentLang } = useI18n()

const formLabels = computed(() => ({
  isolated: t.value.handwriting.isolated,
  initial: t.value.handwriting.initial,
  medial: t.value.handwriting.medial,
  final: t.value.handwriting.final,
}))
</script>

<style scoped>
.letter-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx;
}
.letter-main {
  font-size: 80rpx;
  line-height: 1.4;
  color: #1E6B5C;
}
.forms-row {
  display: flex;
  gap: 24rpx;
  margin-top: 16rpx;
}
.form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-char {
  font-size: 48rpx;
  color: #333;
}
.form-label {
  font-size: 20rpx;
  color: #999;
  margin-top: 4rpx;
}
.letter-info {
  display: flex;
  gap: 16rpx;
  align-items: center;
  margin-top: 12rpx;
}
.letter-name {
  font-size: 28rpx;
  color: #333;
}
.letter-roman {
  font-size: 24rpx;
  color: #666;
}
.letter-key {
  font-size: 22rpx;
  color: #999;
  background: #f0f0f0;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
}
</style>
