<template>
  <Editor :show="state.showEditor"></Editor>
  <div class="container">
    <div class="top">
      <n-button @click="() => { state.showEditor = true, state.editorMode = 'add' }">添加文章</n-button>
    </div>
    <div class="content">
      <div style="height: 100%; display: flex; justify-content: center; align-items: center;"
        v-if="state.articles.length == 0">
        <n-empty description="空空如也"></n-empty>
      </div>

      <n-list hoverable v-else>
        <n-list-item v-for="article in state.articles" :key="article.id">
          <template #prefix>
            <n-checkbox size="small" />
          </template>
          <n-thing>
            <template #header>
              <span style="font-weight: 600;">
                {{ article.title }}
              </span>
            </template>
            <template #description>
              <n-space>
                <span>作者：{{ article.author }}</span>
                <span>册：{{ article.volume }}</span>
                <span>阅读：{{ article.read_count }}</span>
              </n-space>
            </template>
          </n-thing>
          <template #suffix>
            <div class="group-btn">
              <n-button size="small" type="primary" @click="handleRead(article.id)">阅读</n-button>
              <n-button size="small" type="info" @click="handleEdit(article.id)">编辑</n-button>
              <n-popconfirm positiveText="确定" negative-text="取消" @positive-click="handleDelete(article.id)">
                确定删除？
                <template #trigger>
                  <n-button size="small" type="warning">删除</n-button>
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
import { useRouter } from 'vue-router';
import { useArticlesTable } from '@/db';
import { state } from './store';
import { saveLastArticleId } from '@/helpers';
import Editor from './editor.vue';

const articlesTable = useArticlesTable();


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
  saveLastArticleId(id.toString());
  router.push({ name: 'read' });
}

onMounted(async () => {
  getArticles();
});
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.group-btn {
  display: flex;
}
</style>