<template>
  <view class="page">
    <view class="header">
      <text class="page-title">{{ t.typing.title }}</text>
    </view>

    <!-- Mode tabs -->
    <view class="mode-tabs">
      <wd-button size="small" :type="mode === 'practice' ? 'primary' : 'default'" @click="switchMode('practice')">{{ t.typing.practice }}</wd-button>
      <wd-button size="small" :type="mode === 'test' ? 'primary' : 'default'" @click="switchMode('test')">{{ t.typing.test }}</wd-button>
    </view>

    <!-- Category selector -->
    <view class="category-row">
      <wd-button size="small" :type="category === 'letter' ? 'primary' : 'default'" @click="category = 'letter'">{{ t.typing.letter }}</wd-button>
      <wd-button size="small" :type="category === 'word' ? 'primary' : 'default'" @click="category = 'word'">{{ t.typing.word }}</wd-button>
      <wd-button size="small" :type="category === 'sentence' ? 'primary' : 'default'" @click="category = 'sentence'">{{ t.typing.sentence }}</wd-button>
    </view>

    <!-- Practice Mode -->
    <view v-if="mode === 'practice'" class="practice-area">
      <view v-if="!practice.isActive.value && !practice.isComplete.value" class="start-area">
        <wd-button type="primary" @click="startPractice">{{ t.typing.start }}</wd-button>
      </view>
      <view v-else>
        <TypingInput
          :modelValue="practice.input.value"
          :charResults="practice.charResults.value"
          :placeholder="t.typing.placeholder"
          @update:modelValue="onPracticeInput"
        />
        <view v-if="practice.isComplete.value" class="complete-row">
          <text class="complete-text">{{ t.typing.complete }}</text>
          <wd-button size="small" type="primary" @click="nextPractice">{{ t.typing.next }}</wd-button>
        </view>
      </view>
    </view>

    <!-- Test Mode -->
    <view v-if="mode === 'test'" class="test-area">
      <view v-if="!test.isActive.value && !test.isComplete.value" class="start-area">
        <wd-button type="primary" @click="startTest">{{ t.typing.start }}</wd-button>
      </view>
      <view v-else-if="test.isActive.value">
        <StatsBar :elapsed="test.elapsed.value" :accuracy="currentAccuracy" :wpm="0" :showWpm="false" />
        <TypingInput
          :modelValue="test.input.value"
          :charResults="test.charResults.value"
          :placeholder="t.typing.placeholder"
          @update:modelValue="onTestInput"
        />
      </view>
      <view v-else-if="test.isComplete.value" class="result-area">
        <text class="result-title">{{ t.typing.result }}</text>
        <view class="result-grid">
          <view class="result-item">
            <text class="result-val">{{ testResult?.accuracy }}%</text>
            <text class="result-label">{{ t.typing.accuracy }}</text>
          </view>
          <view class="result-item">
            <text class="result-val">{{ testResult?.wpm }}</text>
            <text class="result-label">{{ t.typing.wpm }}</text>
          </view>
          <view class="result-item">
            <text class="result-val">{{ testResult?.duration }}{{ t.typing.seconds }}</text>
            <text class="result-label">{{ t.typing.duration }}</text>
          </view>
          <view class="result-item">
            <text class="result-val">{{ testResult?.correctItems }}/{{ testResult?.totalItems }}</text>
            <text class="result-label">{{ t.typing.correctItems }}</text>
          </view>
        </view>
        <wd-button type="primary" @click="startTest">{{ t.typing.restart }}</wd-button>
      </view>
    </view>

    <!-- Keyboard toggle -->
    <view class="kb-toggle">
      <wd-button size="small" plain @click="showKb = !showKb">
        {{ showKb ? t.typing.hideKeyboard : t.typing.showKeyboard }}
      </wd-button>
    </view>
    <UgKeyboard v-if="showKb" @input="onKbInput" @backspace="onKbBackspace" />

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useTypingPractice } from '@/composables/useTypingPractice'
import { useTypingTest, type TestResult } from '@/composables/useTypingTest'
import { useProgress } from '@/composables/useProgress'
import { letters } from '@/data/letters'
import { sentences, words } from '@/data/sentences'
import CustomTabBar from '@/components/CustomTabBar.vue'
import TypingInput from '@/components/TypingInput.vue'
import UgKeyboard from '@/components/UgKeyboard.vue'
import StatsBar from '@/components/StatsBar.vue'

const { t } = useI18n()
const practice = useTypingPractice()
const test = useTypingTest()
const progress = useProgress()

const mode = ref<'practice' | 'test'>('practice')
const category = ref<'letter' | 'word' | 'sentence'>('letter')
const showKb = ref(true)
const testResult = ref<TestResult | null>(null)

function getItems(): string[] {
  if (category.value === 'letter') {
    return letters.map(l => l.forms.isolated)
  } else if (category.value === 'word') {
    return [...words].sort(() => Math.random() - 0.5).slice(0, 15)
  } else {
    return sentences.sort(() => Math.random() - 0.5).slice(0, 5).map(s => s.ug)
  }
}

let practiceItems: string[] = []
let practiceIdx = 0

function startPractice() {
  practiceItems = getItems()
  practiceIdx = 0
  practice.reset()
  practice.start(practiceItems[practiceIdx])
}

function nextPractice() {
  practiceIdx++
  if (practiceIdx >= practiceItems.length) {
    practiceIdx = 0
    practiceItems = getItems()
  }
  practice.start(practiceItems[practiceIdx])
}

function onPracticeInput(val: string) {
  practice.onInput(val)
  if (practice.isComplete.value) {
    progress.saveSession({
      type: 'typing',
      category: 'practice',
      mode: category.value,
      accuracy: practice.charResults.value.filter(c => c.correct).length / practice.charResults.value.length * 100,
      duration: 0,
    })
  }
}

function startTest() {
  testResult.value = null
  const items = getItems()
  test.beginTest(items, category.value, 'up')
}

const currentAccuracy = computed(() => {
  const results = test.charResults.value.filter(c => c.typed)
  if (!results.length) return 100
  return Math.round(results.filter(c => c.correct).length / results.length * 100)
})

function onTestInput(val: string) {
  test.onInput(val)
  if (test.isComplete.value) {
    const result = test.getResult()
    testResult.value = result
    progress.saveSession({
      type: 'typing',
      category: 'test',
      mode: category.value,
      accuracy: result.accuracy,
      wpm: result.wpm,
      duration: result.duration,
      letterStats: result.letterStats,
      totalItems: result.totalItems,
      correctItems: result.correctItems,
      wrongItems: result.wrongItems,
    })
  }
}

function onKbInput(char: string) {
  if (mode.value === 'practice' && practice.isActive.value) {
    onPracticeInput(practice.input.value + char)
  } else if (mode.value === 'test' && test.isActive.value) {
    onTestInput(test.input.value + char)
  }
}

function onKbBackspace() {
  if (mode.value === 'practice' && practice.isActive.value) {
    const chars = [...practice.input.value]
    chars.pop()
    onPracticeInput(chars.join(''))
  } else if (mode.value === 'test' && test.isActive.value) {
    const chars = [...test.input.value]
    chars.pop()
    onTestInput(chars.join(''))
  }
}

function switchMode(m: 'practice' | 'test') {
  mode.value = m
  practice.reset()
  testResult.value = null
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
.mode-tabs, .category-row {
  display: flex;
  justify-content: center;
  gap: 16rpx;
  padding: 12rpx 32rpx;
}
.practice-area, .test-area {
  padding: 16rpx 24rpx;
}
.start-area {
  display: flex;
  justify-content: center;
  padding: 60rpx 0;
}
.complete-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
  margin-top: 24rpx;
}
.complete-text {
  font-size: 32rpx;
  color: #52C41A;
  font-weight: 600;
}
.result-area {
  padding: 32rpx 24rpx;
  text-align: center;
}
.result-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1E6B5C;
  margin-bottom: 24rpx;
  display: block;
}
.result-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  justify-content: center;
  margin-bottom: 32rpx;
}
.result-item {
  width: 40%;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx 16rpx;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.result-val {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  color: #1E6B5C;
}
.result-label {
  display: block;
  font-size: 22rpx;
  color: #999;
  margin-top: 8rpx;
}
.kb-toggle {
  display: flex;
  justify-content: center;
  padding: 12rpx;
}
</style>
