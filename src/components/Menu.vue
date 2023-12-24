<script setup lang="ts">
import { MenuOption } from "naive-ui";
import { onMounted, ref, h } from "vue";
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
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "rss",
          },
        },
        { default: () => "RSS" }
      ),
    key: "rss",
  },
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

onMounted(async () => { });
</script>

<template>
  <n-menu v-model:value="activeKey" :options="menuOptions"></n-menu>
</template>

<style scoped></style>
