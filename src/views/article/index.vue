<template>

  <div class="container">

    <div class="top">
      <n-tabs v-model:value="tab" type="line">
        <n-tab v-for="tab in tabs" :key="tab" :name="tab"></n-tab>
      </n-tabs>
    </div>

    <div class="content">

      <div style="height: 100%; display: flex; justify-content: center; align-items: center;"
        v-if="state.articles.length == 0">
        <n-empty description="空空如也"></n-empty>
      </div>

      <template v-else>

        <template v-if="tab == '列表'">
          <!--           <n-virtual-list style="height: 588px" :item-size="42" :items="state.articles">
            <template #default="{ item }">
              <div class="item">
                <div class="item-prefix"><n-checkbox size="small" /></div>
                <div class="item-main">
                  <n-thing>
                    <template #header>
                      <span style="font-weight: 600;">
                        {{ item.title }}
                      </span>
                    </template>

<template #description>
                      <n-space>
                        <span>作者：{{ item.author }}</span>
                        <span>册：{{ item.volume }}</span>
                        <span>阅读：{{ item.read_count }}</span>
                      </n-space>
                    </template>
</n-thing>
</div>
<div class="item-suffix">
  <div class="group-btn">
    <n-button size="small" type="primary" @click="handleRead(item.id)">阅读</n-button>
    <n-button size="small" type="info" @click="handleEdit(item.id)">编辑</n-button>
    <n-popconfirm positiveText="确定" negative-text="取消" @positive-click="handleDelete(item.id)">
      确定删除？

      <template #trigger>
                        <n-button size="small" type="warning">删除</n-button>
                      </template>
    </n-popconfirm>
  </div>
</div>
</div>
<n-thing>

  <template #header>
                  <span style="font-weight: 600;">
                    {{ item.title }}
                  </span>
                </template>

  <template #description>
                  <n-space>
                    <span>作者：{{ item.author }}</span>
                    <span>册：{{ item.volume }}</span>
                    <span>阅读：{{ item.read_count }}</span>
                  </n-space>
                </template>

  <template #action>
                  <div class="group-btn">
                    <n-button size="small" type="primary" @click="handleRead(item.id)">阅读</n-button>
                    <n-button size="small" type="info" @click="handleEdit(item.id)">编辑</n-button>
                    <n-popconfirm positiveText="确定" negative-text="取消" @positive-click="handleDelete(item.id)">
                      确定删除？
                      <template #trigger>
                        <n-button size="small" type="warning">删除</n-button>
                      </template>
  </n-popconfirm>
  </div>
  </template>

</n-thing>
</template>
</n-virtual-list> -->

          <n-list hoverable>
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

          <n-float-button :right="20" :bottom="20" type="primary"
            @click="() => { state.showEditor = true, state.editorMode = 'add' }">
            +
          </n-float-button>
        </template>

        <template v-if="tab == '中译英'">
          <div style="height: 123px;">
            <n-carousel v-model:current-index="currentIndexOfCarousel" :show-dots="false">
              <n-card v-for="segment in segments" :key="segment.translate">
                <n-space vertical align="center">
                  <p>{{ segment.translate }}</p>
                  <span style="color: rgba(0, 0, 0, 0.5); font-size: 0.85rem;">{{ title }} -- {{ author }}</span>
                </n-space>
              </n-card>
            </n-carousel>
          </div>

          <n-space vertical align="center">
            <n-button type="primary" @click="handleChange">换一篇</n-button>
            <n-input ref="inputInstRef" v-model:value="inputEnglish" placeholder="typing..."
              @keyup.enter="handleVertify"></n-input>
          </n-space>
        </template>
      </template>

    </div>

  </div>

  <Editor :show="state.showEditor" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useArticlesTable } from '@/db';
import { state } from './store';
import { saveLastArticleId } from '@/helpers';
import { InputInst, useMessage } from 'naive-ui';
import Editor from './Editor.vue';

const articlesTable = useArticlesTable();
const router = useRouter();
const message = useMessage();

const inputInstRef = ref<InputInst | null>(null)
const tab = ref('列表');
const tabs = ref(['列表', '中译英']);
const currentIndexOfCarousel = ref(0);
const inputEnglish = ref<string>('');
const segments = ref<Record<string, any>[]>([]);
const title = ref('');
const author = ref('');

const handleVertify = () => {
  const segment = segments.value[currentIndexOfCarousel.value];
  if (compareString(segment.content, inputEnglish.value)) {
    currentIndexOfCarousel.value++;
    inputEnglish.value = '';
    message.success("OK");
  } else {
    message.error("NO");
  }
};

// nextTick(() => {
//   inputInstRef.value?.focus();
// })

/* 比较字符串 */
function compareString(str1: string, str2: string) {
  // 转为小写
  let a = str1.toLowerCase(), b = str2.toLowerCase();
  // 去除符号
  a = a.replace(/[^\w]/g, ''), b = b.replace(/[^\w]/g, '');
  console.log(a, b);
  return a == b;
}

const getSegments = async (id: number) => {
  const article = await articlesTable.getById(id);
  if (article && article.translate) {
    title.value = article.title;
    author.value = article.author;
    const contents = article?.content.split("\n");
    const translates = article?.translate.split("\n");
    segments.value = contents?.map((content, i) => {
      return { content, translate: translates[i] }
    })
  } else {
    message.warning("没有文章或没有翻译");
  }
};

const handleChange = async () => {
  const index = Math.round(Math.random() * state.articles.length);
  const article = state.articles[index];
  // console.log(article);
  getSegments(article.id);
};

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

const handleRead = (id: number) => {
  saveLastArticleId(id.toString());
  router.push({ name: 'read' });
}

const init = async () => {
  await getArticles();
  await handleChange();
}

onMounted(() => {
  init();
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

.item {
  display: flex;
  position: relative;
  padding: 12px 20px;
  box-sizing: border-box;
  flex-wrap: nowrap;
  align-items: center;
  transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);

  .item-prefix {
    margin-right: 20px;
  }

  .item-main {
    flex: 1;
  }
}
</style>