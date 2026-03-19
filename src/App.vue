<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { useI18n } from '@/composables/useI18n'

const { initLang } = useI18n()

onLaunch(() => {
  initLang()
})
</script>

<style>
@font-face {
  font-family: 'UgFont';
  src: url('/static/fonts/UKIJTuz.woff2') format('woff2'),
       url('/static/fonts/UKIJTuz.woff') format('woff'),
       url('/static/fonts/UKIJTuz.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

page {
  font-family: 'UgFont', 'Microsoft Uighur', 'Scheherazade New', 'UKIJ Tuz', sans-serif;
  background-color: #f5f5f5;
  font-size: 16px;
  color: #333;
}

.rtl {
  direction: rtl;
  text-align: right;
}

.ltr {
  direction: ltr;
  text-align: left;
}

.ug-text {
  font-family: 'UgFont', 'Microsoft Uighur', 'Scheherazade New', 'UKIJ Tuz', sans-serif;
  direction: rtl;
  text-align: right;
  line-height: 1.8;
}

/* Hide native uni-app tabbar — we use wd-tabbar instead */
.uni-tabbar-bottom,
.uni-tabbar,
uni-tabbar {
  display: none !important;
  height: 0 !important;
  overflow: hidden !important;
}

/* wot-design-uni theme override */
:root {
  --wot-color-theme: #1E6B5C;
  --wot-button-primary-bg-color: #1E6B5C;
  --wot-button-primary-border-color: #1E6B5C;
  --wot-tabbar-item-active-color: #1E6B5C;
  --wot-tabs-nav-line-color: #1E6B5C;
}
</style>
