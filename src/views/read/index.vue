<template>
  <div class="read" ref="read">
    <div class="prev" @click="handlePreviousArticle" ref="prev">上</div>
    <div class="next" @click="handleNextArticle" ref="next">下</div>
    <Reader :id="currentArticle?.id" :title="currentArticle?.title" :content="currentArticle?.content"></Reader>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useArticlesTable } from '@/db';
import { getLastArticleId, saveLastArticleId } from '@/helpers';
import Reader from '@/components/Reader.vue';
import { pushWord } from '../../store/wordFreq';

const articlesTable = useArticlesTable();

const read = ref<HTMLDivElement>();
const articles = ref<Article[]>();
const currentArticle = ref<Article>();

/** 获取文章列表 */
const getArticles = async () => {
  articles.value = await articlesTable.get();
}

/** 是否存在文章 id */
const hasArticleId = async () => {
  return localStorage.getItem('lastArticleId');
}

/** 获取当前文章索引 */
const getCurrentArticleIndex = () => {
  if (articles.value && currentArticle.value) {
    return articles.value.findIndex((article) => {
      return currentArticle.value!.id == article.id
    })
  } else {
    return -1
  }
}

/** 上一篇文章 */
const handlePreviousArticle = async () => {
  if (articles.value) {
    const index = getCurrentArticleIndex();
    const prevIndex = (index - 1 + articles.value.length) % articles.value.length;
    updateCurrentArticle(prevIndex);
    if (currentArticle.value) {
      saveLastArticleId(currentArticle.value.id.toString())
    }
  }
}

/** 下一篇文章 */
const handleNextArticle = async () => {
  if (articles.value) {
    const index = getCurrentArticleIndex();
    const nextIndex = (index + 1) % articles.value.length;
    updateCurrentArticle(nextIndex);
    if (currentArticle.value) {
      saveLastArticleId(currentArticle.value.id.toString())
    }
    pushWord()
  }
}

/** 更新当前文章 */
const updateCurrentArticle = (index: number) => {
  if (articles.value) {
    currentArticle.value = articles.value[index];
  } else {
    alert('没有可用的文章列表')
  }
}

/** 加载文章 */
const loadArticle = async (hasArticle: boolean) => {
  if (hasArticle) {
    const id = Number(getLastArticleId());
    const article = await articlesTable.getById(id);
    if (article) {
      currentArticle.value = article;
    }
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
  window.addEventListener("keydown", e => {
    if (e.key == "ArrowUp") {
      handlePreviousArticle()
    }
    if (e.key == "ArrowDown") {
      handleNextArticle()
    }
  })
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
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    opacity: 0;
    width: 24px;
    user-select: none;
  }

  .prev:hover,
  .next:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .prev {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  .next {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
}
</style>