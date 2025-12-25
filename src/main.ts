import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import '@kodeglot/vue-calendar/dist/style.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
