// Home Screen - Select learning content
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, ContentType } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CONTENT_OPTIONS: { type: ContentType; title: string; subtitle: string; color: string }[] = [
  { type: 'hiragana', title: '平假名', subtitle: 'Hiragana', color: '#FF6B6B' },
  { type: 'katakana', title: '片假名', subtitle: 'Katakana', color: '#4ECDC4' },
  { type: 'word', title: '单词', subtitle: 'Words', color: '#45B7D1' },
];

export default function HomeScreen({ navigation }: Props) {
  const handleSelect = (type: ContentType) => {
    // Navigate to learn screen (can also navigate to quiz directly)
    navigation.navigate('Learn', { contentType: type });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>日语学习</Text>
        <Text style={styles.subtitle}>选择学习内容</Text>
        
        <View style={styles.options}>
          {CONTENT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.type}
              style={[styles.optionCard, { backgroundColor: option.color }]}
              onPress={() => handleSelect(option.type)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.hint}>点击卡片开始学习</Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
    marginBottom: 40,
  },
  options: {
    width: '100%',
    gap: 16,
  },
  optionCard: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  hint: {
    fontSize: 14,
    color: '#999',
    marginTop: 32,
  },
});