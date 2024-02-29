<template>
  <n-list hoverable>
    <n-list-item v-for="resource in resources">
      <n-thing content-style="font-weight: 600">
        {{ resource.title }}
      </n-thing>
      <template #suffix>
        <div class="group-btn">
          <n-button size="small" @click="handleDownload(resource.url)" :loading="downloading">下载</n-button>
        </div>
      </template>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api';
import { BaseDirectory, exists } from '@tauri-apps/api/fs';
import { useMessage } from 'naive-ui';

const message = useMessage();

const downloading = ref(false);
const resources = ref([{
  title: '字典',
  url: "http://arch.com/d/%E4%B8%8B%E8%BD%BD/dict.db"
}])

const handleDownload = async (url: string) => {
  downloading.value = true
  const has = await exists("dict.db", { dir: BaseDirectory.App });
  if (has) {
    message.info("已经下载了");
    downloading.value = false;
    return
  }
  console.log(await invoke("download", { url }));
  downloading.value = false;
}
</script>

<style scoped></style>