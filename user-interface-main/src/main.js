import Vue from "vue";
import App from "./App.vue";
import * as GmapVue from "gmap-vue";
import router from "./router/index.js";
import store from "../src/store"

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import mqtt from "mqtt";
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

const connectUrl = `ws://localhost:9001`;

Vue.prototype.$client = mqtt.connect(connectUrl, {
  clean: true,
  clientId: "mqtt001",
});

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;
Vue.use(GmapVue, {
  load: {
    key: "AIzaSyAbZvg6GJ_-uW8_zt0p1rWo_COjSgGINZg",
    libraries: "places",
  },
  installComponents: true,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
