import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'

import fs from 'fs'
import dayjs from 'dayjs'

const VERSION_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss')
const str_ver = JSON.stringify({ VERSION_TIME })!
fs.writeFileSync('./public/version.json', str_ver)

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VERSION_TIME': JSON.stringify(VERSION_TIME)
  },
  plugins: [vue(), vueJsx(), UnoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  }
})
