import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/base.css";
import api from "./api/api";
import strUtils from "./utils/str-utils";
import imgBaseUrl from "./config/imgBaseUrl";
Vue.use(ElementUI);

Vue.prototype.$api = api;
Vue.prototype.$strUtils = strUtils;
Vue.prototype.$imgBaseUrl = imgBaseUrl;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
