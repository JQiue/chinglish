<template>
  <span :style="style"> {{ props.token }}&nbsp;</span>
</template>

<script setup lang="ts">
import { unfamiliarWordsTable, wordfreqTable } from '@/db/services';
import { CSSProperties, reactive } from 'vue';
import { onMounted } from 'vue';

const props = defineProps<{ token: string }>();

const style = reactive<CSSProperties>({
  fontWeight: ''
});


onMounted(async () => {
  wordfreqTable.add(props.token.replace(/[,|?|!.]/, ''));
  if (await unfamiliarWordsTable.has(props.token)) {
    style.fontWeight = 600
  }
})
</script>

<style scoped></style>