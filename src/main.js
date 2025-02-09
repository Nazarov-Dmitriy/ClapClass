import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/style.scss'
import App from './App.vue'
import router from './router'
import directives from './common/directive/directives'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueVideoPlayer)
directives(app)
app.mount('#app')
app.use(CkeditorPlugin)
