import Vue from 'vue';
import { IonicVueRouter } from '@ionic/vue';
import { afterAuth } from '@/api/index';
import store from '../store';
import axios from 'axios';

Vue.use(IonicVueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/AppTabs.vue'),
  },
  {
    path: '/loading/:us_logintoken/:us_social_id/:us_social',
    name: 'Loading',
    component: () => import('../views/LoadingPage.vue'),
    props: true,
  },
  {
    path: '/passport',
    name: 'Passport',
    component: () => import('../views/PassportPage.vue'),
  },
];

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !store.getters.isLogin) {
//     console.log('로그인이 필요합니다!');
//     next('/login');
//     return;
//   } else if (to.meta.auth && store.getters.isLogin) {
//     afterAuth
//       .get('서버 주소')
//       .then(() => {})
//       .catch(err => {});
//   }
// });

export default router;
