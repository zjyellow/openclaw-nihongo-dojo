// Types - re-export from db layer
export type { Kana, Word, DbResult } from '../db/types';

// Learning content type
export type ContentType = 'hiragana' | 'katakana' | 'word';

// Quiz question
export interface QuizQuestion {
  id: string;
  type: 'kana' | 'word';
  question: string; // Character or word to show
  correctAnswer: string; // Correct answer (romaji or meaning)
  options: string[]; // Multiple choice options
}

// Quiz result
export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number; // Percentage
  timeTaken?: number; // Seconds
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Learn: { contentType: ContentType };
  Quiz: { contentType: ContentType };
  Result: { result: QuizResult };
};