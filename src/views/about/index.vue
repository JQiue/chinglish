<template>
  <n-thing>
    版本：{{ version }}
  </n-thing>
  <n-thing>
    作者：{{ author }}
  </n-thing>
</template>

<script setup lang="ts">
import { app } from '@tauri-apps/api';
import { onMounted } from 'vue';
import { ref } from 'vue';

const version = ref('0.0.0');
const author = ref('Ush2a');

onMounted(async () => {
  version.value = await app.getVersion();
})

</script>

<style scoped></style>