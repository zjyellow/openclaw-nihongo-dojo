// Quiz Screen - Multiple choice questions
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, QuizQuestion, QuizResult, ContentType } from '../types';
import { generateKanaQuiz, generateWordQuiz } from '../data/dataService';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ navigation, route }: Props) {
  const { contentType } = route.params;
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Load quiz questions
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      let qs: QuizQuestion[] = [];
      
      switch (contentType) {
        case 'hiragana':
          qs = await generateKanaQuiz('hiragana', 10);
          break;
        case 'katakana':
          qs = await generateKanaQuiz('katakana', 10);
          break;
        case 'word':
          qs = await generateWordQuiz(10);
          break;
      }
      
      setQuestions(qs);
      setLoading(false);
    };
    
    loadQuestions();
  }, [contentType]);
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>生成题目中...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>题目生成失败</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>返回学习</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const currentQuestion = questions[currentIndex];
  
  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz finished, navigate to result
      const result: QuizResult = {
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        wrongAnswers: questions.length - correctCount,
        score: Math.round((correctCount / questions.length) * 100),
      };
      navigation.navigate('Result', { result });
    }
  };
  
  const getTitle = (): string => {
    switch (contentType) {
      case 'hiragana':
        return '平假名测验';
      case 'katakana':
        return '片假名测验';
      case 'word':
        return '单词测验';
    }
  };
  
  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      return styles.optionButton;
    }
    
    if (option === currentQuestion.correctAnswer) {
      return [styles.optionButton, styles.optionCorrect];
    }
    
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return [styles.optionButton, styles.optionWrong];
    }
    
    return [styles.optionButton, styles.optionDisabled];
  };
  
  const getOptionTextStyle = (option: string) => {
    if (!isAnswered) {
      return styles.optionText;
    }
    
    if (option === currentQuestion.correctAnswer) {
      return [styles.optionText, styles.optionTextCorrect];
    }
    
    return [styles.optionText, styles.optionTextDisabled];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            问题 {currentIndex + 1} / {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentIndex + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
        
        {/* Title */}
        <Text style={styles.title}>{getTitle()}</Text>
        
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <Text style={styles.questionHint}>
            {currentQuestion.type === 'word' ? '这个单词是什么意思？' : '这个假名怎么读？'}
          </Text>
        </View>
        
        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(option)}
              onPress={() => handleSelectAnswer(option)}
              disabled={isAnswered}
              activeOpacity={0.8}
            >
              <Text style={getOptionTextStyle(option)}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Feedback */}
        {isAnswered && (
          <View style={styles.feedbackContainer}>
            <Text style={[
              styles.feedbackText,
              selectedAnswer === currentQuestion.correctAnswer 
                ? styles.feedbackCorrect 
                : styles.feedbackWrong
            ]}>
              {selectedAnswer === currentQuestion.correctAnswer ? '✓ 正确！' : `✗ 正确答案: ${currentQuestion.correctAnswer}`}
            </Text>
          </View>
        )}
        
        {/* Next Button */}
        {isAnswered && (
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#DC3545',
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  questionContainer: {
    width: '100%',
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  questionHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
  },
  optionButton: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionCorrect: {
    backgroundColor: '#D4EDDA',
    borderColor: '#28A745',
  },
  optionWrong: {
    backgroundColor: '#F8D7DA',
    borderColor: '#DC3545',
  },
  optionDisabled: {
    opacity: 0.6,
  },
  optionText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
  },
  optionTextCorrect: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  optionTextDisabled: {
    color: '#999',
  },
  feedbackContainer: {
    marginTop: 16,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackCorrect: {
    color: '#28A745',
  },
  feedbackWrong: {
    color: '#DC3545',
  },
  nextButton: {
    marginTop: 24,
    paddingHorizontal: 48,
    paddingVertical: 16,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});