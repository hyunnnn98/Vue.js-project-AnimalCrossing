import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import IonicVue from '@ionic/vue';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import '@/css/reset.css';

Vue.config.productionTip = false;

Vue.use(IonicVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
