import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ColorThief from "../node_modules/colorthief/dist/color-thief";

Vue.config.productionTip = false;
Vue.use(vuetify);
const colorThiefPlugin = {
  install(Vue) {
    Vue.prototype.$colorThief = new ColorThief();
  }
};
Vue.use(colorThiefPlugin);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
