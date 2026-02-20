// Memory data source for Web platform (expo-sqlite not available)
import type { Kana, Word } from '../types';

// Hiragana data (46 characters)
const hiraganaData: [string, string, string][] = [
  ['あ','a','a-row'],['い','i','a-row'],['う','u','a-row'],['え','e','a-row'],['お','o','a-row'],
  ['か','ka','ka-row'],['き','ki','ka-row'],['く','ku','ka-row'],['け','ke','ka-row'],['こ','ko','ka-row'],
  ['さ','sa','sa-row'],['し','shi','sa-row'],['す','su','sa-row'],['せ','se','sa-row'],['そ','so','sa-row'],
  ['た','ta','ta-row'],['ち','chi','ta-row'],['つ','tsu','ta-row'],['て','te','ta-row'],['と','to','ta-row'],
  ['な','na','na-row'],['に','ni','na-row'],['ぬ','nu','na-row'],['ね','ne','na-row'],['の','no','na-row'],
  ['は','ha','ha-row'],['ひ','hi','ha-row'],['ふ','fu','ha-row'],['へ','he','ha-row'],['ほ','ho','ha-row'],
  ['ま','ma','ma-row'],['み','mi','ma-row'],['む','mu','ma-row'],['め','me','ma-row'],['も','mo','ma-row'],
  ['や','ya','ya-row'],['ゆ','yu','ya-row'],['よ','yo','ya-row'],
  ['ら','ra','ra-row'],['り','ri','ra-row'],['る','ru','ra-row'],['れ','re','ra-row'],['ろ','ro','ra-row'],
  ['わ','wa','wa-row'],['を','wo','wa-row'],
  ['ん','n','n'],
];

// Katakana data (46 characters)
const katakanaData: [string, string, string][] = [
  ['ア','a','a-row'],['イ','i','a-row'],['ウ','u','a-row'],['エ','e','a-row'],['オ','o','a-row'],
  ['カ','ka','ka-row'],['キ','ki','ka-row'],['ク','ku','ka-row'],['ケ','ke','ka-row'],['コ','ko','ka-row'],
  ['サ','sa','sa-row'],['シ','shi','sa-row'],['ス','su','sa-row'],['セ','se','sa-row'],['ソ','so','sa-row'],
  ['タ','ta','ta-row'],['チ','chi','ta-row'],['ツ','tsu','ta-row'],['テ','te','ta-row'],['ト','to','ta-row'],
  ['ナ','na','na-row'],['ニ','ni','na-row'],['ヌ','nu','na-row'],['ネ','ne','na-row'],['ノ','no','na-row'],
  ['ハ','ha','ha-row'],['ヒ','hi','ha-row'],['フ','fu','ha-row'],['ヘ','he','ha-row'],['ホ','ho','ha-row'],
  ['マ','ma','ma-row'],['ミ','mi','ma-row'],['ム','mu','ma-row'],['メ','me','ma-row'],['モ','mo','ma-row'],
  ['ヤ','ya','ya-row'],['ユ','yu','ya-row'],['ヨ','yo','ya-row'],
  ['ラ','ra','ra-row'],['リ','ri','ra-row'],['ル','ru','ra-row'],['レ','re','ra-row'],['ロ','ro','ra-row'],
  ['ワ','wa','wa-row'],['ヲ','wo','wa-row'],
  ['ン','n','n'],
];

// Convert to Kana type
let kanaId = 1;
export const memoryKana: Kana[] = [
  ...hiraganaData.map(r => ({
    id: kanaId++,
    character: r[0],
    romaji: r[1],
    type: 'hiragana' as const,
    groupName: r[2],
    strokeOrder: null,
    audioFile: null,
  })),
  ...katakanaData.map(r => ({
    id: kanaId++,
    character: r[0],
    romaji: r[1],
    type: 'katakana' as const,
    groupName: r[2],
    strokeOrder: null,
    audioFile: null,
  })),
];

// Word data (51 words)
type WordRow = {
  word: string;
  reading: string;
  romaji: string;
  meaningZh: string;
  partOfSpeech: 'noun' | 'verb' | 'adj' | 'adv' | 'expr' | null;
  difficulty: 1 | 2 | 3;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | null;
  exampleJp: string | null;
  exampleZh: string | null;
};

const wordData: WordRow[] = [
  { word: '一', reading: 'いち', romaji: 'ichi', meaningZh: '一、1', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: 'いちにんです。', exampleZh: '是一个人。' },
  { word: '二', reading: 'に', romaji: 'ni', meaningZh: '二、2', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '三', reading: 'さん', romaji: 'san', meaningZh: '三、3', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '今日', reading: 'きょう', romaji: 'kyou', meaningZh: '今天', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '今日はいい天気です。', exampleZh: '今天天气很好。' },
  { word: '明日', reading: 'あした', romaji: 'ashita', meaningZh: '明天', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '明日また来ます。', exampleZh: '明天再来。' },
  { word: '昨日', reading: 'きのう', romaji: 'kinou', meaningZh: '昨天', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '今', reading: 'いま', romaji: 'ima', meaningZh: '现在', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '今何時ですか。', exampleZh: '现在几点？' },
  { word: '年', reading: 'とし', romaji: 'toshi', meaningZh: '年、岁', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '私', reading: 'わたし', romaji: 'watashi', meaningZh: '我', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '私は学生です。', exampleZh: '我是学生。' },
  { word: 'あなた', reading: 'あなた', romaji: 'anata', meaningZh: '你', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '人', reading: 'ひと', romaji: 'hito', meaningZh: '人', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: 'あの人は誰ですか。', exampleZh: '那个人是谁？' },
  { word: '友達', reading: 'ともだち', romaji: 'tomodachi', meaningZh: '朋友', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '友達と遊びます。', exampleZh: '和朋友玩。' },
  { word: '先生', reading: 'せんせい', romaji: 'sensei', meaningZh: '老师', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '先生はやさしいです。', exampleZh: '老师很温柔。' },
  { word: '学生', reading: 'がくせい', romaji: 'gakusei', meaningZh: '学生', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '学校', reading: 'がっこう', romaji: 'gakkou', meaningZh: '学校', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '学校へ行きます。', exampleZh: '去学校。' },
  { word: '家', reading: 'いえ', romaji: 'ie', meaningZh: '家', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '家に帰ります。', exampleZh: '回家。' },
  { word: '駅', reading: 'えき', romaji: 'eki', meaningZh: '车站', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '駅はどこですか。', exampleZh: '车站在哪里？' },
  { word: '店', reading: 'みせ', romaji: 'mise', meaningZh: '店', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '病院', reading: 'びょういん', romaji: 'byouin', meaningZh: '医院', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: 'ご飯', reading: 'ごはん', romaji: 'gohan', meaningZh: '米饭、饭', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: 'ご飯を食べます。', exampleZh: '吃饭。' },
  { word: '水', reading: 'みず', romaji: 'mizu', meaningZh: '水', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '水をください。', exampleZh: '请给我水。' },
  { word: 'お茶', reading: 'おちゃ', romaji: 'ocha', meaningZh: '茶', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: 'りんご', reading: 'りんご', romaji: 'ringo', meaningZh: '苹果', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: 'りんごが好きです。', exampleZh: '喜欢苹果。' },
  { word: '魚', reading: 'さかな', romaji: 'sakana', meaningZh: '鱼', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '肉', reading: 'にく', romaji: 'niku', meaningZh: '肉', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '本', reading: 'ほん', romaji: 'hon', meaningZh: '书', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '本を読みます。', exampleZh: '读书。' },
  { word: '車', reading: 'くるま', romaji: 'kuruma', meaningZh: '车', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: '車で行きます。', exampleZh: '开车去。' },
  { word: '電話', reading: 'でんわ', romaji: 'denwa', meaningZh: '电话', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '時計', reading: 'とけい', romaji: 'tokei', meaningZh: '钟表', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: 'お金', reading: 'おかね', romaji: 'okane', meaningZh: '钱', partOfSpeech: 'noun', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '食べる', reading: 'たべる', romaji: 'taberu', meaningZh: '吃', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: 'パンを食べます。', exampleZh: '吃面包。' },
  { word: '飲む', reading: 'のむ', romaji: 'nomu', meaningZh: '喝', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: '水を飲みます。', exampleZh: '喝水。' },
  { word: '行く', reading: 'いく', romaji: 'iku', meaningZh: '去', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: '学校へ行きます。', exampleZh: '去学校。' },
  { word: '来る', reading: 'くる', romaji: 'kuru', meaningZh: '来', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: '友達が来ます。', exampleZh: '朋友来了。' },
  { word: '見る', reading: 'みる', romaji: 'miru', meaningZh: '看', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: 'テレビを見ます。', exampleZh: '看电视。' },
  { word: '聞く', reading: 'きく', romaji: 'kiku', meaningZh: '听、问', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: '音楽を聞きます。', exampleZh: '听音乐。' },
  { word: '話す', reading: 'はなす', romaji: 'hanasu', meaningZh: '说话', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: '日本語を話します。', exampleZh: '说日语。' },
  { word: '書く', reading: 'かく', romaji: 'kaku', meaningZh: '写', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: '名前を書きます。', exampleZh: '写名字。' },
  { word: '読む', reading: 'よむ', romaji: 'yomu', meaningZh: '读', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: '本を読みます。', exampleZh: '读书。' },
  { word: '買う', reading: 'かう', romaji: 'kau', meaningZh: '买', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: 'りんごを買います。', exampleZh: '买苹果。' },
  { word: '起きる', reading: 'おきる', romaji: 'okiru', meaningZh: '起床', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: '七時に起きます。', exampleZh: '7点起床。' },
  { word: '寝る', reading: 'ねる', romaji: 'neru', meaningZh: '睡觉', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '働く', reading: 'はたらく', romaji: 'hataraku', meaningZh: '工作', partOfSpeech: 'verb', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '大きい', reading: 'おおきい', romaji: 'ookii', meaningZh: '大的', partOfSpeech: 'adj', difficulty: 1, jlptLevel: 'N5', exampleJp: '大きい犬です。', exampleZh: '是大狗。' },
  { word: '小さい', reading: 'ちいさい', romaji: 'chiisai', meaningZh: '小的', partOfSpeech: 'adj', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '新しい', reading: 'あたらしい', romaji: 'atarashii', meaningZh: '新的', partOfSpeech: 'adj', difficulty: 1, jlptLevel: 'N5', exampleJp: '新しい本です。', exampleZh: '是新书。' },
  { word: '古い', reading: 'ふるい', romaji: 'furui', meaningZh: '旧的', partOfSpeech: 'adj', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: '好き', reading: 'すき', romaji: 'suki', meaningZh: '喜欢', partOfSpeech: 'adj', difficulty: 1, jlptLevel: 'N5', exampleJp: '犬が好きです。', exampleZh: '喜欢狗。' },
  { word: '嫌い', reading: 'きらい', romaji: 'kirai', meaningZh: '讨厌', partOfSpeech: 'adj', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
  { word: 'ありがとう', reading: 'ありがとう', romaji: 'arigatou', meaningZh: '谢谢', partOfSpeech: 'expr', difficulty: 1, jlptLevel: 'N5', exampleJp: 'ありがとうございます。', exampleZh: '非常感谢。' },
  { word: 'すみません', reading: 'すみません', romaji: 'sumimasen', meaningZh: '对不起、打扰', partOfSpeech: 'expr', difficulty: 1, jlptLevel: 'N5', exampleJp: null, exampleZh: null },
];

// Convert to Word type
export const memoryWords: Word[] = wordData.map((w, index) => ({
  id: index + 1,
  word: w.word,
  reading: w.reading,
  romaji: w.romaji,
  meaningZh: w.meaningZh,
  partOfSpeech: w.partOfSpeech,
  difficulty: w.difficulty,
  jlptLevel: w.jlptLevel,
  exampleJp: w.exampleJp,
  exampleZh: w.exampleZh,
  audioFile: null,
}));
