interface ISqliteMaster {
  name: string;
  rootpage: number;
  sql: string;
  tbl_name: string;
  type: string;
}

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

/** 文章  */
interface Article {
  id: number;
  title: string;
  /** 作者 */
  author: string;
  /** 内容 */
  content: string;
  /** 来源 */
  source: string;
  /** 合集 */
  collection: string;
  /** 阅读次数 */
  read_count: number;
  created_at: string;
}
