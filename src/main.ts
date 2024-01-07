import { createApp } from "vue";
import { createVuetify } from "vuetify";
import naive from "naive-ui";
import { router } from "./router/index";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "./styles.css";

import { initTable } from "./db";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi", // This is already the default value - only for display purposes
  },
});

initTable();

createApp(App).use(router).use(vuetify).use(naive).mount("#app");
