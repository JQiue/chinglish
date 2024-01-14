<template>
  <p>
    <Token v-for="token in tokens" :token="token" :key="token"></Token>
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Token from '../components/Token.vue';

const props = defineProps<{ segment: string }>();
const tokens = ref<string[]>();

onMounted(() => {
  tokens.value = props.segment.trim().split(" ");
})
</script>

<style scoped></style>