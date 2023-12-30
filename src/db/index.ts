import { fs } from "@tauri-apps/api";
import { BaseDirectory } from "@tauri-apps/api/fs";
import SQL, { QueryResult } from "tauri-plugin-sql-api";

const mode = import.meta.env.MODE;

const db = await SQL.load(
  mode == "development" ? "sqlite:test.chinglish.db" : "sqlite:chinglish.db"
);

export const dbPath = async () => {
  return db.path;
};

/**
 * @description: 导出数据
 * @return {Promise<boolean>}
 */
export const dump = async () => {
  let sqlText = "";
  const tables = await select<ISqliteMaster[]>(
    `SELECT * FROM sqlite_master WHERE type='table'`
  );
  for (const { name, sql } of tables) {
    if (name == "unfamiliar_words") {
      sqlText += sql + ";\n";
      const data = await select<[]>(`select * from ${name}`);
      for (const row of data) {
        const keys = Object.keys(row);
        const values = keys.map((key) => row[key]);
        let valuesText = "";
        for (const value of values) {
          if (typeof value == "string") {
            valuesText += `'${value}',`;
          } else if (typeof value == "object") {
            valuesText += `NULL,`;
          } else {
            valuesText += value + ",";
          }
        }
        valuesText = valuesText.slice(0, valuesText.length - 1);
        sqlText += `INSERT INTO ${name} (${Object.keys(row).join(
          ","
        )}) VALUES (${valuesText});\n`;
      }
    } else if (name == "favorite_sentences") {
      sqlText += sql + ";\n";
      const data = await select<[]>(`select * from ${name}`);
      for (const row of data) {
        const keys = Object.keys(row);
        const values = keys.map((key) => row[key]);
        let valuesText = "";
        for (const value of values) {
          if (typeof value == "string") {
            valuesText += `'${value}',`;
          } else if (typeof value == "object") {
            valuesText += `NULL,`;
          } else {
            valuesText += value + ",";
          }
        }
        valuesText = valuesText.slice(0, valuesText.length - 1);
        sqlText += `INSERT INTO ${name} (${Object.keys(row).join(
          ","
        )}) VALUES (${valuesText});\n`;
      }
    } else if (name == "articles") {
      sqlText += sql + ";\n";
      const data = await select<[]>(`select * from ${name}`);
      for (const row of data) {
        const keys = Object.keys(row);
        const values = keys.map((key) => row[key]);
        let valuesText = "";
        for (const value of values) {
          if (typeof value == "string") {
            valuesText += `'${value}',`;
          } else if (typeof value == "object") {
            valuesText += `NULL,`;
          } else {
            valuesText += value + ",";
          }
        }
        valuesText = valuesText.slice(0, valuesText.length - 1);
        sqlText += `INSERT INTO ${name} (${Object.keys(row).join(
          ","
        )}) VALUES (${valuesText});\n`;
      }
    }
  }
  fs.writeTextFile("export.sql", sqlText, {
    dir: BaseDirectory.Desktop,
  });
  return true;
};

/**
 * @description: 执行 SELECT 语句
 * @return {Promise<T>}
 */
export const select = async <T>(
  sql: string,
  bindValues?: any[]
): Promise<T> => {
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
  );
  CREATE TABLE IF NOT EXISTS word_freq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT,
    frequency INTEGER DEFAULT 1
  );
  `);
}
