import { createRouter, createWebHashHistory } from 'vue-router'
// import Recommend from '@/views/recommend'
// import Album from '@/views/album'
// import Singer from '@/views/singer'
// import SingerDetail from '@/views/singer-detail'
// import TopList from '@/views/top-list'
// import Search from '@/views/search'
// import UserCenter from '@/views/user-center'

// 路由懒加载
const Recommend = () => import(/* webpackChunkName: "recommend" */ '@/views/recommend')
const Album = () => import(/* webpackChunkName: "album" */ '@/views/album')
const Singer = () => import(/* webpackChunkName: "singer" */ '@/views/singer')
const SingerDetail = () => import(/* webpackChunkName: "singer-detail" */ '@/views/singer-detail')
const TopList = () => import(/* webpackChunkName: "top-list" */ '@/views/top-list')
const Search = () => import(/* webpackChunkName: "search" */ '@/views/search')
const UserCenter = () => import(/* webpackChunkName: "user-center" */ '@/views/user-center')

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
