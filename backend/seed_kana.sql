-- ============================================================
-- 假名初始数据
-- 平假名 46 个 + 片假名 46 个
-- ============================================================

-- ------------------------------------------------------------
-- 平假名 (Hiragana) - 46 个
-- ------------------------------------------------------------
INSERT OR IGNORE INTO kana (character, romaji, type, group_name) VALUES
-- あ行
('あ', 'a',   'hiragana', 'a-row'),
('い', 'i',   'hiragana', 'a-row'),
('う', 'u',   'hiragana', 'a-row'),
('え', 'e',   'hiragana', 'a-row'),
('お', 'o',   'hiragana', 'a-row'),
-- か行
('か', 'ka',  'hiragana', 'ka-row'),
('き', 'ki',  'hiragana', 'ka-row'),
('く', 'ku',  'hiragana', 'ka-row'),
('け', 'ke',  'hiragana', 'ka-row'),
('こ', 'ko',  'hiragana', 'ka-row'),
-- さ行
('さ', 'sa',  'hiragana', 'sa-row'),
('し', 'shi', 'hiragana', 'sa-row'),
('す', 'su',  'hiragana', 'sa-row'),
('せ', 'se',  'hiragana', 'sa-row'),
('そ', 'so',  'hiragana', 'sa-row'),
-- た行
('た', 'ta',  'hiragana', 'ta-row'),
('ち', 'chi', 'hiragana', 'ta-row'),
('つ', 'tsu', 'hiragana', 'ta-row'),
('て', 'te',  'hiragana', 'ta-row'),
('と', 'to',  'hiragana', 'ta-row'),
-- な行
('な', 'na',  'hiragana', 'na-row'),
('に', 'ni',  'hiragana', 'na-row'),
('ぬ', 'nu',  'hiragana', 'na-row'),
('ね', 'ne',  'hiragana', 'na-row'),
('の', 'no',  'hiragana', 'na-row'),
-- は行
('は', 'ha',  'hiragana', 'ha-row'),
('ひ', 'hi',  'hiragana', 'ha-row'),
('ふ', 'fu',  'hiragana', 'ha-row'),
('へ', 'he',  'hiragana', 'ha-row'),
('ほ', 'ho',  'hiragana', 'ha-row'),
-- ま行
('ま', 'ma',  'hiragana', 'ma-row'),
('み', 'mi',  'hiragana', 'ma-row'),
('む', 'mu',  'hiragana', 'ma-row'),
('め', 'me',  'hiragana', 'ma-row'),
('も', 'mo',  'hiragana', 'ma-row'),
-- や行
('や', 'ya',  'hiragana', 'ya-row'),
('ゆ', 'yu',  'hiragana', 'ya-row'),
('よ', 'yo',  'hiragana', 'ya-row'),
-- ら行
('ら', 'ra',  'hiragana', 'ra-row'),
('り', 'ri',  'hiragana', 'ra-row'),
('る', 'ru',  'hiragana', 'ra-row'),
('れ', 're',  'hiragana', 'ra-row'),
('ろ', 'ro',  'hiragana', 'ra-row'),
-- わ行
('わ', 'wa',  'hiragana', 'wa-row'),
('を', 'wo',  'hiragana', 'wa-row'),
-- ん
('ん', 'n',   'hiragana', 'n');

-- ------------------------------------------------------------
-- 片假名 (Katakana) - 46 个
-- ------------------------------------------------------------
INSERT OR IGNORE INTO kana (character, romaji, type, group_name) VALUES
-- ア行
('ア', 'a',   'katakana', 'a-row'),
('イ', 'i',   'katakana', 'a-row'),
('ウ', 'u',   'katakana', 'a-row'),
('エ', 'e',   'katakana', 'a-row'),
('オ', 'o',   'katakana', 'a-row'),
-- カ行
('カ', 'ka',  'katakana', 'ka-row'),
('キ', 'ki',  'katakana', 'ka-row'),
('ク', 'ku',  'katakana', 'ka-row'),
('ケ', 'ke',  'katakana', 'ka-row'),
('コ', 'ko',  'katakana', 'ka-row'),
-- サ行
('サ', 'sa',  'katakana', 'sa-row'),
('シ', 'shi', 'katakana', 'sa-row'),
('ス', 'su',  'katakana', 'sa-row'),
('セ', 'se',  'katakana', 'sa-row'),
('ソ', 'so',  'katakana', 'sa-row'),
-- タ行
('タ', 'ta',  'katakana', 'ta-row'),
('チ', 'chi', 'katakana', 'ta-row'),
('ツ', 'tsu', 'katakana', 'ta-row'),
('テ', 'te',  'katakana', 'ta-row'),
('ト', 'to',  'katakana', 'ta-row'),
-- ナ行
('ナ', 'na',  'katakana', 'na-row'),
('ニ', 'ni',  'katakana', 'na-row'),
('ヌ', 'nu',  'katakana', 'na-row'),
('ネ', 'ne',  'katakana', 'na-row'),
('ノ', 'no',  'katakana', 'na-row'),
-- ハ行
('ハ', 'ha',  'katakana', 'ha-row'),
('ヒ', 'hi',  'katakana', 'ha-row'),
('フ', 'fu',  'katakana', 'ha-row'),
('ヘ', 'he',  'katakana', 'ha-row'),
('ホ', 'ho',  'katakana', 'ha-row'),
-- マ行
('マ', 'ma',  'katakana', 'ma-row'),
('ミ', 'mi',  'katakana', 'ma-row'),
('ム', 'mu',  'katakana', 'ma-row'),
('メ', 'me',  'katakana', 'ma-row'),
('モ', 'mo',  'katakana', 'ma-row'),
-- ヤ行
('ヤ', 'ya',  'katakana', 'ya-row'),
('ユ', 'yu',  'katakana', 'ya-row'),
('ヨ', 'yo',  'katakana', 'ya-row'),
-- ラ行
('ラ', 'ra',  'katakana', 'ra-row'),
('リ', 'ri',  'katakana', 'ra-row'),
('ル', 'ru',  'katakana', 'ra-row'),
('レ', 're',  'katakana', 'ra-row'),
('ロ', 'ro',  'katakana', 'ra-row'),
-- ワ行
('ワ', 'wa',  'katakana', 'wa-row'),
('ヲ', 'wo',  'katakana', 'wa-row'),
-- ン
('ン', 'n',   'katakana', 'n');
