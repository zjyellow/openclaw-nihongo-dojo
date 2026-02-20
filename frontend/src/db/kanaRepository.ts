// ============================================================
// KanaRepository - React Native / expo-sqlite
// ============================================================

import { getDb } from './database';
import type { Kana, DbResult } from './types';

// DB row → Kana model
function rowToKana(row: Record<string, unknown>): Kana {
  return {
    id:          row.id as number,
    character:   row.character as string,
    romaji:      row.romaji as string,
    type:        row.type as 'hiragana' | 'katakana',
    groupName:   row.group_name as string,
    strokeOrder: (row.stroke_order as string | null) ?? null,
    audioFile:   (row.audio_file  as string | null) ?? null,
  };
}

export const KanaRepository = {

  /** 获取全部假名（92条） */
  async getAll(): Promise<DbResult<Kana[]>> {
    try {
      const db = await getDb();
      const rows = await db.getAllAsync<Record<string, unknown>>(
        'SELECT * FROM kana ORDER BY id;'
      );
      return { data: rows.map(rowToKana), error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  /**
   * 按类型获取
   * @param type "hiragana" | "katakana"
   */
  async getByType(type: 'hiragana' | 'katakana'): Promise<DbResult<Kana[]>> {
    try {
      const db = await getDb();
      const rows = await db.getAllAsync<Record<string, unknown>>(
        'SELECT * FROM kana WHERE type = ? ORDER BY id;',
        [type]
      );
      return { data: rows.map(rowToKana), error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  /**
   * 按行获取
   * @param type  "hiragana" | "katakana"
   * @param group "a-row" | "ka-row" | ... | "n"
   */
  async getByGroup(
    type: 'hiragana' | 'katakana',
    group: string
  ): Promise<DbResult<Kana[]>> {
    try {
      const db = await getDb();
      const rows = await db.getAllAsync<Record<string, unknown>>(
        'SELECT * FROM kana WHERE type = ? AND group_name = ? ORDER BY id;',
        [type, group]
      );
      return { data: rows.map(rowToKana), error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },

  /** 按 ID 获取单条 */
  async getById(id: number): Promise<DbResult<Kana | null>> {
    try {
      const db = await getDb();
      const row = await db.getFirstAsync<Record<string, unknown>>(
        'SELECT * FROM kana WHERE id = ?;',
        [id]
      );
      return { data: row ? rowToKana(row) : null, error: null };
    } catch (e) {
      return { data: null, error: (e as Error).message };
    }
  },
};
