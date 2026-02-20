// ============================================================
// Nihongo App - Data Layer Entry Point
// Usage: import { KanaRepository, WordRepository } from '@/db';
// ============================================================

export { KanaRepository } from './kanaRepository';
export { WordRepository } from './wordRepository';
export { getDb }          from './database';
export type { Kana, Word, DbResult } from './types';
