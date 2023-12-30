import { BaseDirectory, exists } from "@tauri-apps/api/fs";
import SQL from "tauri-plugin-sql-api";

class DictTable {
  db: SQL;
  constructor(db: SQL) {
    this.db = db;
  }
  async select<T>(sql: string, bindValues?: any[]): Promise<T> {
    try {
      return await this.db.select<T>(sql, bindValues);
    } catch (error) {
      throw error;
    }
  }
  async getWord(word: string) {
    return await this.select("select * from dict where word = ?", [word]);
  }
  async getLikeWord(word: string) {
    return await this.select<any[]>(
      `select * from dict where word LIKE '%${word}%' LIMIT 7`
    );
  }
}

const initDictTable = async () => {
  const has = await exists("dict.db", {
    dir: BaseDirectory.App,
  });
  if (has) {
    return SQL.load("sqlite:dict.db").then((db) => {
      return new DictTable(db);
    });
  } else {
    return undefined;
  }
};

const dictTable = await initDictTable();

export { dictTable };
