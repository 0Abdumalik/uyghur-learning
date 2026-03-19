<template>
  <view class="lang-switcher">
    <wd-button
      v-for="lang in langs"
      :key="lang"
      size="small"
      :type="currentLang === lang ? 'primary' : 'default'"
      @click="setLang(lang)"
    >{{ langLabel[lang] }}</wd-button>
  </view>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { currentLang, langLabel, setLang } = useI18n()
const langs = ['ug', 'zh', 'en'] as const
</script>

<style scoped>
.lang-switcher {
  display: flex;
  gap: 12rpx;
  justify-content: center;
  padding: 8rpx 0;
}
</style>
