import SQL, { QueryResult } from "tauri-plugin-sql-api";

const mode = import.meta.env.MODE;

const db = await SQL.load(
  mode == "development" ? "sqlite:test.chinglish.db" : "sqlite:chinglish.db"
);

/**
 * @description: 执行 SELECT 语句
 * @return {Promise<T>}
 */
export const select = async <T>(sql: string, bindValues?: []): Promise<T> => {
  try {
    return await db.select<T>(sql, bindValues);
  } catch (error) {
    throw error;
  }
};

/**
 * @description: 执行 SQL 语句
 * @return {Promise<QueryResult>}
 */
export const execute = async (
  sql: string,
  bindValues?: any[]
): Promise<QueryResult> => {
  return await db.execute(sql, bindValues);
};

export function initTable() {
  execute(`
  CREATE TABLE IF NOT EXISTS unfamiliar_words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT,
    definition TEXT,
    part_of_speech TEXT,
    synonyms TEXT,
    example_sentence TEXT,
    proficiency INTEGER,
    review_count INTEGER,
    created_at DATETIME
  );
  CREATE TABLE IF NOT EXISTS favorite_sentences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sentence TEXT,
    source TEXT,
    created_at DATETIME
  );
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    content TEXT,
    source TEXT,
    collection TEXT,
    read_count INTEGER DEFAULT 0,
    created_at DATETIME
  );`);
}
