import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/common/AppLayout.vue'
import { useUserStore } from '../stores/user'
import axios from 'axios';

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
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

//전역 가드 설정
router.beforeEach(async (to, from) => {
  console.log(to)
  if (to.name == 'login'){
    return true;
  } 
  const token = window.localStorage.getItem('access-token');
  if (!token) {
    alert("로그인이 필요합니다.");
    return { name: "login" };
  }

  let isAuth = false;

  console.log(token);
  axios.get('http://localhost:8080/api/user/validation?token=' + token)
    .then(response => {
      console.log("서버응답결과 : "+response.data);
      if (response.data == true) {
        console.log("성공!")
        isAuth = true;
      }
    })
    .then(()=>{
      if (isAuth){
        return true;
      } else {
        console.error('Error sending data to server:', error);
        alert("로그인이 필요합니다.");
      return { name: "login" };
      }
    })
    .catch(error => {
      console.error('Error sending data to server:', error);
      alert("로그인이 필요합니다.");
      return { name: "login" };
    });

})

export default router
