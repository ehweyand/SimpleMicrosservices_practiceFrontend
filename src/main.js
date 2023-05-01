import { createApp, defineAsyncComponent } from 'vue'
import store from './store'
import router from './router'
import './index.css'
import 'animate.css';
import App from './App.vue'

const BaseFlex = defineAsyncComponent(() => import('@/components/ui/BaseFlex.vue'));
const BaseButton = defineAsyncComponent(() => import('@/components/ui/BaseButton.vue'))

createApp(App)
  .use(store)
  .use(router)
  .component('base-flex', BaseFlex)
  .component('base-button', BaseButton)
  .mount('#app')