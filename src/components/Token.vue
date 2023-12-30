<template>
  <span> {{ props.token }}&nbsp;</span>
</template>

<script setup lang="ts">
import { wordfreqTable } from '@/db/services';
import { onMounted } from 'vue';

const props = defineProps<{ token: string }>();
onMounted(() => {
  wordfreqTable.add(props.token.replace(/[,|?|!.]/, ''));
})
</script>

<style scoped></style>