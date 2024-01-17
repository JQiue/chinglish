<template>
  <div class="container">

    <div class="top">
      <n-tabs v-model:value="tab" type="line">
        <n-tab v-for="tab in tabs" :key="tab" :name="tab"></n-tab>
      </n-tabs>
    </div>


    <div class="content">
      <div style="height: 100%; display: flex; justify-content: center; align-items: center;" v-if="words.length == 0">
        <n-empty description="空空如也">
        </n-empty>
      </div>
      <template v-else>
        <template v-if="tab == '列表'">
          <n-checkbox-group v-model:value="checkWords" @update:value="handleCheckUpdate">
            <n-list hoverable>
              <n-list-item v-for="word in words">
                <template #prefix>
                  <n-checkbox size="small" :value="word.id" />
                </template>
                <n-thing content-style="font-weight: 600">
                  {{ word.word }}
                  <n-progress type="line" :percentage="getProgress(word.proficiency)" />
                </n-thing>
              </n-list-item>
            </n-list>
          </n-checkbox-group>
        </template>

        <template v-if="tab == '卡片'">
          <n-carousel show-arrow :show-dots="false">
            <n-card v-for="word in words" :key="word.id">
              <n-space vertical align="center">
                <p class="text-h2" @click="handleAudio(word.word)">{{ word.word }}</p>
                <n-button>Space</n-button>
              </n-space>
            </n-card>
          </n-carousel>
        </template>

        <template v-if="tab == '复习'">
          <n-carousel v-model:current-index="currentIndexOfCarousel" ref="review_carousel" @keyup.left="handleRemember"
            @keyup.right="handleForget" :show-dots="false">
            <n-card v-for="word in words" :key="word.id" @click="handleAudio(word.word)"
              content-style="text-align:center;">
              <p class="text-h2">{{ word.word }}</p>
            </n-card>
          </n-carousel>
          <n-space justify="center">
            <n-button @click="handleRemember">记得</n-button>
            <n-button @click="handleForget">不记得</n-button>
          </n-space>
        </template>
      </template>


    </div>

    <div class="fixed" v-show="checkWords.length != 0">
      <n-button size="small" type="error" @click="handleDeleteWord">
        删除
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { unfamiliarWordsTable } from '@/db/services.ts';
import { CarouselInst } from 'naive-ui';
import { audio } from '@/helpers/audio';

const tab = ref('列表');
const tabs = ref(['列表', '卡片', '复习'])
const words = ref<UnfamiliarWord[]>([]);
const review_carousel = ref<CarouselInst | null>();
const currentIndexOfCarousel = ref(0);
const checkWords = ref([]);

const handleGetWords = async () => {
  words.value = await unfamiliarWordsTable.get();
}

const getProgress = (proficiency: number) => {
  return Math.floor(proficiency / 100 * 100);
}

const handleRemember = async () => {
  const id = words.value[currentIndexOfCarousel.value].id;
  await unfamiliarWordsTable.updateProficiency(id, '+');
  review_carousel.value?.next();
  await handleGetWords();
}

const handleForget = async () => {
  const id = words.value[currentIndexOfCarousel.value].id;
  await unfamiliarWordsTable.updateProficiency(id, '-');
  review_carousel.value?.next();
  await handleGetWords();
}

const handleCheckUpdate = () => {
  console.log(checkWords.value);
}

const handleDeleteWord = async () => {
  checkWords.value.forEach(async value => {
    await unfamiliarWordsTable.delete(value)
  });
  checkWords.value.length = 0;
  await handleGetWords();
}

const handleAudio = async (word: string) => {
  audio(word);
}

onMounted(async () => {
  handleGetWords();
});
</script>

<style scoped>
.container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
  }

  .fixed {
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }

}

.text-h2 {
  font-size: 3.75rem !important;
  font-weight: 300;
  line-height: 3.75rem;
  letter-spacing: -0.0083333333em !important;
  font-family: "Roboto", sans-serif !important;
  text-transform: none !important;
}
</style>
