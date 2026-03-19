import { ref, computed } from 'vue'
import en from '@/i18n/en'
import zh from '@/i18n/zh'
import ug from '@/i18n/ug'

type LangKey = 'en' | 'zh' | 'ug'
type Messages = typeof en

const messages: Record<LangKey, Messages> = { en, zh, ug: ug as unknown as Messages }

const currentLang = ref<LangKey>('ug')

export function useI18n() {
  const t = computed(() => messages[currentLang.value])
  const isRTL = computed(() => currentLang.value === 'ug')
  const langLabel: Record<LangKey, string> = { ug: 'ئۇيغۇرچە', zh: '中文', en: 'English' }

  function setLang(lang: LangKey) {
    currentLang.value = lang
    uni.setStorageSync('app_lang', lang)
  }

  function initLang() {
    const saved = uni.getStorageSync('app_lang') as LangKey
    if (saved && messages[saved]) {
      currentLang.value = saved
    }
  }

  return { t, currentLang, isRTL, langLabel, setLang, initLang }
}
