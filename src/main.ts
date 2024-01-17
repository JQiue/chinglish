import { createApp } from "vue";
import naive from "naive-ui";
import { router } from "./router/index";
import App from "./App.vue";
import "./styles.css";

import { initTable } from "./db";

initTable();

createApp(App).use(router).use(naive).mount("#app");
