const map = new Map([
  ["Noun", "名词"],
  ["ProperNoun", "专有名词"],
  ["Possessive", "所有格"],
  ["FirstName", "名字"],
  ["LastName", "姓氏"],
  ["MaleName", "男性名字"],
  ["FemaleName", "女性名字"],
  ["Demonym", "区域居民称谓词"],
  ["Singular", "单数"],
  ["Uncountable", "不可数的"],
  ["PresentTense", "一般现在时态"],
  ["Infinitive", "不定式"],
  ["Copula", "系动词"],
  ["Conjunction", "连词"],
  ["Verb", "动词"],
  ["Pronoun", "代词"],
  ["Abbreviation", "缩写形式"],
  ["Cardinal", "基数词"],
  ["Determiner", "限定词"],
  ["Adverb", "副词"],
  ["Negative", "否定"],
  ["Adjective", "形容词"],
  ["Imperative", "祈使"],
  ["Honorific", "敬语"],
  ["Hyphenated", "连字符号"],
  ["QuestionWord", "疑问词"],
  ["Data", "日期"],
]);

export const mapping = (key: string) => {
  return map.get(key);
};
