import Vue from 'vue';
import { IonicVueRouter } from '@ionic/vue';
import { afterAuth } from '@/api/index';
import store from '../store';
import axios from 'axios';

Vue.use(IonicVueRouter);

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/passport',
    name: 'Passport',
    component: () => import('../views/PassportPage.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    meta: { auth: true },
    component: () => import('../views/AppTabs.vue'),
  },
  {
    path: '/post',
    name: 'Post',
    meta: { auth: true },
    component: () => import('../views/AppTabs.vue'),
  },
  {
    path: '/talk',
    name: 'Talk',
    meta: { auth: true },
    component: () => import('../views/AppTabs.vue'),
  },
  {
    path: '/info',
    name: 'Info',
    meta: { auth: true },
    component: () => import('../views/AppTabs.vue'),
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
//   } else {
//     next();
//   }
// });

export default router;
