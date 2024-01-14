<template>
  <n-drawer :show="props.show" :width="302" placement="right" @mask-click="() => state.showEditor = false">
    <n-drawer-content :title="state.editorMode == 'add' ? '添加' : '编辑'">
      <n-input placeholder="标题" v-model:value="state.article.title"></n-input>
      <n-input placeholder="作者" v-model:value="state.article.author"></n-input>
      <n-input placeholder="合辑" v-model:value="state.article.collection"></n-input>
      <n-input placeholder="来源" v-model:value="state.article.source"></n-input>
      <n-input placeholder="内容" type="textarea" v-model:value="state.article.content"></n-input>
      <n-button @click="handleSubmit">提交</n-button>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { articlesTable } from '@/db/services';
import { state } from './store';

const props = defineProps<{ show: boolean }>();

const handleSubmit = async () => {
  if (state.editorMode == 'add') {
    const { title, author, content, collection, source } = state.article;
    articlesTable.add(title, author, content, collection, source);
  } else {
    articlesTable.update(state.article);
  }
  state.showEditor = false;
  state.articles = await articlesTable.get();
  state.article = {
    id: 0,
    title: "",
    author: "",
    content: "",
    source: "",
    collection: "",
    read_count: 0,
    created_at: "",
  }
}
</script>

<style scoped></style>