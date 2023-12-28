import SQL from "tauri-plugin-sql-api";

const db = await SQL.load("sqlite:dict.db");

class DictTable {
  db: SQL;
  constructor() {
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

export const dictTable = new DictTable();
