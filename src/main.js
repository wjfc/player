import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import '@/assets/less/reset.less';

Vue.config.productionTip = false;
/* eslint-disable */
// var vconsole = new VConsole();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
