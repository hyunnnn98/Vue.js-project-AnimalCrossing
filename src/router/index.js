import Vue from 'vue';
import { IonicVueRouter } from '@ionic/vue';

Vue.use(IonicVueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
];

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
