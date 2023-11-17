import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/common/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppLayout
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/PlaceList.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/WishList.vue')
    },
    {
      path: '/competition',
      name: 'competition',
      component: () => import('../views/CompetitionList.vue')
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/MyPage.vue')
    }
  ]
})

export default router
