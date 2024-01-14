<template>
  <div class="menu">
    <n-menu v-model:value="activeKey" :options="menuOptions"></n-menu>
  </div>
</template>

<script setup lang="ts">
import { MenuOption } from "naive-ui";
import { ref, h } from "vue";
import { RouterLink } from "vue-router";

const activeKey = ref<string | null>("read");

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "read",
          },
        },
        { default: () => "阅读" }
      ),
    key: "read",
  },
  // {
  //   label: () =>
  //     h(
  //       RouterLink,
  //       {
  //         to: {
  //           path: "rss",
  //         },
  //       },
  //       { default: () => "RSS" }
  //     ),
  //   key: "rss",
  // },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "unfamiliar_word",
          },
        },
        { default: () => "生词本" }
      ),
    key: "unfamiliar_word",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "article",
          },
        },
        {
          default: () => "文章",
        }
      ),
    key: "article",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "statistics",
          },
        },
        { default: () => "统计" }
      ),
    key: "statistics",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "resource",
          },
        },
        {
          default: () => "资源",
        }
      ),
    key: "resource",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "about",
          },
        },
        {
          default: () => "关于",
        }
      ),
    key: "about",
  },
];

</script>

<style scoped>
.menu {
  position: fixed;
  width: 144px;
}
</style>
