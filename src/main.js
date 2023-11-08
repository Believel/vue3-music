import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from '@/components/base/loading/directive'
import noResultDiretive from '@/components/base/no-result/diretive'

// 引入全局样式文件
import '@/assets/scss/index.scss'

// 创建一个 pinia 实例（根 store）
const pinia = createPinia()

const app = createApp(App)

// 开启 Vue.js 开发者工具
app.config.devtools = true

app.use(pinia).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
}).directive('loading', loadingDirective).directive('no-result', noResultDiretive).mount('#app')
