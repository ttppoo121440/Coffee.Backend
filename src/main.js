import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Icon from "@/plugins/VueAwesome";
import "@/plugins/ElementUI";
import "@/plugins/VeeValidate";
import "@/plugins/VueLoading";
import "@/plugins/VueMoment";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: {
    "v-icon": Icon,
  },
  render: (h) => h(App),
}).$mount("#app");
