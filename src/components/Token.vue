<template>
  <n-tooltip trigger="hover">
    <span v-for="(tag, index) in tags" :key="tag">
      {{ fotmatTag(tag) }}
      <span v-if="tags.length - 1 != index">&nbsp;</span>
    </span>
    <template #trigger>
      <span :style="style">{{ props.term.text + props.term.post }}</span>
    </template>
  </n-tooltip>
</template>

<script setup lang="ts">
import { CSSProperties, reactive, ref, onMounted } from 'vue';
import { useUnfamiliarWordsTable } from '@/db';
import { mapping } from '@/helpers';
import { addWord } from '@/store/wordFreq';
import { Term } from 'node_modules/compromise/types/misc';

const unfamiliarWordsTable = useUnfamiliarWordsTable();

const props = defineProps<{ term: Term }>();

const tags = ref<string[]>([]);
const style = reactive<CSSProperties>({
  fontWeight: ''
});

/** 统计词频 */
const wordFreq = () => {
  const word = props.term.normal.replace(/[\s|,|?|!|.|']/g, '');
  if (word.length == 0) return;
  addWord(word);
}

/** 高亮单词 */
const highlightToken = async () => {
  const word = props.term.normal;
  if (await unfamiliarWordsTable.has(word)) {
    style.fontWeight = 600;
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
    return mapTag;
  } else {
    console.log(tag);
    return tag;
  }
}

onMounted(() => {
  wordFreq();
  highlightToken();
  resolve();
})
</script>

<style scoped></style>