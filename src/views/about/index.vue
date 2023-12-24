<template>
  <n-thing>
    版本：{{ version }}
  </n-thing>
  <n-thing>
    作者：{{ author }}
  </n-thing>
  <n-thing>
    数据：{{ dataPath }}
  </n-thing>
</template>

<script setup lang="ts">
import { app, path } from '@tauri-apps/api';
import { onMounted } from 'vue';
import { ref } from 'vue';


const version = ref('0.0.0');
const author = ref('Ush2a');
const dataPath = ref('');

// tauri:: api:: path:: BaseDirectory:: App

onMounted(async () => {
  version.value = await app.getVersion();
  dataPath.value = await path.appDataDir()
})

</script>

<style scoped></style>