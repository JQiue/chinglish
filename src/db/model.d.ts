interface UnfamiliarWord {
  id: number;
  word: string;
  definition: string;
  part_of_speech: string;
  synonyms: string;
  example_sentence: string;
  proficiency: number;
  review_count: number;
  created_at: string;
}

interface FavoriteSentence {
  id: number;
  sentence: string;
  source: string;
  created_at: string;
}

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  /** 来源 */
  source: string;
  /** 合集 */
  collection: string;
  /** 阅读次数 */
  read_count: number;
  created_at: string;
}
