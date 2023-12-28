<template>
  <n-list hoverable>
    <n-list-item v-for="resource in resources">
      <n-thing content-style="font-weight: 600">
        {{ resource.title }}
      </n-thing>
      <template #suffix>
        <div class="group-btn">
          <n-button size="small" @click="handleDownload(resource.url)">下载</n-button>
        </div>
      </template>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { BaseDirectory, exists, writeBinaryFile } from '@tauri-apps/api/fs';
import { ref } from 'vue';

const resources = ref([{
  title: '字典',
  url: "http://arch.com/d/%E4%B8%8B%E8%BD%BD/dict.db"
}])

const handleDownload = async (url: string) => {
  const has = await exists("dict.db", { dir: BaseDirectory.App });
  if (has) {
    console.log("存在");
    return
  }
  const resp = await fetch(url)
  const buf = await resp.arrayBuffer();
  writeBinaryFile("dict.db", buf, {
    dir: BaseDirectory.App
  });
}
</script>

<style scoped></style>