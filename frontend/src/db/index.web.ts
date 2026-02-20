// Web platform stub - expo-sqlite not available
import type { Kana, Word } from './types';

export type { Kana, Word } from './types';

type DbResult<T> = { data: T | null; error: string | null };

// Stub implementations - should not be called on web
export const KanaRepository = {
  getAll: async (): Promise<DbResult<Kana[]>> => ({ data: null, error: 'Not available on web' }),
  getByType: async (): Promise<DbResult<Kana[]>> => ({ data: null, error: 'Not available on web' }),
  getByGroup: async (): Promise<DbResult<Kana[]>> => ({ data: null, error: 'Not available on web' }),
  getById: async (): Promise<DbResult<Kana | null>> => ({ data: null, error: 'Not available on web' }),
};

export const WordRepository = {
  getAll: async (): Promise<DbResult<Word[]>> => ({ data: null, error: 'Not available on web' }),
  getByDifficulty: async (): Promise<DbResult<Word[]>> => ({ data: null, error: 'Not available on web' }),
  getByJlpt: async (): Promise<DbResult<Word[]>> => ({ data: null, error: 'Not available on web' }),
  search: async (): Promise<DbResult<Word[]>> => ({ data: null, error: 'Not available on web' }),
  getById: async (): Promise<DbResult<Word | null>> => ({ data: null, error: 'Not available on web' }),
  getRandom: async (): Promise<DbResult<Word[]>> => ({ data: null, error: 'Not available on web' }),
};

export async function getDb(): Promise<null> {
  console.warn('expo-sqlite is not available on web platform');
  return null;
}