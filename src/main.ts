import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { Menu } from "@element-plus/icons";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .component("icon-menu", Menu)
  .mount("#app");
