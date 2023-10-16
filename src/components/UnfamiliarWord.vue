<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { unfamiliarWordsTable } from '../db/services';
import { CarouselInst } from 'naive-ui';

// const props = defineProps<{ content: string }>();
const tab = ref('list');
const words = ref<UnfamiliarWord[]>([]);
const window = ref(0);
const wordInput = ref('');
const review_carousel = ref<CarouselInst | null>();
const currentIndexOfCarousel = ref(0);

const handleAdd = () => {
  unfamiliarWordsTable.add(wordInput.value)
  wordInput.value = ''
  handleGetWords();
}

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

onMounted(async () => {
  handleGetWords();
});
</script>

<template>
  <div class="container">
    <div class="top">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="end">
        <v-tab :value="'list'">列表</v-tab>
        <v-tab :value="'card'">卡片</v-tab>
        <v-tab :value="'review'">复习</v-tab>
      </v-tabs>
    </div>
    <div class="content">
      <n-input v-model:value="wordInput"></n-input>
      <n-button @click="handleAdd">添加</n-button>
      <template v-if="tab == 'list'">
        <n-list hoverable>
          <n-list-item v-for="word in  words ">
            <template #prefix>
              <n-checkbox size="small" />
            </template>
            <n-thing content-style="font-weight: 600">
              {{ word.word }}
              <n-progress type="line" :percentage="getProgress(word.proficiency)" />
            </n-thing>
          </n-list-item>
        </n-list>
      </template>
      <template v-if="tab == 'card'">
        <v-window v-model="window" show-arrows>
          <v-window-item v-for="word in words " :key="word.id">
            <v-card height="444" class="d-flex justify-center align-center flex-column">
              <span class="text-h2">{{ word.word }}</span>
              <v-btn>Space</v-btn>
            </v-card>
          </v-window-item>
        </v-window>
      </template>
      <template v-if="tab == 'review'">
        <n-carousel v-model:current-index="currentIndexOfCarousel" ref="review_carousel" @keyup.left="handleRemember"
          @keyup.right="handleForget">
          <n-card v-for="word in words" :key="word.id" content-style="text-align:center;">
            <span class="text-h2">{{ word.word }}</span>
          </n-card>
        </n-carousel>
        <n-space justify="center">
          <n-button @click="handleRemember">记得</n-button>
          <n-button @click="handleForget">不记得</n-button>
        </n-space>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
