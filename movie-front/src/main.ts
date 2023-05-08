import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import type { PluginOptions } from "vue-toastification";
import Toast, { POSITION } from "vue-toastification";
import VueLazyLoad from "vue3-lazyload";
import "./index.css";

const app = createApp(App);

app.use(router);

const options: PluginOptions = {
  position: POSITION.BOTTOM_CENTER,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 10,
  newestOnTop: true,
};
app.use(Toast, options);

app.use(VueLazyLoad, {});

app.mount("#app");
