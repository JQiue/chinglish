import { createRouter, createWebHashHistory } from "vue-router";

import UnfamiliarWord from "../components/UnfamiliarWord.vue";
import Reader from "../components/Reader.vue";
import Article from "../components/Article.vue";
import About from "../components/About.vue";

const routes = [
  { path: "/", redirect: "/reader" },
  { path: "/reader", component: Reader },
  { path: "/unfamiliar_word", component: UnfamiliarWord },
  { path: "/article", component: Article },
  { path: "/about", component: About },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
