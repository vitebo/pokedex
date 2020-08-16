import Vue from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import makeServer from '@/server';

Vue.config.productionTip = false;

if (process.env.VUE_APP_MOCKED) {
  makeServer();
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
