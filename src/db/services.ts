import { execute, select } from ".";
import { nowDatetime } from "@/helpers";

/** 更新熟练度 */
export const updateProficiency = async (id: number, opreator: "+" | "-") => {
  const sql = `UPDATE unfamiliar_words SET proficiency=proficiency${opreator}1, review_count=review_count+1 WHERE id = ?`;
  return await execute(sql, [id]);
};

/** unfamiliar_words 表操作类 */
class UnfamiliarWordsTable {
  /** 增加 */
  async add(word: string) {
    return await execute(
      `INSERT INTO unfamiliar_words(word, proficiency, review_count, created_at) VALUES(?,?,?,?)`,
      [word, 0, 0, nowDatetime()]
    );
  }
  /** 删除 */
  async delete(id: number) {
    return await execute(`DELETE FROM unfamiliar_words where id=?`, [id]);
  }
  /** 更新 */
  async update() {}
  /** 获取列表 */
  async get() {
    return await select<UnfamiliarWord[]>(`SELECT * FROM unfamiliar_words`);
  }
  /** 更新熟练度 */
  async updateProficiency(id: number, opreator: "+" | "-") {
    let sql = `UPDATE unfamiliar_words SET proficiency=proficiency${opreator}1, review_count=review_count+1 WHERE id=?`;
    if (opreator == "-") {
      sql += " AND proficiency>0";
    }
    return await execute(sql, [id]);
  }
}

/** articles 表操作类 */
class ArticlesTable {
  /** 增加 */
  async add(
    title: string,
    author: string,
    content: string,
    collection: string,
    source: string
  ) {
    return await execute(
      `INSERT INTO articles(title, author, content, collection, source, read_count, created_at) VALUES(?,?,?,?,?,?,?)`,
      [title, author, content, collection, source, 0, nowDatetime()]
    );
  }
  /** 删除 */
  async delete(id: number) {
    return await execute(`DELETE FROM articles where id=?`, [id]);
  }
  /** 更新 */
  async update() {}
  /** 获取文章 */
  async get(id?: number) {
    if (id) return await this.getById(id);
    return await select<Article[]>(`SELECT * FROM articles`);
  }
  /** 更新阅读次数 */
  async updateReadCount(id: number, opreator: "+" | "-") {
    let sql = `UPDATE articles SET read_count=read_count${opreator}1 WHERE id=?`;
    if (opreator == "-") {
      sql += " AND read_count>0";
    }
    return await execute(sql, [id]);
  }
  async getById(id: number) {
    return await select<Article[]>(`SELECT * FROM articles WHERE id=?`, [id]);
  }
}

class WordFreqTable {
  async has(word: string) {
    const data = await select<WordFreq[]>(
      `SELECT * FROM word_freq where word=?`,
      [word]
    );
    return data.length > 0;
  }
  async add(word: string) {
    if (await this.has(word)) {
      return await execute(
        `UPDATE word_freq SET frequency=frequency+1 where word=?`,
        [word]
      );
    } else {
      return await execute(`INSERT INTO word_freq (word) VALUES(?)`, [word]);
    }
  }
  async delete(id: number) {
    return await execute(`DELETE FROM word_freq where id=?`, [id]);
  }
  async getWordFreqStat(limit: number = 10) {
    return await select<WordFreq[]>(
      `SELECT DISTINCT word,frequency FROM word_freq ORDER BY frequency DESC LIMIT ?`,
      [limit]
    );
  }
}

export const unfamiliarWordsTable = new UnfamiliarWordsTable();
export const articlesTable = new ArticlesTable();
export const wordfreqTable = new WordFreqTable();
