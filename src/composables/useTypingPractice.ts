import { ref, computed } from 'vue'

export function useTypingPractice() {
  const target = ref('')
  const input = ref('')
  const isActive = ref(false)
  const isComplete = ref(false)
  const itemsDone = ref(0)

  function start(text: string) {
    target.value = text.normalize('NFC')
    input.value = ''
    isActive.value = true
    isComplete.value = false
  }

  function onInput(val: string) {
    if (!isActive.value) return
    input.value = val.normalize('NFC')
    if (input.value.length >= target.value.length) {
      itemsDone.value++
      isComplete.value = true
      isActive.value = false
    }
  }

  function reset() {
    target.value = ''
    input.value = ''
    isActive.value = false
    isComplete.value = false
    itemsDone.value = 0
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

  return {
    target, input, isActive, isComplete, itemsDone,
    charResults, start, onInput, reset,
  }
}
