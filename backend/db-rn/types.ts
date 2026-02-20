// ============================================================
// Nihongo App - TypeScript Data Models
// For React Native + Expo (expo-sqlite)
// ============================================================

export interface Kana {
  id: number;
  character: string;       // あ / ア
  romaji: string;          // a / ka
  type: 'hiragana' | 'katakana';
  groupName: string;       // a-row / ka-row / ... / n
  strokeOrder: string | null;
  audioFile: string | null;
}

export interface Word {
  id: number;
  word: string;            // 食べる
  reading: string;         // たべる
  romaji: string;          // taberu
  meaningZh: string;       // 吃
  partOfSpeech: 'noun' | 'verb' | 'adj' | 'adv' | 'expr' | null;
  difficulty: 1 | 2 | 3;  // 1=入门 2=初级 3=中级
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | null;
  exampleJp: string | null;
  exampleZh: string | null;
  audioFile: string | null;
}

export interface DbResult<T> {
  data: T | null;
  error: string | null;
}
