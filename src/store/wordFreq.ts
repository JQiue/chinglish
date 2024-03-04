import { reactive } from "vue";
import { useWordFreqTable } from "@/db";

const wordfreqTable = useWordFreqTable();

const wordFreq = reactive<{ word: string[] }>({
  word: [],
});

const addWord = (word: string) => {
  wordFreq.word.push(word.trim());
};

const pushWord = async () => {
  for (const word of wordFreq.word) {
    await wordfreqTable.add(word);
  }
  wordFreq.word.length = 0;
  // wordFreq.word.forEach(async (word) => await wordfreqTable.add(word));
};

export { addWord, pushWord };
