// ============================================================
// WordRepository - React Native / expo-sqlite
// ============================================================

import { getDb } from './database';
import type { Word, DbResult } from './types';

function rowToWord(row: Record<string, unknown>): Word {
  return {
    id:           row.id as number,
    word:         row.word as string,
    reading:      row.reading as string,
    romaji:       row.romaji as string,
    meaningZh:    row.meaning_zh as string,
    partOfSpeech: (row.part_of_speech as Word['partOfSpeech']) ?? null,
    difficulty:   row.difficulty as 1 | 2 | 3,
    jlptLevel:    (row.jlpt_level as Word['jlptLevel']) ?? null,
    exampleJp:    (row.example_jp as string | null) ?? null,
    exampleZh:    (row.example_zh as string | null) ?? null,
    audioFile:    (row.audio_file  as string | null) ?? null,
  };
}

export const WordRepository = {

  /** 获取全部单词 */
  async getAll(): Promise<DbResult<Word[]>> {
    try {
      const db = await getDb();
      const rows = await db.getAllAsync<Record<string, unknown>>(
        'SELECT * FROM words ORDER BY id;'
      );
      return { data: rows.map(rowToWord), error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  /**
   * 按难度获取
   * @param difficulty 1=入门 2=初级 3=中级
   */
  async getByDifficulty(difficulty: 1 | 2 | 3): Promise<DbResult<Word[]>> {
    try {
      const db = await getDb();
      const rows = await db.getAllAsync<Record<string, unknown>>(
        'SELECT * FROM words WHERE difficulty = ? ORDER BY id;',
        [difficulty]
      );
      return { data: rows.map(rowToWord), error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  /**
   * 按 JLPT 等级获取
   * @param level "N5" | "N4" | "N3" | "N2" | "N1"
   */
  async getByJlpt(level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'): Promise<DbResult<Word[]>> {
    try {
      const db = await getDb();
      const rows = await db.getAllAsync<Record<string, unknown>>(
        'SELECT * FROM words WHERE jlpt_level = ? ORDER BY id;',
        [level]
      );
      return { data: rows.map(rowToWord), error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  /**
   * 模糊搜索（日语 / 中文 / 罗马音）
   * @param query 搜索关键词
   */
  async search(query: string): Promise<DbResult<Word[]>> {
    try {
      const db = await getDb();
      const like = `%${query}%`;
      const rows = await db.getAllAsync<Record<string, unknown>>(
        `SELECT * FROM words
         WHERE word LIKE ? OR reading LIKE ? OR romaji LIKE ? OR meaning_zh LIKE ?
         ORDER BY difficulty, id;`,
        [like, like, like, like]
      );
      return { data: rows.map(rowToWord), error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  /** 按 ID 获取单条 */
  async getById(id: number): Promise<DbResult<Word | null>> {
    try {
      const db = await getDb();
      const row = await db.getFirstAsync<Record<string, unknown>>(
        'SELECT * FROM words WHERE id = ?;',
        [id]
      );
      return { data: row ? rowToWord(row) : null, error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  /**
   * 随机抽词（测验用）
   * @param count      数量
   * @param difficulty 可选，null=不限
   */
  async getRandom(
    count: number,
    difficulty?: 1 | 2 | 3
  ): Promise<DbResult<Word[]>> {
    try {
      const db = await getDb();
      let rows: Record<string, unknown>[];
      if (difficulty != null) {
        rows = await db.getAllAsync<Record<string, unknown>>(
          'SELECT * FROM words WHERE difficulty = ? ORDER BY RANDOM() LIMIT ?;',
          [difficulty, count]
        );
      } else {
        rows = await db.getAllAsync<Record<string, unknown>>(
          'SELECT * FROM words ORDER BY RANDOM() LIMIT ?;',
          [count]
        );
      }
      return { data: rows.map(rowToWord), error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },
};
