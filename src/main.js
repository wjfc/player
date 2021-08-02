import Vue from "vue";
import { Toast } from "vant";
import App from "./App.vue";
import router from "./router";
import loading from '@/plugins/loading/index.js';
import '@/assets/less/reset.less';
import '@/assets/less/resetVant.less'

Vue.use(loading);
Vue.use(Toast);
Vue.config.productionTip = false;
/* eslint-disable */
// var vconsole = new VConsole();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
