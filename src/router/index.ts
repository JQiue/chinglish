import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./modules";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
