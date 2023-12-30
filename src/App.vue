<script setup lang="ts">
import Menu from '@/components/Menu.vue';
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
