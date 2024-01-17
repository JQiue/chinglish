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

interface WordFreq {
  id: number;
  word: string;
  frequency: number;
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
  /** 册 */
  volume: string;
  /** 合集 */
  collection: string;
  /** 阅读次数 */
  read_count: number;
  created_at: string;
}

interface Dict {
  /** 单词名称 */
  word: string;
  /** 音标 */
  phonetic: string;
  /** 当代语料库词频顺序 */
  frq: string;
  /** 单词释义（中文），每行一个释义 */
  translation: string;
  /** 英国国家语料库词频顺序 */
  bnc: string;
  /** 单词释义（英文），每行一个释义  */
  definition: string;
  /** 时态复数等变换  */
  exchange: string;
  /** 字符串标签：zk/中考，gk/高考，cet4/四级 等等标签，空格分割  */
  tag: string;
  /** 词语位置 */
  pos: string;
}
