import Vue from 'vue';
import { IonicVueRouter } from '@ionic/vue';
import { authCheck } from '@/api/auth';
import store from '../store';

Vue.use(IonicVueRouter);

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) next('/main');
      else next();
    },
  },
  {
    path: '/passport',
    name: 'Passport',
    component: () => import('@/views/PassportPage.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) next('/main');
      else next();
    },
  },
  {
    path: '/main',
    name: 'Main',
    meta: { auth: true },
    component: () => import('@/views/AppTabs.vue'),
  },
  {
    path: '/main/:id',
    name: 'Main_id',
    meta: { auth: true },
    component: () => import('@/views/PostInfoPage.vue'),
  },
  {
    path: '/post',
    name: 'Post',
    meta: { auth: true },
    component: () => import('@/views/AppTabs.vue'),
  },
  {
    path: '/talk',
    name: 'Talk',
    meta: { auth: true },
    component: () => import('@/views/AppTabs.vue'),
  },
  {
    path: '/talk/:id',
    name: 'Talk_id',
    meta: { auth: true },
    component: () => import('@/components/Talk/TalkList.vue'),
  },
  {
    path: '/info',
    name: 'Info',
    meta: { auth: true },
    component: () => import('@/views/AppTabs.vue'),
  },
  {
    path: '*',
    redirect: '/main',
  },
];

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('로그인이 필요합니다!');
    next('/login');
    return;
  } else if (to.meta.auth && store.getters.isLogin) {
    let us_info = { us_id: store.state.us_id };
    authCheck(us_info)
      .then(res => {
        console.log(res);
        store.commit('setUserInfo', res.data.info);
        console.log('체크체크!');
        next();
      })
      .catch(async err => {
        console.log('신뢰성 오류일때!', err);
        await store.dispatch('LOGOUT');
        next('/login');
      });
  } else {
    console.log('그냥일때');
    next();
  }
});

export default router;
