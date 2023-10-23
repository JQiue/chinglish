import UnfamiliarWord from "../views/unfamiliar/index.vue";
import Read from "../views/read/index.vue";
import Article from "../views/article/index.vue";
import About from "../views/about/index.vue";

export default [
  { path: "/", redirect: "/read" },
  { name: "read", path: "/read/:id?", component: Read },
  { path: "/unfamiliar_word", component: UnfamiliarWord },
  { path: "/article", component: Article },
  { path: "/about", component: About },
];
