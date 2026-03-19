<template>
  <view class="keyboard">
    <view class="kb-row" v-for="(row, ri) in rows" :key="ri">
      <view
        v-for="key in row"
        :key="key.char"
        class="kb-key"
        :class="{ 'kb-space': key.char === ' ', 'kb-wide': key.wide, 'kb-backspace': key.char === '⌫' }"
        @click="onKey(key.char)"
      >
        <text class="kb-char ug-text" v-if="key.char !== '⌫'">{{ key.label }}</text>
        <wd-icon v-else name="keyboard-delete" size="40rpx" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface KBKey {
  char: string
  label: string
  wide?: boolean
}

const emit = defineEmits<{
  (e: 'input', char: string): void
  (e: 'backspace'): void
}>()

// RTL layout: keys are ordered right-to-left per row
const rows: KBKey[][] = [
  // Row 1 (RTL order)
  [
    { char: 'ئ', label: 'ئ' },
    { char: 'و', label: 'و' },
    { char: 'ى', label: 'ى' },
    { char: 'ي', label: 'ي' },
    { char: 'ت', label: 'ت' },
    { char: 'پ', label: 'پ' },
    { char: 'ۇ', label: 'ۇ' },
    { char: 'ۈ', label: 'ۈ' },
    { char: 'ې', label: 'ې' },
    { char: 'ۋ', label: 'ۋ' },
    { char: 'چ', label: 'چ' },
  ],
  // Row 2 (RTL order)
  [
    { char: 'خ', label: 'خ' },
    { char: 'ل', label: 'ل' },
    { char: 'ك', label: 'ك' },
    { char: 'ق', label: 'ق' },
    { char: 'ش', label: 'ش' },
    { char: 'د', label: 'د' },
    { char: 'ۆ', label: 'ۆ' },
    { char: 'ر', label: 'ر' },
    { char: 'ە', label: 'ە' },
    { char: 'ا', label: 'ا' },
    { char: 'ھ', label: 'ھ' },
  ],
  // Row 3 (RTL order)
  [
    { char: 'س', label: 'س' },
    { char: 'گ', label: 'گ' },
    { char: 'ج', label: 'ج' },
    { char: 'م', label: 'م' },
    { char: 'ن', label: 'ن' },
    { char: 'ب', label: 'ب' },
    { char: 'ف', label: 'ف' },
    { char: 'غ', label: 'غ' },
    { char: 'ڭ', label: 'ڭ' },
    { char: 'ز', label: 'ز' },
  ],
  // Row 4 (RTL order: backspace left, space center, ژ right)
  [
    { char: '⌫', label: '⌫' },
    { char: ' ', label: 'بوشلۇق', wide: true },
    { char: 'ژ', label: 'ژ' },
  ],
]

function onKey(char: string) {
  if (char === '⌫') {
    emit('backspace')
  } else {
    emit('input', char)
  }
}
</script>

<style scoped>
.keyboard {
  padding: 12rpx 8rpx;
  background: #e8e8e8;
  border-radius: 16rpx 16rpx 0 0;
  direction: rtl;
}
.kb-row {
  display: flex;
  justify-content: center;
  gap: 6rpx;
  margin-bottom: 8rpx;
  direction: rtl;
}
.kb-key {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 56rpx;
  height: 76rpx;
  padding: 0 8rpx;
  background: #fff;
  border-radius: 8rpx;
  box-shadow: 0 1px 2px rgba(0,0,0,0.12);
  flex-shrink: 0;
}
.kb-key:active {
  background: #d0d0d0;
}
.kb-wide {
  flex: 1;
  min-width: 200rpx;
}
.kb-space {
  flex: 1;
}
.kb-backspace {
  background: #ddd;
  min-width: 72rpx;
}
.kb-char {
  font-size: 30rpx;
  color: #333;
}
</style>
