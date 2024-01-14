<template>
  <span :style="style"> {{ props.token }}&nbsp;</span>
</template>

<script setup lang="ts">
import { unfamiliarWordsTable } from '@/db/services';
import { addWord } from '@/store/wordFreq';
import { CSSProperties, reactive } from 'vue';
import { onMounted } from 'vue';

const props = defineProps<{ token: string }>();

const style = reactive<CSSProperties>({
  fontWeight: ''
});

/** 统计词频 */
const wordFreq = () => {
  const word = props.token.replace(/[,|?|!.]/, '');
  // wordfreqTable.add(word);
  if (word.length == 0) return;
  addWord(word);
}

/** 标记单词 */
const markToken = async () => {
  const word = props.token.replace(/[,|?|!.]/, '');
  if (await unfamiliarWordsTable.has(word)) {
    style.fontWeight = 600
  }
}

onMounted(async () => {
  wordFreq();
  markToken();
})
</script>

<style scoped></style>