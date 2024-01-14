import { wordfreqTable } from "@/db/services";
import { reactive } from "vue";

const wordFreq = reactive<{ word: string[] }>({
  word: [],
});

const addWord = (word: string) => {
  wordFreq.word.push(word);
};

const pushWord = () => {
  wordFreq.word.forEach((word) => wordfreqTable.add(word));
  wordFreq.word.length = 0;
};

export { addWord, pushWord };
