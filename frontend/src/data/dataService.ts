// Data service layer - Platform-aware data access
import { Platform } from 'react-native';
import type { Kana, Word, QuizQuestion } from '../types';

// Memory data source for Web platform
import { memoryKana, memoryWords } from './memoryDataSource';

// Initialize database on app start (native only)
export async function initDatabase(): Promise<void> {
  if (Platform.OS === 'web') {
    return;
  }
  // Dynamic import for native platforms only
  const { getDb } = await import('../db');
  await getDb();
}

// ============ Kana Operations ============

export async function getKanaData(type: 'hiragana' | 'katakana'): Promise<Kana[]> {
  if (Platform.OS === 'web') {
    return memoryKana.filter(k => k.type === type);
  }
  
  const { KanaRepository } = await import('../db');
  const result = await KanaRepository.getByType(type);
  if (result.error || !result.data) {
    console.error('Failed to load kana:', result.error);
    return [];
  }
  return result.data;
}

export async function getAllKana(): Promise<Kana[]> {
  if (Platform.OS === 'web') {
    return memoryKana;
  }
  
  const { KanaRepository } = await import('../db');
  const result = await KanaRepository.getAll();
  if (result.error || !result.data) {
    console.error('Failed to load kana:', result.error);
    return [];
  }
  return result.data;
}

export async function getKanaByGroup(
  type: 'hiragana' | 'katakana',
  group: string
): Promise<Kana[]> {
  if (Platform.OS === 'web') {
    return memoryKana.filter(k => k.type === type && k.groupName === group);
  }
  
  const { KanaRepository } = await import('../db');
  const result = await KanaRepository.getByGroup(type, group);
  if (result.error || !result.data) {
    console.error('Failed to load kana by group:', result.error);
    return [];
  }
  return result.data;
}

// ============ Word Operations ============

export async function getAllWords(): Promise<Word[]> {
  if (Platform.OS === 'web') {
    return memoryWords;
  }
  
  const { WordRepository } = await import('../db');
  const result = await WordRepository.getAll();
  if (result.error || !result.data) {
    console.error('Failed to load words:', result.error);
    return [];
  }
  return result.data;
}

export async function getWordsByDifficulty(difficulty: 1 | 2 | 3): Promise<Word[]> {
  if (Platform.OS === 'web') {
    return memoryWords.filter(w => w.difficulty === difficulty);
  }
  
  const { WordRepository } = await import('../db');
  const result = await WordRepository.getByDifficulty(difficulty);
  if (result.error || !result.data) {
    console.error('Failed to load words by difficulty:', result.error);
    return [];
  }
  return result.data;
}

export async function getWordsByJlpt(level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'): Promise<Word[]> {
  if (Platform.OS === 'web') {
    return memoryWords.filter(w => w.jlptLevel === level);
  }
  
  const { WordRepository } = await import('../db');
  const result = await WordRepository.getByJlpt(level);
  if (result.error || !result.data) {
    console.error('Failed to load words by JLPT:', result.error);
    return [];
  }
  return result.data;
}

export async function searchWords(query: string): Promise<Word[]> {
  if (Platform.OS === 'web') {
    const lowerQuery = query.toLowerCase();
    return memoryWords.filter(w => 
      w.word.includes(query) ||
      w.reading.includes(query) ||
      w.romaji.toLowerCase().includes(lowerQuery) ||
      w.meaningZh.includes(query)
    );
  }
  
  const { WordRepository } = await import('../db');
  const result = await WordRepository.search(query);
  if (result.error || !result.data) {
    console.error('Failed to search words:', result.error);
    return [];
  }
  return result.data;
}

export async function getRandomWords(count: number, difficulty?: 1 | 2 | 3): Promise<Word[]> {
  if (Platform.OS === 'web') {
    const pool = difficulty 
      ? memoryWords.filter(w => w.difficulty === difficulty)
      : memoryWords;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  
  const { WordRepository } = await import('../db');
  const result = await WordRepository.getRandom(count, difficulty);
  if (result.error || !result.data) {
    console.error('Failed to get random words:', result.error);
    return [];
  }
  return result.data;
}

// ============ Quiz Generation ============

export async function generateKanaQuiz(
  type: 'hiragana' | 'katakana',
  count: number = 10
): Promise<QuizQuestion[]> {
  const kanaList = await getKanaData(type);
  if (kanaList.length === 0) return [];

  const shuffled = [...kanaList].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, kanaList.length));

  return selected.map((kana, index) => {
    const wrongOptions = kanaList
      .filter(k => k.romaji !== kana.romaji)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(k => k.romaji);

    const options = [kana.romaji, ...wrongOptions].sort(() => Math.random() - 0.5);

    return {
      id: `q${index}`,
      type: 'kana' as const,
      question: kana.character,
      correctAnswer: kana.romaji,
      options,
    };
  });
}

export async function generateWordQuiz(count: number = 10): Promise<QuizQuestion[]> {
  const words = await getRandomWords(count);
  if (words.length === 0) return [];

  const allWords = await getAllWords();

  return words.map((word, index) => {
    const wrongOptions = allWords
      .filter(w => w.meaningZh !== word.meaningZh)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.meaningZh);

    const options = [word.meaningZh, ...wrongOptions].sort(() => Math.random() - 0.5);

    return {
      id: `q${index}`,
      type: 'word' as const,
      question: word.word,
      correctAnswer: word.meaningZh,
      options,
    };
  });
}