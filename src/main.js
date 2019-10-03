import Vue from "vue";
import App from "./App.vue";
import store from "./core/store"
import router from "./core/router"
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";

Vue.use(VueResource);

Vue.config.productionTip = false;

window._Vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
