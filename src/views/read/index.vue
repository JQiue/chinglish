<template>
  <div class="read">
    <div class="prev" @click="handlePreviousArticle">上</div>
    <div class="next" @click="handleNextArticle">下</div>
    <Reader :title="currentArticle?.title" :content="currentArticle?.content"></Reader>
  </div>
</template>

<script setup lang="ts">
import { articlesTable } from '@/db/services';
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

const handlePreviousArticle = async () => {
  const findedIndex = articles.value?.findIndex((article) => {
    if (currentArticle.value?.id == article.id) return true;
  })
  if (findedIndex != -1) {
    if (findedIndex == 0) {
      currentArticle.value = articles.value[articles.value?.length - 1];
    } else {
      articles.value[findedIndex - 1];
    }
  }
  localStorage.setItem('lastArticleId', currentArticle.value.id.toString());
}

const handleNextArticle = async () => {
  const findedIndex = articles.value?.findIndex((article) => {
    if (currentArticle.value?.id == article.id) return true;
  })
  if (findedIndex != -1) {
    if (findedIndex == articles.value?.length - 1) {
      currentArticle.value = articles.value[0];
    } else {
      currentArticle.value = articles.value[findedIndex + 1];
    }
  }
  localStorage.setItem('lastArticleId', currentArticle.value.id.toString());
}

const loadArticle = async (hasArticle: boolean) => {
  if (hasArticle) {
    const id = Number(localStorage.getItem('lastArticleId'));
    currentArticle.value = (await articlesTable.get(id))[0];
  } else {
    localStorage.setItem('lastArticleId', currentArticle.value.id.toString());
  }
}

onMounted(async () => {
  await getArticles();
  if (await hasArticleId()) {
    await loadArticle(true);
  } else {
    await loadArticle(false);
  }
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