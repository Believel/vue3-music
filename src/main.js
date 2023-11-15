import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from '@/components/base/loading/directive'
import noResultDiretive from '@/components/base/no-result/diretive'
import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/song'
import { usePlayStore } from '@/store/player'
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

// 浏览器刷新页面 store 数据丢失
const store = usePlayStore()
const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then(songs => {
    store.setFavoriteList(songs)
    saveAll(songs, FAVORITE_KEY)
  })
}
const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    store.setPlayHistory(songs)
    saveAll(songs, PLAY_KEY)
  })
}
