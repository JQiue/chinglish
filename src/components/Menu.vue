<template>
  <div class="menu">
    <n-menu v-model:value="activeKey" :options="menuOptions"></n-menu>
    <div>
      <n-tabs type="segment" animated default-value="白天">
        <n-tab name="白天" @click="global.theme = null"></n-tab>
        <n-tab name="黑夜" @click="global.theme = darkTheme"></n-tab>
      </n-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuOption } from "naive-ui";
import { ref, h } from "vue";
import { RouterLink } from "vue-router";
import { global } from '../store/global';
import { darkTheme } from "naive-ui";

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
  height: 100%;
  position: fixed;
  width: 144px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
