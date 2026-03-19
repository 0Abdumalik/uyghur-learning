<template>
  <wd-tabbar
    :key="currentLang"
    v-model="selected"
    fixed
    bordered
    :placeholder="true"
    @change="onChange"
  >
    <wd-tabbar-item v-for="(tab, idx) in tabs" :key="idx" :title="tab.label" :icon="tab.icon" />
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t, currentLang } = useI18n()

const selected = ref(0)

const tabs = computed(() => [
  { label: t.value.tab.home, path: '/pages/index/index', icon: 'home' },
  { label: t.value.tab.typing, path: '/pages/typing/index', icon: 'edit-outline' },
  { label: t.value.tab.handwriting, path: '/pages/handwriting/index', icon: 'edit' },
  { label: t.value.tab.progress, path: '/pages/progress/index', icon: 'chart-bar' },
  { label: t.value.tab.settings, path: '/pages/settings/index', icon: 'setting' },
])

const pagePaths = [
  '/pages/index/index',
  '/pages/typing/index',
  '/pages/handwriting/index',
  '/pages/progress/index',
  '/pages/settings/index',
]

function onChange({ value }: { value: number }) {
  uni.switchTab({ url: tabs.value[value].path })
}

function syncTab() {
  const currentPages = getCurrentPages()
  if (!currentPages.length) return
  const route = '/' + currentPages[currentPages.length - 1].route
  const idx = pagePaths.indexOf(route)
  if (idx >= 0) selected.value = idx
}

onMounted(() => {
  syncTab()
})

defineExpose({ syncTab })
</script>
