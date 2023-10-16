import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import naive from "naive-ui";
import { initTable } from "./db";

const vuetify = createVuetify({
  components,
  directives,
});

initTable();

createApp(App).use(router).use(vuetify).use(naive).mount("#app");
