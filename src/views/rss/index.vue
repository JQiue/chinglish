<template>
  <div class="rss">
    <div class="menu">
      <n-menu :indent="16" :options="menuOptions" @update:value="handleUpdateMenuValue" />
    </div>
    <div class="iframe" :src="iframeSrc" v-html="html"></div>
  </div>
</template>

<script setup lang="ts">
import { MenuOption } from 'naive-ui';
import { ref, onMounted } from 'vue';
import { fetchFeedList } from '@/helpers';

const menuOptions = ref<MenuOption[]>([]);
const iframeSrc = ref("");
const html = ref("");
const feeds = ["https://linux.cn/rss.xml", "https://rsshub.moeyy.cn/zhihu/daily.rss", "https://rustcc.cn/rss"];

const getMenuList = async () => {
  feeds.forEach(async url => {
    const data = await fetchFeedList(url);
    if (!data) return;
    const { channel, items } = data;
    menuOptions.value.push({
      label: channel.title,
      key: channel.title,
      children: items.map(e => {
        return { label: e.title, key: e.guid, href: e.link, content: e.description }
      })
    },)
  })
}

const handleUpdateMenuValue = (_key: string, item: MenuOption) => {
  html.value = item.content as string;
}

onMounted(() => {
  getMenuList()
})
</script>

<style scoped>
.rss {
  display: flex;
  width: 100%;
  height: 100vh;

  .menu {
    width: 259px;
  }

  .iframe {
    flex: 1;
    padding: 0 1rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
}

.iframe>>>img {
  width: 100% !important;
  height: initial !important;
}
</style>