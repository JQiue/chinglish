<template>
  <div class="container">
    <div class="top">
    </div>
    <div class="content">
      <n-input placeholder="标题" v-model:value="formData.title"></n-input>
      <n-input placeholder="作者" v-model:value="formData.author"></n-input>
      <n-input placeholder="内容" v-model:value="formData.content"></n-input>
      <n-input placeholder="合辑" v-model:value="formData.collection"></n-input>
      <n-input placeholder="来源" v-model:value="formData.source"></n-input>
      <n-button @click="handleAdd">添加</n-button>
      <n-list hoverable>
        <n-list-item v-for="article in articles">
          <template #prefix>
            <n-checkbox size="small" />
          </template>
          <n-thing content-style="font-weight: 600">
            {{ article.title }}
          </n-thing>
          <template #suffix>
            <n-button size="small" @click="handleDelete(article.id)">删除</n-button>
          </template>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { articlesTable } from '../db/services';
import { reactive } from 'vue';

const articles = ref<Article[]>([]);
const formData = reactive({
  title: '',
  author: '',
  content: '',
  collection: '',
  source: '',
})

const handleAdd = () => {
  articlesTable.add(formData.title, formData.author, formData.content, formData.collection, formData.source);
  getArticles();
}

const getArticles = async () => {
  articles.value = await articlesTable.get();
}

const handleDelete = async (id: number) => {
  await articlesTable.delete(id);
  await getArticles();
}


onMounted(async () => {
  getArticles();
});
</script>

<style scoped></style>