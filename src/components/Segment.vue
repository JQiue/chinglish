<template>
  <p>
    <Token v-for="token in tokens" :token="token" :key="token"></Token>
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Token from '../components/Token.vue';
import wrap from 'word-wrap';

const props = defineProps<{ segment: string }>();

const tokens = ref<string[]>();
const processedSegment = ref('');

onMounted(() => {
  processedSegment.value = wrap(props.segment, { indent: '' })
  tokens.value = props.segment.trim().split(" ");
})
</script>

<style scoped></style>
