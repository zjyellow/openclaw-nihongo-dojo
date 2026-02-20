// Result Screen - Quiz score and feedback
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation, route }: Props) {
  const { result } = route.params;
  
  const handleRetry = () => {
    navigation.goBack(); // Go back to quiz
  };
  
  const handleHome = () => {
    navigation.navigate('Home');
  };
  
  const getScoreColor = () => {
    if (result.score >= 80) return '#28A745';
    if (result.score >= 60) return '#FFC107';
    return '#DC3545';
  };
  
  const getScoreMessage = () => {
    if (result.score >= 80) return '太棒了！继续保持！';
    if (result.score >= 60) return '不错，再接再厉！';
    return '继续努力，多多练习！';
  };
  
  const getEmoji = () => {
    if (result.score >= 80) return '🎉';
    if (result.score >= 60) return '👍';
    return '💪';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Emoji */}
        <Text style={styles.emoji}>{getEmoji()}</Text>
        
        {/* Score Circle */}
        <View style={[styles.scoreCircle, { borderColor: getScoreColor() }]}>
          <Text style={[styles.scoreText, { color: getScoreColor() }]}>
            {result.score}%
          </Text>
        </View>
        
        {/* Message */}
        <Text style={styles.message}>{getScoreMessage()}</Text>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{result.totalQuestions}</Text>
            <Text style={styles.statLabel}>总题数</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#28A745' }]}>
              {result.correctAnswers}
            </Text>
            <Text style={styles.statLabel}>正确</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#DC3545' }]}>
              {result.wrongAnswers}
            </Text>
            <Text style={styles.statLabel}>错误</Text>
          </View>
        </View>
        
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>再来一次</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={handleHome}
          >
            <Text style={styles.homeButtonText}>返回首页</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  scoreCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreText: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 40,
    gap: 16,
  },
  retryButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  homeButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});