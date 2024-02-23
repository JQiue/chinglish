<template>
  <div class="about">
    <n-thing>
      版本：{{ version }}
    </n-thing>
    <n-thing>
      作者：{{ author }}
    </n-thing>
    <n-thing>
      数据：<n-button text @click="handleClickPath">{{ dataPath }}</n-button>
      <n-button type="warning" size="small" :loading="exportLoading" @click="handleExport">
        导出到桌面
      </n-button>
    </n-thing>
  </div>
</template>

<script setup lang="ts">
import { useDump } from '@/db';
import { app, path, shell } from '@tauri-apps/api';
import { ref, onMounted } from 'vue';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

const dump = useDump()

const version = ref('0.0.0');
const author = ref('USH2A');
const dataPath = ref('');
const exportLoading = ref(false);

const handleExport = async () => {
  exportLoading.value = true;
  if (await dump()) {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
      sendNotification({ title: 'Chinglish', body: '数据已导出' });
    }
  }
  exportLoading.value = false;
}

const handleClickPath = () => {
  new shell.Command("open-file-explorer", ["/select," + dataPath.value + "chinglish.db"]).spawn();
}

onMounted(async () => {
  version.value = await app.getVersion();
  dataPath.value = await path.appDataDir()
})
</script>

<style scoped>
.about {
  height: 100vh;
}
</style>