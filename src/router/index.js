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
    },
    {
      path: '/detail/:id', // 수정된 부분
      name: 'detail',
      component: () => import('../views/ListDetail.vue')
    },
    {
      path: '/review/:id',
      name: 'writeReview',
      component: () => import('../views/WriteReview.vue')
    }
  ]
})

export default router
