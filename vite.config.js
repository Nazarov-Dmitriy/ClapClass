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
                additionalData: `
                @import "./src/assets/styles/_variables.scss";
                @import "./src/assets/styles/_mixins.scss";
              `
            }
        }
    }
})
