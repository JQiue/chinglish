<template>
  <Editor :show="state.showEditor"></Editor>
  <div class="container">
    <div class="top">
      <n-button @click="() => { state.showEditor = true, state.editorMode = 'add' }">添加文章</n-button>
    </div>
    <div class="content">
      <n-list hoverable>
        <n-list-item v-for="article in state.articles">
          <template #prefix>
            <n-checkbox size="small" />
          </template>
          <n-thing content-style="font-weight: 600">
            {{ article.title }}
          </n-thing>
          <template #suffix>
            <div class="group-btn">
              <n-button size="small" @click="handleRead(article.id)">阅读</n-button>
              <n-button size="small" @click="handleEdit(article.id)">编辑</n-button>
              <n-popconfirm positiveText="确定" negative-text="取消" @positive-click="handleDelete(article.id)">
                确定删除？
                <template #trigger>
                  <n-button size="small">删除</n-button>
                </template>
              </n-popconfirm>
            </div>
          </template>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { articlesTable } from '@/db/services';
import { useRouter } from 'vue-router';
import Editor from './editor.vue';
import { state } from './store';

const router = useRouter();

const getArticles = async () => {
  state.articles = await articlesTable.get();
}

const handleDelete = async (id: number) => {
  await articlesTable.delete(id);
  await getArticles();
}

const handleEdit = async (id: number) => {
  const article = await articlesTable.getById(id);
  if (article) {
    state.editorMode = 'edit';
    state.showEditor = true;
    state.article = article;
  }
}

const handleRead = async (id: number) => {
  router.push({ name: 'reader', params: { id } });
}

onMounted(async () => {
  getArticles();
});
</script>

<style scoped>
.group-btn {
  display: flex;
}
</style>