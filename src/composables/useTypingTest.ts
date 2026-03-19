import { ref, computed } from 'vue'

export interface TestError {
  target: string
  input: string
  index: number
}

export interface TestResult {
  accuracy: number
  wpm: number
  duration: number
  totalItems: number
  correctItems: number
  wrongItems: number
  errors: TestError[]
  letterStats: Record<string, { correct: number; total: number }>
  mode: 'letter' | 'word' | 'sentence'
  timerMode: 'up' | 'down'
}

export function useTypingTest() {
  const target = ref('')
  const input = ref('')
  const startTime = ref(0)
  const endTime = ref(0)
  const isActive = ref(false)
  const isComplete = ref(false)
  const timerMode = ref<'up' | 'down'>('up')
  const countdownTotal = ref(60)
  const mode = ref<'letter' | 'word' | 'sentence'>('letter')

  // Per-item tracking
  const itemTargets = ref<string[]>([])
  const itemInputs = ref<string[]>([])
  const currentItemIndex = ref(0)
  const errors = ref<TestError[]>([])
  const letterStats = ref<Record<string, { correct: number; total: number }>>({})

  function start(text: string) {
    target.value = text.normalize('NFC')
    input.value = ''
    if (!startTime.value) startTime.value = Date.now()
    endTime.value = 0
    isActive.value = true
    isComplete.value = false
  }

  function beginTest(items: string[], testMode: 'letter' | 'word' | 'sentence', timer: 'up' | 'down', countdown = 60) {
    itemTargets.value = items
    itemInputs.value = []
    currentItemIndex.value = 0
    errors.value = []
    letterStats.value = {}
    mode.value = testMode
    timerMode.value = timer
    countdownTotal.value = countdown
    startTime.value = Date.now()
    endTime.value = 0
    isComplete.value = false
    start(items[0])
  }

  function onInput(val: string) {
    if (!isActive.value) return
    input.value = val.normalize('NFC')

    // Track per-character stats
    const tChars = [...target.value]
    const iChars = [...input.value]
    for (let i = 0; i < iChars.length && i < tChars.length; i++) {
      const ch = tChars[i]
      if (!letterStats.value[ch]) letterStats.value[ch] = { correct: 0, total: 0 }
      if (i === iChars.length - 1) {
        letterStats.value[ch].total++
        if (iChars[i] === tChars[i]) letterStats.value[ch].correct++
      }
    }

    if (input.value.length >= target.value.length) {
      finishCurrentItem()
    }
  }

  function finishCurrentItem() {
    const tChars = [...target.value]
    const iChars = [...input.value]
    const isCorrect = tChars.every((ch, i) => iChars[i] === ch)

    itemInputs.value.push(input.value)

    if (!isCorrect) {
      errors.value.push({
        target: target.value,
        input: input.value,
        index: currentItemIndex.value,
      })
    }

    if (currentItemIndex.value < itemTargets.value.length - 1) {
      currentItemIndex.value++
      start(itemTargets.value[currentItemIndex.value])
    } else {
      finishTest()
    }
  }

  function finishTest() {
    endTime.value = Date.now()
    isActive.value = false
    isComplete.value = true
  }

  function checkTimeout() {
    if (timerMode.value !== 'down' || !startTime.value) return false
    const elapsed = (Date.now() - startTime.value) / 1000
    if (elapsed >= countdownTotal.value) {
      // Save current item if partially typed
      if (input.value.length > 0) {
        itemInputs.value.push(input.value)
        const tChars = [...target.value]
        const iChars = [...input.value]
        const isCorrect = tChars.length === iChars.length && tChars.every((ch, i) => iChars[i] === ch)
        if (!isCorrect) {
          errors.value.push({ target: target.value, input: input.value, index: currentItemIndex.value })
        }
      }
      finishTest()
      return true
    }
    return false
  }

  const charResults = computed(() => {
    const tChars = [...target.value]
    const iChars = [...input.value]
    return tChars.map((ch, i) => ({
      target: ch,
      input: iChars[i] || '',
      correct: iChars[i] === ch,
      typed: i < iChars.length,
    }))
  })

  const duration = computed(() => {
    if (!startTime.value) return 0
    const end = endTime.value || Date.now()
    return Math.round((end - startTime.value) / 1000)
  })

  const remainingTime = computed(() => {
    if (timerMode.value !== 'down') return 0
    return Math.max(0, countdownTotal.value - duration.value)
  })

  const elapsed = computed(() => {
    const s = duration.value
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
  })

  const progress = computed(() => {
    if (!itemTargets.value.length) return 0
    return Math.round(((currentItemIndex.value) / itemTargets.value.length) * 100)
  })

  function getResult(): TestResult {
    const totalItems = itemInputs.value.length
    const wrongItems = errors.value.length
    const correctItems = totalItems - wrongItems
    const accuracy = totalItems > 0 ? Math.round((correctItems / totalItems) * 100) : 0

    // Calculate WPM based on all characters typed
    const totalChars = itemInputs.value.reduce((sum, inp) => sum + [...inp].length, 0)
    const minutes = duration.value / 60
    const wpm = minutes > 0 ? Math.round((totalChars / 5) / minutes) : 0

    return {
      accuracy,
      wpm,
      duration: duration.value,
      totalItems,
      correctItems,
      wrongItems,
      errors: [...errors.value],
      letterStats: { ...letterStats.value },
      mode: mode.value,
      timerMode: timerMode.value,
    }
  }

  return {
    target, input, isActive, isComplete,
    timerMode, countdownTotal, currentItemIndex, itemTargets,
    charResults, duration, remainingTime, elapsed, progress,
    beginTest, onInput, finishTest, checkTimeout, getResult,
  }
}
