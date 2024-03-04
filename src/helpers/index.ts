import dayjs from "dayjs";
import "dayjs/locale/zh-cn.js";
import xml from "xml-js";
import { invoke } from "@tauri-apps/api";

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

interface Element {
  type: string;
  name: string;
  cdata?: string;
  text?: string;
  link?: string;
  url?: string;
  title?: string;
  elements?: Element[];
}

interface RSSImage {
  title: string;
  link: string;
  url: string;
}

interface Item {
  title: string;
  link: string;
  description: string;
  author: string;
  comments: string;
  category: string;
  enclosure: string;
  guid: string;
  pubDate: string;
  source: string;
}

interface Channel {
  title: string;
  link: string;
  description: string;
  image: RSSImage;
  lastBuildDate: string;
  pubDate: string;
  language: string;
}

interface RSS {
  channel: Channel;
  items: Item[];
}

export const resolveItem = (elements: Element[]) => {
  const obj: any = {
    category: "",
    link: "",
    title: "",
    guid: "",
    description: "",
    author: "",
    pubDate: "",
    comments: "",
    enclosure: "",
    source: "",
  };
  elements.forEach((e) => {
    if (e.elements && e.elements[0]) {
      const item = e.elements[0];
      obj[e.name] = item.text ?? item.cdata;
    }
  });
  return obj;
};

export const fetchFeedList = async (url: string) => {
  const text = await invoke<string>("rss", { url });
  if (text == "error") return;
  // console.log(text);
  // const resp = await fetch(url);
  // const text = await resp.text();
  const xmlData = xml.xml2js(text);
  const obj: RSS = {
    channel: {
      title: "",
      link: "",
      description: "",
      image: {
        title: "",
        link: "",
        url: "",
      },
      lastBuildDate: "",
      pubDate: "",
      language: "",
    },
    items: [],
  };
  if (!xmlData.elements) return obj;
  const channel: Element[] = (xmlData.elements as any[]).find(
    (e) => e.name == "rss"
  ).elements;

  if (channel.length > 0 && channel[0].elements) {
    const elements = channel[0].elements;
    elements.forEach((e) => {
      if (e.name == "title" && e.elements) {
        obj.channel.title = e.elements[0].cdata ?? e.elements[0].text ?? "";
      }
      if (e.name == "link" && e.elements) {
        obj.channel.link = e.elements[0].cdata ?? e.elements[0].text ?? "";
      }
      if (e.name == "description" && e.elements) {
        obj.channel.description =
          e.elements[0].cdata ?? e.elements[0].text ?? "";
      }
      if (e.name == "lastBuildDate" && e.elements) {
        obj.channel[e.name] = e.elements[0].cdata ?? e.elements[0].text ?? "";
      }
      if (e.name == "pubDate" && e.elements) {
        obj.channel[e.name] = e.elements[0].cdata ?? e.elements[0].text ?? "";
      }
      if (e.name == "language" && e.elements) {
        obj.channel[e.name] = e.elements[0].cdata ?? e.elements[0].text ?? "";
      }
      if (e.name == "image" && e.elements) {
        obj.channel.image = { link: "", url: "", title: "" };
        e.elements.forEach((e) => {
          if (e.elements) {
            if (e.name == "title") {
              obj.channel.image[e.name] =
                e.elements[0].cdata ?? e.elements[0].text ?? "";
            }
            if (e.name == "link") {
              obj.channel.image[e.name] =
                e.elements[0].cdata ?? e.elements[0].text ?? "";
            }
            if (e.name == "url") {
              obj.channel.image[e.name] =
                e.elements[0].cdata ?? e.elements[0].text ?? "";
            }
          }
        });
      }
      if (e.name == "item" && e.elements) {
        obj.items.push(resolveItem(e.elements));
      }
    });
  }
  return obj;
};
