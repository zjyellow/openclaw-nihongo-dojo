// Learn Screen - Kana group view + Card learning
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Kana, Word, ContentType } from '../types';
import { getKanaData, getAllWords as getWordsData, getKanaByGroup } from '../data/dataService';

type Props = NativeStackScreenProps<RootStackParamList, 'Learn'>;

// Kana row names
const KANA_ROWS = [
  { key: 'a-row', label: 'あ行', chars: 'あいうえお' },
  { key: 'ka-row', label: 'か行', chars: 'かきくけこ' },
  { key: 'sa-row', label: 'さ行', chars: 'さしすせそ' },
  { key: 'ta-row', label: 'た行', chars: 'たちつてと' },
  { key: 'na-row', label: 'な行', chars: 'なにぬねの' },
  { key: 'ha-row', label: 'は行', chars: 'はひふへほ' },
  { key: 'ma-row', label: 'ま行', chars: 'まみむめも' },
  { key: 'ya-row', label: 'や行', chars: 'やゆよ' },
  { key: 'ra-row', label: 'ら行', chars: 'らりるれろ' },
  { key: 'wa-row', label: 'わ行', chars: 'わを' },
  { key: 'n', label: 'ん', chars: 'ん' },
];

export default function LearnScreen({ navigation, route }: Props) {
  const { contentType } = route.params;
  
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<string>('a-row');
  const [kanaData, setKanaData] = useState<Kana[]>([]);
  const [wordData, setWordData] = useState<Word[]>([]);
  const [currentKana, setCurrentKana] = useState<Kana | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Load data from database
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      if (contentType === 'hiragana' || contentType === 'katakana') {
        const data = await getKanaData(contentType);
        setKanaData(data);
      } else if (contentType === 'word') {
        const data = await getWordsData();
        setWordData(data);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, [contentType]);
  
  // Get kana for selected row
  const getRowKana = (): Kana[] => {
    return kanaData.filter(k => k.groupName === selectedRow);
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const getTitle = (): string => {
    switch (contentType) {
      case 'hiragana':
        return '平假名';
      case 'katakana':
        return '片假名';
      case 'word':
        return '单词';
    }
  };
  
  // Word learning mode (keep original card view)
  if (contentType === 'word') {
    return (
      <WordLearnView 
        words={wordData} 
        title={getTitle()} 
        navigation={navigation}
        contentType={contentType}
      />
    );
  }
  
  // Kana detail view (when a kana is selected)
  if (currentKana) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {contentType === 'hiragana' ? currentKana.groupName.replace('-row', '行') : currentKana.groupName.replace('-row', '行')}
          </Text>
          
          {/* Card */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => setShowAnswer(!showAnswer)}
            activeOpacity={0.9}
          >
            <Text style={styles.cardCharacter}>
              {showAnswer ? currentKana.romaji : currentKana.character}
            </Text>
            <Text style={styles.cardHint}>
              {showAnswer ? '点击隐藏答案' : '点击显示读音'}
            </Text>
          </TouchableOpacity>
          
          {/* Back to grid */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              setCurrentKana(null);
              setShowAnswer(false);
            }}
          >
            <Text style={styles.backButtonText}>返回列表</Text>
          </TouchableOpacity>
          
          {/* Quiz Button */}
          <TouchableOpacity 
            style={styles.quizButton}
            onPress={() => navigation.navigate('Quiz', { contentType })}
          >
            <Text style={styles.quizButtonText}>开始测验</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // Kana grid view (default)
  const rowKana = getRowKana();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{getTitle()}</Text>
        
        {/* Row selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.rowSelector}
          contentContainerStyle={styles.rowSelectorContent}
        >
          {KANA_ROWS.map((row) => (
            <TouchableOpacity
              key={row.key}
              style={[
                styles.rowTab,
                selectedRow === row.key && styles.rowTabActive
              ]}
              onPress={() => setSelectedRow(row.key)}
            >
              <Text style={[
                styles.rowTabText,
                selectedRow === row.key && styles.rowTabTextActive
              ]}>
                {row.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Kana grid */}
        <View style={styles.kanaGrid}>
          {rowKana.map((kana) => (
            <TouchableOpacity
              key={kana.id}
              style={styles.kanaCell}
              onPress={() => setCurrentKana(kana)}
              activeOpacity={0.7}
            >
              <Text style={styles.kanaChar}>{kana.character}</Text>
              <Text style={styles.kanaRomaji}>{kana.romaji}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Empty state */}
        {rowKana.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>该行暂无数据</Text>
          </View>
        )}
        
        {/* Quiz Button */}
        <TouchableOpacity 
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { contentType })}
        >
          <Text style={styles.quizButtonText}>开始测验</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Word learning sub-component (original card view)
function WordLearnView({ 
  words, 
  title, 
  navigation,
  contentType 
}: { 
  words: Word[]; 
  title: string;
  navigation: Props['navigation'];
  contentType: ContentType;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  if (words.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>数据加载失败</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>返回首页</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const currentWord = words[currentIndex];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentIndex + 1} / {words.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentIndex + 1) / words.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
        
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
        
        {/* Filter button (disabled for MVP) */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, styles.filterButtonDisabled]}
            disabled
          >
            <Text style={styles.filterButtonText}>筛选 (开发中)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, styles.filterButtonDisabled]}
            disabled
          >
            <Text style={styles.filterButtonText}>搜索 (开发中)</Text>
          </TouchableOpacity>
        </View>
        
        {/* Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => setShowAnswer(!showAnswer)}
          activeOpacity={0.9}
        >
          <Text style={styles.cardCharacter}>
            {showAnswer ? `${currentWord.romaji}\n${currentWord.meaningZh}` : currentWord.word}
          </Text>
          <Text style={styles.cardHint}>
            {showAnswer ? '点击隐藏答案' : '点击显示释义'}
          </Text>
        </TouchableOpacity>
        
        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity 
            style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
            onPress={() => {
              setCurrentIndex(currentIndex - 1);
              setShowAnswer(false);
            }}
            disabled={currentIndex === 0}
          >
            <Text style={styles.navButtonText}>← 上一个</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.navButton, 
              currentIndex === words.length - 1 && styles.navButtonDisabled
            ]}
            onPress={() => {
              setCurrentIndex(currentIndex + 1);
              setShowAnswer(false);
            }}
            disabled={currentIndex === words.length - 1}
          >
            <Text style={styles.navButtonText}>下一个 →</Text>
          </TouchableOpacity>
        </View>
        
        {/* Quiz Button */}
        <TouchableOpacity 
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { contentType })}
        >
          <Text style={styles.quizButtonText}>开始测验</Text>
        </TouchableOpacity>
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
    marginTop: 24,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  // Row selector
  rowSelector: {
    width: '100%',
    marginBottom: 20,
  },
  rowSelectorContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  rowTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  rowTabActive: {
    backgroundColor: '#FF6B6B',
  },
  rowTabText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  rowTabTextActive: {
    color: '#fff',
  },
  // Kana grid
  kanaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  kanaCell: {
    width: 80,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  kanaChar: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  kanaRomaji: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  // Card
  card: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 300,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardCharacter: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 16,
  },
  // Progress
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
  // Filter buttons (disabled)
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonDisabled: {
    opacity: 0.5,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#999',
  },
  // Navigation
  navButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  navButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#333',
  },
  // Quiz button
  quizButton: {
    marginTop: 24,
    paddingHorizontal: 48,
    paddingVertical: 16,
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quizButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});