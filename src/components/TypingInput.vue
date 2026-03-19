<template>
  <view class="typing-input-wrap">
    <!-- Layout toggle -->
    <view class="layout-toggle">
      <wd-button
        size="small"
        :type="layout === 'two' ? 'primary' : 'default'"
        @click="layout = 'two'"
      >{{ t.typing.layoutTwoLine }}</wd-button>
      <wd-button
        size="small"
        :type="layout === 'one' ? 'primary' : 'default'"
        @click="layout = 'one'"
      >{{ t.typing.layoutOneLine }}</wd-button>
    </view>

    <!-- Two-line layout: target on top, input below -->
    <view v-if="layout === 'two'" class="layout-two">
      <view class="target-text ug-text">
        <text
          v-for="(ch, i) in charResults"
          :key="i"
          :class="{
            'char-correct': ch.typed && ch.correct,
            'char-wrong': ch.typed && !ch.correct,
            'char-current': i === currentIndex,
            'char-pending': !ch.typed && i !== currentIndex,
          }"
        >{{ ch.target === ' ' ? '\u00A0' : ch.target }}</text>
      </view>
      <view class="input-row">
        <input
          class="ug-input ug-text"
          :value="modelValue"
          :placeholder="placeholder"
          @input="onInput"
          :focus="autoFocus"
          :adjust-position="true"
        />
      </view>
    </view>

    <!-- One-line layout: target and input interleaved -->
    <view v-else class="layout-one">
      <view class="inline-row ug-text">
        <text
          v-for="(ch, i) in charResults"
          :key="i"
          :class="{
            'char-correct': ch.typed && ch.correct,
            'char-wrong': ch.typed && !ch.correct,
            'char-current': i === currentIndex,
            'char-pending': !ch.typed && i !== currentIndex,
          }"
        >{{ ch.typed ? (ch.input === ' ' ? '\u00A0' : ch.input) : (ch.target === ' ' ? '\u00A0' : ch.target) }}</text>
      </view>
      <view class="input-row">
        <input
          class="ug-input ug-text"
          :value="modelValue"
          :placeholder="placeholder"
          @input="onInput"
          :focus="autoFocus"
          :adjust-position="true"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

interface CharResult {
  target: string
  input: string
  correct: boolean
  typed: boolean
}

const props = withDefaults(defineProps<{
  modelValue: string
  charResults: CharResult[]
  placeholder?: string
  autoFocus?: boolean
}>(), { placeholder: '', autoFocus: true })

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const layout = ref<'one' | 'two'>('two')
const currentIndex = computed(() => [...props.modelValue].length)

function onInput(e: any) {
  emit('update:modelValue', e.detail.value)
}
</script>

<style scoped>
.typing-input-wrap {
  padding: 24rpx;
}
.layout-toggle {
  display: flex;
  justify-content: flex-end;
  gap: 12rpx;
  margin-bottom: 16rpx;
  direction: rtl;
}
.target-text {
  font-size: 40rpx;
  line-height: 2;
  padding: 20rpx 24rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  min-height: 100rpx;
  word-break: break-all;
}
.inline-row {
  font-size: 40rpx;
  line-height: 2;
  padding: 20rpx 24rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  min-height: 100rpx;
  word-break: break-all;
}
.char-correct {
  color: #52C41A;
}
.char-wrong {
  color: #E76F51;
  text-decoration: underline;
}
.char-current {
  background: rgba(30, 107, 92, 0.15);
  border-radius: 4rpx;
}
.char-pending {
  color: #ccc;
}
.input-row {
  margin-top: 20rpx;
}
.ug-input {
  width: 100%;
  height: 88rpx;
  padding: 0 24rpx;
  font-size: 36rpx;
  border: 2rpx solid #e8e8e8;
  border-radius: 12rpx;
  background: #fff;
  direction: rtl;
  text-align: right;
  font-family: 'UgFont', 'Microsoft Uighur', 'Scheherazade New', sans-serif;
}
</style>
