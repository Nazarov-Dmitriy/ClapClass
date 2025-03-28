import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        svgLoader({
            defaultImport: 'url'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
                additionalData: `@use "/src/assets/styles/_entry.scss" as *;`
            }
        }
    }
})
