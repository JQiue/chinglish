import { createApp } from "vue";
import naive from "naive-ui";
import router from "./router/index";
import App from "./App.vue";
import "./styles.css";

import { useCreateTable } from "./db";

useCreateTable()();

createApp(App).use(router).use(naive).mount("#app");
