import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [WotResolver()],
    }),
    uni(),
  ],
})
