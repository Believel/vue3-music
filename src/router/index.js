import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '@/views/recommend'
import Album from '@/views/album'
import Singer from '@/views/singer'
import SingerDetail from '@/views/singer-detail'
import TopList from '@/views/top-list'
import Search from '@/views/search'
import UserCenter from '@/views/user-center'
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    component: TopList
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    components: {
      // 命名视图
      // 左边 user 对应： <router-view name="user"></router-view>
      user: UserCenter
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
