import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/utils/commonComponents';
import '@/plugins/RegisterModule';
import '@/plugins/VueAwesome';
import '@/plugins/ElementUI';
import '@/plugins/VeeValidate';
import '@/plugins/VueMoment';
import '@/plugins/VueLoading';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
