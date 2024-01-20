import { dictTable } from "./dict";
import { ArticlesTable, UnfamiliarWordsTable, WordFreqTable } from "./services";
import { createTable, dump } from "./sqlite";

const useCreateTable = () => createTable;
const useUnfamiliarWordsTable = () => new UnfamiliarWordsTable();
const useArticlesTable = () => new ArticlesTable();
const useWordFreqTable = () => new WordFreqTable();
const useDictTable = () => dictTable;
const useDump = () => dump;

export {
  useCreateTable,
  useUnfamiliarWordsTable,
  useArticlesTable,
  useWordFreqTable,
  useDictTable,
  useDump,
};
