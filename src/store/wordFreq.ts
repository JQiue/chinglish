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
  wordFreq.word.forEach((word) => wordfreqTable.add(word));
  wordFreq.word.length = 0;
};

export { addWord, pushWord };
