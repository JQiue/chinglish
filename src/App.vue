<script setup lang="ts">
import Menu from '@/components/Menu.vue';
import { resolveResource } from '@tauri-apps/api/path'
// import { readBinaryFile, } from '@tauri-apps/api/fs'
import { onMounted } from 'vue';

onMounted(async () => {
  const resourcePath = await resolveResource('resource/dict.db')
  console.log(resourcePath);
  // const langDe = await readBinaryFile(resourcePath)
})
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider width="144px">
      <Menu></Menu>
    </n-layout-sider>
    <n-layout>
      <n-layout-content>
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped></style>
