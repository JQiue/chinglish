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
import { ref } from 'vue';

const resources = ref([{
  title: '新概念英语第一册',
  url: "url"
}])

const handleDownload = async (_url: string) => {
}
</script>

<style scoped></style>