import dayjs from "dayjs";
import "dayjs/locale/zh-cn.js";

dayjs.locale("zh-cn");

/**
 * @description: 返回格式化后的当前日期时间
 * @return {string}
 */
export const nowDatetime = (
  format: "YYYY-MM-DD H:mm:ss" | "YYMMDD" | "H:mm:ss" = "YYYY-MM-DD H:mm:ss"
): string => {
  return dayjs().format(format);
};

/**
 * @description: 返回 number
 * @return {string}
 */
export const toNumber = (value: number, accuracy = 2) => {
  return Number(value.toFixed(accuracy));
};

const STORAGE_KEY_LAST_ARTICLE_ID = "lastArticleId";

/**
 * @description: 获取最近的文章 id
 * @return {string}
 */
export function getLastArticleId() {
  return localStorage.getItem(STORAGE_KEY_LAST_ARTICLE_ID);
}

/**
 * @description: 保存最近的文章 id
 * @return {void}
 */
export function saveLastArticleId(articleId: string) {
  localStorage.setItem(STORAGE_KEY_LAST_ARTICLE_ID, articleId);
}

const player = new Audio();
// const audioCache: Record<string, any> = {};
/**
 * @description: 播放音频
 * @return {void}
 */
export const audio = async (audio: string, type: 1 | 2 = 1) => {
  // const cacheKey = `${audio}-${type}`;
  // if (audioCache[cacheKey]) {
  //   return audioCache[cacheKey];
  // }
  const url = `https://dict.youdao.com/dictvoice?audio=${audio}&type=${type}`;
  player.src = url;
  player.play();
  // const response = await fetch(url);
  // console.log(response);
  // audioCache[cacheKey] = await response.arrayBuffer();
  // return audioCache[cacheKey];
};

const map = new Map([
  ["Noun", "名词"],
  ["ProperNoun", "专有名词"],
  ["Possessive", "所有格"],
  ["Actor", "角色"],
  ["Money", "货币"],
  ["Unit", "单位"],
  ["FirstName", "名字"],
  ["LastName", "姓氏"],
  ["MaleName", "男性名字"],
  ["FemaleName", "女性名字"],
  ["Demonym", "区域居民称谓词"],
  ["Singular", "单数"],
  ["Plural", "复数"],
  ["Uncountable", "不可数的"],
  ["PresentTense", "一般现在时态"],
  ["Gerund", "动名词"],
  ["Infinitive", "不定式"],
  ["Copula", "系动词"],
  ["Conjunction", "连词"],
  ["Verb", "动词"],
  ["Auxiliary", "助动词"],
  ["PhrasalVerb", "短语动词"],
  ["Particle", "虚词"],
  ["Pronoun", "代词"],
  ["Abbreviation", "缩写形式"],
  ["Cardinal", "基数词"],
  ["Determiner", "限定词"],
  ["Adverb", "副词"],
  ["Negative", "否定"],
  ["Adjective", "形容词"],
  ["Comparative", "比较级 "],
  ["Imperative", "祈使"],
  ["Honorific", "敬语"],
  ["Hyphenated", "连字符号"],
  ["QuestionWord", "疑问词"],
  ["Date", "日期"],
  ["Duration", "时间"],
  ["Preposition", "介词"],
  ["Modal", "情态"],
  ["Reflexive", "反身"],
  ["PastTense", "过去时态"],
  ["Acronym", "字首组合词"],
  ["Ordinal", "顺序"],
  ["Participle", "分词"],
  ["Superlative", "最高级"],
]);

export const mapping = (key: string) => {
  return map.get(key);
};
