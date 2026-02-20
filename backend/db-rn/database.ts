// ============================================================
// Nihongo App - Database Initialization (expo-sqlite)
// ============================================================

import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const DB_NAME = 'nihongo.db';
const DB_VERSION = 1;

let _db: SQLite.SQLiteDatabase | null = null;

/**
 * 获取数据库实例（单例）
 * 首次调用时自动建表并写入种子数据
 */
export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (_db) return _db;

  _db = await SQLite.openDatabaseAsync(DB_NAME);

  await _db.execAsync(`PRAGMA journal_mode = WAL;`);
  await _db.execAsync(`PRAGMA foreign_keys = ON;`);

  await migrate(_db);

  return _db;
}

// ── 建表 ────────────────────────────────────────────────────

async function migrate(db: SQLite.SQLiteDatabase): Promise<void> {
  // 读取当前版本
  const versionRow = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version;'
  );
  const currentVersion = versionRow?.user_version ?? 0;

  if (currentVersion >= DB_VERSION) return;

  await db.withTransactionAsync(async () => {
    // 假名表
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS kana (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        character   TEXT    NOT NULL UNIQUE,
        romaji      TEXT    NOT NULL,
        type        TEXT    NOT NULL CHECK(type IN ('hiragana','katakana')),
        group_name  TEXT    NOT NULL,
        stroke_order TEXT,
        audio_file  TEXT,
        created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now'))
      );
      CREATE INDEX IF NOT EXISTS idx_kana_type   ON kana(type);
      CREATE INDEX IF NOT EXISTS idx_kana_romaji ON kana(romaji);
    `);

    // 单词表
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS words (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        word           TEXT    NOT NULL UNIQUE,
        reading        TEXT    NOT NULL,
        romaji         TEXT    NOT NULL,
        meaning_zh     TEXT    NOT NULL,
        part_of_speech TEXT,
        difficulty     INTEGER NOT NULL DEFAULT 1 CHECK(difficulty BETWEEN 1 AND 3),
        jlpt_level     TEXT CHECK(jlpt_level IN ('N5','N4','N3','N2','N1') OR jlpt_level IS NULL),
        example_jp     TEXT,
        example_zh     TEXT,
        audio_file     TEXT,
        created_at     INTEGER NOT NULL DEFAULT (strftime('%s','now'))
      );
      CREATE INDEX IF NOT EXISTS idx_words_difficulty ON words(difficulty);
      CREATE INDEX IF NOT EXISTS idx_words_jlpt       ON words(jlpt_level);
    `);

    // 进度表（预留）
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        item_type     TEXT    NOT NULL CHECK(item_type IN ('kana','word')),
        item_id       INTEGER NOT NULL,
        review_count  INTEGER NOT NULL DEFAULT 0,
        correct_count INTEGER NOT NULL DEFAULT 0,
        last_reviewed INTEGER,
        next_review   INTEGER,
        mastered      INTEGER NOT NULL DEFAULT 0 CHECK(mastered IN (0,1)),
        created_at    INTEGER NOT NULL DEFAULT (strftime('%s','now')),
        UNIQUE(item_type, item_id)
      );
      CREATE INDEX IF NOT EXISTS idx_progress_next_review ON user_progress(next_review);
    `);

    // 写入 PRAGMA 版本
    await db.execAsync(`PRAGMA user_version = ${DB_VERSION};`);

    // 写入种子数据
    await seedKana(db);
    await seedWords(db);
  });
}

// ── 种子数据（平假名 46 + 片假名 46） ───────────────────────

async function seedKana(db: SQLite.SQLiteDatabase): Promise<void> {
  const hiragana: [string, string, string][] = [
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

  const katakana: [string, string, string][] = [
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

  const all = [
    ...hiragana.map(r => ({ char: r[0], romaji: r[1], type: 'hiragana', group: r[2] })),
    ...katakana.map(r => ({ char: r[0], romaji: r[1], type: 'katakana', group: r[2] })),
  ];

  for (const k of all) {
    await db.runAsync(
      `INSERT OR IGNORE INTO kana (character, romaji, type, group_name) VALUES (?, ?, ?, ?)`,
      [k.char, k.romaji, k.type, k.group]
    );
  }
}

// ── 种子数据（基础单词 51 条） ───────────────────────────────

async function seedWords(db: SQLite.SQLiteDatabase): Promise<void> {
  type WordRow = [string, string, string, string, string, number, string, string | null, string | null];

  const words: WordRow[] = [
    ['一','いち','ichi','一、1','noun',1,'N5','いちにんです。','是一个人。'],
    ['二','に','ni','二、2','noun',1,'N5',null,null],
    ['三','さん','san','三、3','noun',1,'N5',null,null],
    ['今日','きょう','kyou','今天','noun',1,'N5','今日はいい天気です。','今天天气很好。'],
    ['明日','あした','ashita','明天','noun',1,'N5','明日また来ます。','明天再来。'],
    ['昨日','きのう','kinou','昨天','noun',1,'N5',null,null],
    ['今','いま','ima','现在','noun',1,'N5','今何時ですか。','现在几点？'],
    ['年','とし','toshi','年、岁','noun',1,'N5',null,null],
    ['私','わたし','watashi','我','noun',1,'N5','私は学生です。','我是学生。'],
    ['あなた','あなた','anata','你','noun',1,'N5',null,null],
    ['人','ひと','hito','人','noun',1,'N5','あの人は誰ですか。','那个人是谁？'],
    ['友達','ともだち','tomodachi','朋友','noun',1,'N5','友達と遊びます。','和朋友玩。'],
    ['先生','せんせい','sensei','老师','noun',1,'N5','先生はやさしいです。','老师很温柔。'],
    ['学生','がくせい','gakusei','学生','noun',1,'N5',null,null],
    ['学校','がっこう','gakkou','学校','noun',1,'N5','学校へ行きます。','去学校。'],
    ['家','いえ','ie','家','noun',1,'N5','家に帰ります。','回家。'],
    ['駅','えき','eki','车站','noun',1,'N5','駅はどこですか。','车站在哪里？'],
    ['店','みせ','mise','店','noun',1,'N5',null,null],
    ['病院','びょういん','byouin','医院','noun',1,'N5',null,null],
    ['ご飯','ごはん','gohan','米饭、饭','noun',1,'N5','ご飯を食べます。','吃饭。'],
    ['水','みず','mizu','水','noun',1,'N5','水をください。','请给我水。'],
    ['お茶','おちゃ','ocha','茶','noun',1,'N5',null,null],
    ['りんご','りんご','ringo','苹果','noun',1,'N5','りんごが好きです。','喜欢苹果。'],
    ['魚','さかな','sakana','鱼','noun',1,'N5',null,null],
    ['肉','にく','niku','肉','noun',1,'N5',null,null],
    ['本','ほん','hon','书','noun',1,'N5','本を読みます。','读书。'],
    ['車','くるま','kuruma','车','noun',1,'N5','車で行きます。','开车去。'],
    ['電話','でんわ','denwa','电话','noun',1,'N5',null,null],
    ['時計','とけい','tokei','钟表','noun',1,'N5',null,null],
    ['お金','おかね','okane','钱','noun',1,'N5',null,null],
    ['食べる','たべる','taberu','吃','verb',1,'N5','パンを食べます。','吃面包。'],
    ['飲む','のむ','nomu','喝','verb',1,'N5','水を飲みます。','喝水。'],
    ['行く','いく','iku','去','verb',1,'N5','学校へ行きます。','去学校。'],
    ['来る','くる','kuru','来','verb',1,'N5','友達が来ます。','朋友来了。'],
    ['見る','みる','miru','看','verb',1,'N5','テレビを見ます。','看电视。'],
    ['聞く','きく','kiku','听、问','verb',1,'N5','音楽を聞きます。','听音乐。'],
    ['話す','はなす','hanasu','说话','verb',1,'N5','日本語を話します。','说日语。'],
    ['書く','かく','kaku','写','verb',1,'N5','名前を書きます。','写名字。'],
    ['読む','よむ','yomu','读','verb',1,'N5','本を読みます。','读书。'],
    ['買う','かう','kau','买','verb',1,'N5','りんごを買います。','买苹果。'],
    ['起きる','おきる','okiru','起床','verb',1,'N5','七時に起きます。','7点起床。'],
    ['寝る','ねる','neru','睡觉','verb',1,'N5',null,null],
    ['働く','はたらく','hataraku','工作','verb',1,'N5',null,null],
    ['大きい','おおきい','ookii','大的','adj',1,'N5','大きい犬です。','是大狗。'],
    ['小さい','ちいさい','chiisai','小的','adj',1,'N5',null,null],
    ['新しい','あたらしい','atarashii','新的','adj',1,'N5','新しい本です。','是新书。'],
    ['古い','ふるい','furui','旧的','adj',1,'N5',null,null],
    ['好き','すき','suki','喜欢','adj',1,'N5','犬が好きです。','喜欢狗。'],
    ['嫌い','きらい','kirai','讨厌','adj',1,'N5',null,null],
    ['ありがとう','ありがとう','arigatou','谢谢','expr',1,'N5','ありがとうございます。','非常感谢。'],
    ['すみません','すみません','sumimasen','对不起、打扰','expr',1,'N5',null,null],
  ];

  for (const w of words) {
    await db.runAsync(
      `INSERT OR IGNORE INTO words
        (word, reading, romaji, meaning_zh, part_of_speech, difficulty, jlpt_level, example_jp, example_zh)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      w
    );
  }
}
