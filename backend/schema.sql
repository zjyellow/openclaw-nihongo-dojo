-- ============================================================
-- Nihongo App - SQLite Database Schema
-- MVP Phase: Local-only, no server required
-- ============================================================

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- ------------------------------------------------------------
-- Table: kana (假名表)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS kana (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    character   TEXT    NOT NULL UNIQUE,   -- 假名字符，如 あ / ア
    romaji      TEXT    NOT NULL,          -- 罗马音，如 a / ka
    type        TEXT    NOT NULL           -- 'hiragana' | 'katakana'
                CHECK(type IN ('hiragana', 'katakana')),
    group_name  TEXT    NOT NULL,          -- 行名，如 'a-row' / 'ka-row'
    stroke_order TEXT,                     -- 笔顺 JSON（后期扩展用）
    audio_file  TEXT,                      -- 音频资源路径（后期扩展用）
    created_at  INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_kana_type ON kana(type);
CREATE INDEX IF NOT EXISTS idx_kana_romaji ON kana(romaji);

-- ------------------------------------------------------------
-- Table: words (单词表)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS words (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    word            TEXT    NOT NULL UNIQUE,  -- 日语单词（汉字或假名）
    reading         TEXT    NOT NULL,          -- 假名读音，如 りんご
    romaji          TEXT    NOT NULL,          -- 罗马音，如 ringo
    meaning_zh      TEXT    NOT NULL,          -- 中文释义
    part_of_speech  TEXT,                      -- 词性：noun/verb/adj/adv/expr
    difficulty      INTEGER NOT NULL DEFAULT 1 -- 1=入门 2=初级 3=中级
                CHECK(difficulty BETWEEN 1 AND 3),
    jlpt_level      TEXT                       -- N5/N4/N3/N2/N1（可为空）
                CHECK(jlpt_level IN ('N5','N4','N3','N2','N1') OR jlpt_level IS NULL),
    example_jp      TEXT,                      -- 例句（日语）
    example_zh      TEXT,                      -- 例句（中文翻译）
    audio_file      TEXT,                      -- 音频资源路径
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_words_difficulty ON words(difficulty);
CREATE INDEX IF NOT EXISTS idx_words_jlpt ON words(jlpt_level);

-- ------------------------------------------------------------
-- Table: user_progress (学习进度表，预留)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_progress (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    item_type       TEXT    NOT NULL CHECK(item_type IN ('kana', 'word')),
    item_id         INTEGER NOT NULL,
    review_count    INTEGER NOT NULL DEFAULT 0,
    correct_count   INTEGER NOT NULL DEFAULT 0,
    last_reviewed   INTEGER,                   -- Unix timestamp
    next_review     INTEGER,                   -- SRS 下次复习时间
    mastered        INTEGER NOT NULL DEFAULT 0 CHECK(mastered IN (0,1)),
    created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    UNIQUE(item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_next_review ON user_progress(next_review);
