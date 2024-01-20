<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <span :style="style"> {{ props.token }}</span>
    </template>
    <span v-for="(tag, index) in tags" :key="tag">
      {{ fotmatTag(tag) }}
      <span v-if="tags.length - 1 != index">&nbsp;</span></span>
  </n-tooltip>
</template>

<script setup lang="ts">
import { useUnfamiliarWordsTable } from '@/db';
import { mapping } from '@/helpers';
import { addWord } from '@/store/wordFreq';
import { Term } from 'node_modules/compromise/types/misc';
import { CSSProperties, reactive, ref } from 'vue';
import { onMounted } from 'vue';

const unfamiliarWordsTable = useUnfamiliarWordsTable();

const props = defineProps<{ term: Term, token: string }>();

const tags = ref<string[]>([]);
const style = reactive<CSSProperties>({
  fontWeight: ''
});

/** 统计词频 */
const wordFreq = () => {
  const word = props.token.replace(/[,|?|!.|']/, '');
  if (word.length == 0) return;
  addWord(word);
}

/** 高亮单词 */
const highlightToken = async () => {
  const word = props.token.replace(/[,|?|!.]/, '');
  if (await unfamiliarWordsTable.has(word)) {
    style.fontWeight = 600
  }
}

const resolve = () => {
  if (props.term.tags && props.term.tags.size != 0) {
    tags.value = Array.from(props.term.tags);
  }
}

const fotmatTag = (tag: string) => {
  const mapTag = mapping(tag);
  if (mapTag) {
    return mapTag
  } else {
    console.log(tag);
    return tag;
  }
}

onMounted(async () => {
  wordFreq();
  highlightToken();
  resolve();
})
</script>

<style scoped></style>