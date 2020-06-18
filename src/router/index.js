import Vue from 'vue';
import { IonicVueRouter } from '@ionic/vue';
import { authCheck } from '@/api/auth';
import { toastController } from '@/utils/toastController';
import store from '../store';

Vue.use(IonicVueRouter);

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('@/views/UpdatePage.vue'),
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
    component: () => import('@/views/JoinPage.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) next('/main');
      else next();
    },
  },
  {
    path: '/findPW',
    name: 'FindPW',
    component: () => import('@/views/PasswordPage.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) next('/main');
      else next();
    },
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/AppTabs.vue'),
  },
  {
    path: '/post',
    name: 'Post',
    meta: { auth: true },
    component: () => import('@/views/AppTabs.vue'),
  },
  {
    path: '/post/:id',
    name: 'Post_id',
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
    beforeEnter(to, from, next) {
      if (store.state.us_grant === -1) {
        next('/main');
      } else {
        next();
      }
    },
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    // console.log('로그인이 필요합니다!');
    try {
      const ionic = document.querySelector('.app').__vue__.$ionic;
      const auth_toast = await ionic.toastController.create({
        header: '-거래해요 동물의숲-',
        message: '회원가입 이후 사용 가능합니다.',
        color: 'tertiary',
        position: 'bottom',
        buttons: [
          {
            // side: 'start',
            // icon: 'star',
            text: '로그인',
            handler: () => {
              next('/login');
            },
          },
          {
            text: '닫기',
            role: 'cancel',
          },
        ],
      });
      auth_toast.present();
    } catch (error) {
      next('/main');
    }
    return;
  } else if (to.meta.auth && store.getters.isLogin) {
    let us_info = { us_id: store.state.us_id };
    authCheck(us_info)
      .then(res => {
        store.commit('setUserInfo', res.data.info);
        store.state.socket.emit('get_info', store.state.us_id);
        next();
      })
      .catch(async err => {
        try {
          const ionic = document.querySelector('.app').__vue__.$ionic;
          const token_toast = toastController(
            ionic,
            '세션이 만료 되었습니다. \n 다시 로그인 해주세요.',
            'success',
            null,
            'middle',
          );
          await store.dispatch('LOGOUT');
        } catch (error) {
          next('/login');
        }
        next('/login');
      });
  } else {
    next();
  }
});

export default router;
