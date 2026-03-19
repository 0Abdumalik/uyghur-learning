import { ref, computed } from 'vue'
import { useStorage } from './useStorage'

export interface SessionRecord {
  id: string
  type: 'typing' | 'handwriting'
  category: 'practice' | 'test'
  mode?: 'letter' | 'word' | 'sentence'
  accuracy: number
  wpm?: number
  duration: number
  date: string
  letterStats?: Record<string, { correct: number; total: number }>
  totalItems?: number
  correctItems?: number
  wrongItems?: number
}

export function useProgress() {
  const storage = useStorage()
  const sessions = ref<SessionRecord[]>(storage.get('sessions', []))

  function saveSession(session: Omit<SessionRecord, 'id' | 'date'>) {
    const record: SessionRecord = {
      ...session,
      id: Date.now().toString(36),
      date: new Date().toISOString(),
    }
    sessions.value.unshift(record)
    if (sessions.value.length > 100) sessions.value = sessions.value.slice(0, 100)
    storage.set('sessions', sessions.value)
    updateStreak()
  }

  const totalSessions = computed(() => sessions.value.length)
  const totalTime = computed(() => sessions.value.reduce((s, r) => s + r.duration, 0))
  const avgAccuracy = computed(() => {
    const tests = sessions.value.filter(s => s.category === 'test')
    if (!tests.length) return 0
    return Math.round(tests.reduce((s, r) => s + r.accuracy, 0) / tests.length)
  })

  const testSessions = computed(() => sessions.value.filter(s => s.category === 'test'))
  const practiceSessions = computed(() => sessions.value.filter(s => s.category === 'practice'))

  const streak = ref(storage.get('streak', 0))

  function updateStreak() {
    const today = new Date().toISOString().slice(0, 10)
    const lastDate = storage.get('lastPracticeDate', '')
    if (lastDate === today) return

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    if (lastDate === yesterday) {
      streak.value++
    } else if (lastDate !== today) {
      streak.value = 1
    }
    storage.set('streak', streak.value)
    storage.set('lastPracticeDate', today)
  }

  const letterAccuracy = computed(() => {
    const map: Record<string, { correct: number; total: number }> = {}
    for (const s of sessions.value) {
      if (!s.letterStats) continue
      for (const [letter, stat] of Object.entries(s.letterStats)) {
        if (!map[letter]) map[letter] = { correct: 0, total: 0 }
        map[letter].correct += stat.correct
        map[letter].total += stat.total
      }
    }
    return map
  })

  function getBestRecord(mode: string): SessionRecord | null {
    const tests = sessions.value.filter(s => s.category === 'test' && s.mode === mode)
    if (!tests.length) return null
    return tests.reduce((best, s) => (s.accuracy > best.accuracy || (s.accuracy === best.accuracy && (s.wpm || 0) > (best.wpm || 0))) ? s : best)
  }

  function clearProgress() {
    sessions.value = []
    streak.value = 0
    storage.remove('sessions')
    storage.remove('streak')
    storage.remove('lastPracticeDate')
  }

  function reload() {
    sessions.value = storage.get('sessions', [])
    streak.value = storage.get('streak', 0)
  }

  return {
    sessions, totalSessions, totalTime, avgAccuracy,
    streak, letterAccuracy, testSessions, practiceSessions,
    saveSession, clearProgress, reload, getBestRecord,
  }
}
