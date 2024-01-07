<template>
  <n-layout has-sider>
    <n-layout-sider width="144px">
      <Menu></Menu>
    </n-layout-sider>
    <n-layout>
      <n-layout-content>
        <n-scrollbar :style="{ height: activeHeight }">
          <router-view></router-view>
        </n-scrollbar>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import Menu from '@/components/Menu.vue';
import { onMounted, ref } from 'vue';

const activeHeight = ref("0px");

onMounted(() => {
  activeHeight.value = document.documentElement.clientHeight + 'px';
  window.addEventListener("resize", () => {
    activeHeight.value = document.documentElement.clientHeight + 'px';
  });
});
</script>

<style scoped></style>
