<template>
  <div class="read">
    <div class="prev" @click="handlePreviousArticle">上</div>
    <div class="next" @click="handleNextArticle">下</div>
    <Reader :title="currentArticle?.title" :content="currentArticle?.content"></Reader>
  </div>
</template>

<script setup lang="ts">
import { articlesTable } from '@/db/services';
import { getLastArticleId, saveLastArticleId } from '@/helpers/storage';
import { onMounted, ref } from 'vue';
import Reader from '@/components/Reader.vue';

const articles = ref<Article[]>();
const currentArticle = ref<Article>();

const getArticles = async () => {
  articles.value = await articlesTable.get();
}

const hasArticleId = async () => {
  return localStorage.getItem('lastArticleId');
}

const getCurrentArticleIndex = () => {
  if (articles.value && currentArticle.value) {
    return articles.value.findIndex((article) => {
      return currentArticle.value!.id == article.id
    })
  } else {
    return -1
  }
}

const handlePreviousArticle = async () => {
  if (articles.value) {
    const index = getCurrentArticleIndex();
    const prevIndex = (index + 1 + articles.value.length) % articles.value.length;
    updateCurrentArticle(prevIndex);
    if (currentArticle.value) {
      saveLastArticleId(currentArticle.value.id.toString())
    }
  }
}

const handleNextArticle = async () => {
  if (articles.value) {
    const index = getCurrentArticleIndex();
    const nextIndex = (index + 1) % articles.value.length;
    updateCurrentArticle(nextIndex);
    if (currentArticle.value) {
      saveLastArticleId(currentArticle.value.id.toString())
    }
  }
}

const updateCurrentArticle = (index: number) => {
  if (articles.value) {
    currentArticle.value = articles.value[index];
  } else {
    alert('没有可用的文章列表')
  }
}

const loadArticle = async (hasArticle: boolean) => {
  if (hasArticle) {
    const id = Number(getLastArticleId());
    currentArticle.value = (await articlesTable.get(id))[0];
  } else {
    if (currentArticle.value) {
      saveLastArticleId(currentArticle.value.id.toString())
    }
  }
}

const init = async () => {
  await getArticles();
  if (await hasArticleId()) {
    await loadArticle(true);
  } else {
    await loadArticle(false);
  }
}

onMounted(async () => {
  await init();
});
</script>

<style scoped>
.read {
  position: relative;

  .prev,
  .next {
    position: absolute;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    opacity: 0;
  }

  .prev:hover,
  .next:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .prev {
    top: 0;
    left: 0;
  }

  .next {
    top: 0;
    right: 0;
  }
}
</style>