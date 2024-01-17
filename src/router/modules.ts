import UnfamiliarWord from "../views/unfamiliar/index.vue";
import Read from "../views/read/index.vue";
import Article from "../views/article/index.vue";
import About from "../views/about/index.vue";
import RSS from "../views/rss/index.vue";
import Resource from "../views/resource/index.vue";
import Statistics from "../views/statistics/index.vue";

export default [
  { path: "/", redirect: "/read" },
  { name: "read", path: "/read", component: Read },
  { path: "/unfamiliar_word", component: UnfamiliarWord },
  { path: "/article", component: Article },
  { path: "/about", component: About },
  { path: "/rss", component: RSS },
  { path: "/resource", component: Resource },
  { path: "/statistics", component: Statistics },
];
