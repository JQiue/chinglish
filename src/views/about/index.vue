<template>
  <div class="about">
    <n-thing>
      版本：{{ version }}
    </n-thing>
    <n-thing>
      作者：{{ author }}
    </n-thing>
    <n-thing>
      数据：{{ dataPath }}
      <n-button type="warning" size="small" :loading="exportLoading" @click="handleExport">
        导出到桌面
      </n-button>
    </n-thing>
  </div>
</template>

<script setup lang="ts">
import { dump } from '@/db';
import { app, path } from '@tauri-apps/api';
import { ref, onMounted } from 'vue';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

const version = ref('0.0.0');
const author = ref('Ush2a');
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