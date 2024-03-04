<template>
  <n-drawer :show="props.show" :width="302" placement="right" @mask-click="() => state.showEditor = false">
    <n-drawer-content :title="state.editorMode == 'add' ? '添加' : '编辑'">
      <n-input placeholder="标题" v-model:value="state.article.title"></n-input>
      <n-auto-complete v-model:value="state.article.author" :input-props="{
    autocomplete: 'disabled'
  }" :options="authorOptions" placeholder="作者" clearable @update:value="handleAuthorUpdate" />
      <n-auto-complete v-model:value="state.article.volume" :input-props="{
    autocomplete: 'disabled'
  }" :options="volumeOptions" placeholder="册" clearable @update:value="handleVolumeUpdate" />
      <n-input placeholder="来源" v-model:value="state.article.source"></n-input>
      <n-input placeholder="内容" type="textarea" v-model:value="state.article.content"></n-input>
      <n-input placeholder="翻译" type="textarea" v-model:value="state.article.translate"></n-input>
      <n-button @click="handleSubmit">提交</n-button>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useArticlesTable } from '@/db';
import { state } from './store';
import { useMessage } from 'naive-ui';

const articlesTable = useArticlesTable();
const message = useMessage();

const props = defineProps<{ show: boolean }>();

const authorOptions = ref<string[]>([])
const volumeOptions = ref<string[]>([])

const handleAuthorUpdate = async () => {
  const result = await articlesTable.getAuthor();
  authorOptions.value = result;
}

const handleVolumeUpdate = async () => {
  const result = await articlesTable.getVolume();
  volumeOptions.value = result;
}

const handleSubmit = async () => {
  if (state.editorMode == 'add') {
    const { title, author, content, collection, volume, source, translate } = state.article;
    const { lastInsertId } = await articlesTable.add(title, author, content, collection, volume, source, translate);
    if (lastInsertId != 0) {
      message.success("添加成功")
    }
  } else {
    const { rowsAffected } = await articlesTable.update(state.article);
    if (rowsAffected != 0) {
      message.success("更新成功")
    }
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
    volume: "",
    read_count: 0,
    created_at: "",
    translate: ""
  }
}
</script>

<style scoped></style>