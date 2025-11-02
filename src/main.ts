import { createApp } from 'vue'
import App from './App.vue'
import { gsapPlugin } from './plugins/gsap'
import { router } from './utils/router'

const app = createApp(App)
app.use(router)
app.use(gsapPlugin)
app.mount('#app')
