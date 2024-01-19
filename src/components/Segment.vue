<template>
  <p>
    <Token v-for="term in terms" :term="term" :token="term.text + term.post" :key="term.id"></Token>
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import wrap from 'word-wrap';
import nlp from 'compromise';
import Token from '../components/Token.vue';
import { Term } from 'node_modules/compromise/types/misc';

const props = defineProps<{ segment: string }>();

const tokens = ref<string[]>();
const processedSegment = ref('');
const terms = ref<Term[]>([]);

const posTagging = () => {
  if (props.segment.length == 0) return;
  const doc = nlp(props.segment);
  terms.value = doc.json()[0].terms;
}

onMounted(() => {
  processedSegment.value = wrap(props.segment, { indent: '' })
  tokens.value = props.segment.trim().split(" ");
  posTagging()
})
</script>

<style scoped>
.pos-tagging {
  font-size: 0.75rem;
}
</style>
