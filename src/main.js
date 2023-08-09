import { createApp } from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import router from './router/index.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@icon-park/vue-next/styles/index.css";
// import Vconsole from 'vconsole'
const app = createApp(App)
// new Vconsole()
app.use(router)
app.use(ElementPlus)
app.mount('#app')
