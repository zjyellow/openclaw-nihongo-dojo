# Nihongo App - 接口定义文档

> MVP 阶段：纯本地 SQLite，通过 Android ContentProvider / Repository 模式暴露数据
> 前端通过 Repository 接口调用，无需 HTTP，未来可无缝迁移至远程 API

---

## 数据层架构

```
Android App
    └── UI Layer (Compose/View)
            └── ViewModel
                    └── Repository (接口)
                            └── LocalDataSource (SQLite / Room)
```

---

## Repository 接口定义（Kotlin 风格伪代码）

### KanaRepository

```kotlin
interface KanaRepository {

    /**
     * 获取所有假名
     * @return List<Kana>
     */
    suspend fun getAllKana(): List<Kana>

    /**
     * 按类型获取假名
     * @param type "hiragana" | "katakana"
     * @return List<Kana>
     */
    suspend fun getKanaByType(type: String): List<Kana>

    /**
     * 按行获取假名
     * @param type   "hiragana" | "katakana"
     * @param group  "a-row" | "ka-row" | ... | "n"
     * @return List<Kana>
     */
    suspend fun getKanaByGroup(type: String, group: String): List<Kana>

    /**
     * 按 ID 获取单个假名
     */
    suspend fun getKanaById(id: Int): Kana?
}
```

#### Kana 数据模型

| 字段        | 类型    | 说明                        |
|-------------|---------|----------------------------|
| id          | Int     | 主键                        |
| character   | String  | 假名字符（あ / ア）         |
| romaji      | String  | 罗马音（a / ka）            |
| type        | String  | "hiragana" \| "katakana"   |
| groupName   | String  | 所在行（a-row / ka-row...） |
| strokeOrder | String? | 笔顺 JSON（后期）           |
| audioFile   | String? | 音频路径（后期）            |

---

### WordRepository

```kotlin
interface WordRepository {

    /**
     * 获取全部单词
     */
    suspend fun getAllWords(): List<Word>

    /**
     * 按难度获取单词
     * @param difficulty 1=入门 2=初级 3=中级
     */
    suspend fun getWordsByDifficulty(difficulty: Int): List<Word>

    /**
     * 按 JLPT 等级获取单词
     * @param level "N5" | "N4" | "N3" | "N2" | "N1"
     */
    suspend fun getWordsByJlpt(level: String): List<Word>

    /**
     * 搜索单词（支持日语 / 中文 / 罗马音模糊匹配）
     * @param query 搜索关键词
     */
    suspend fun searchWords(query: String): List<Word>

    /**
     * 按 ID 获取单词详情
     */
    suspend fun getWordById(id: Int): Word?

    /**
     * 获取随机单词（用于测验）
     * @param count     数量
     * @param difficulty 可选难度过滤
     */
    suspend fun getRandomWords(count: Int, difficulty: Int? = null): List<Word>
}
```

#### Word 数据模型

| 字段          | 类型    | 说明                         |
|---------------|---------|------------------------------|
| id            | Int     | 主键                         |
| word          | String  | 日语单词（汉字/假名）        |
| reading       | String  | 假名读音                     |
| romaji        | String  | 罗马音                       |
| meaningZh     | String  | 中文释义                     |
| partOfSpeech  | String? | noun/verb/adj/adv/expr       |
| difficulty    | Int     | 1=入门 2=初级 3=中级         |
| jlptLevel     | String? | N5/N4/N3/N2/N1              |
| exampleJp     | String? | 日语例句                     |
| exampleZh     | String? | 例句中文翻译                 |
| audioFile     | String? | 音频路径（后期）             |

---

### ProgressRepository（学习进度，预留）

```kotlin
interface ProgressRepository {

    /**
     * 记录一次答题结果
     */
    suspend fun recordReview(itemType: String, itemId: Int, correct: Boolean)

    /**
     * 获取今日到期复习项
     * （SRS 算法：简单间隔重复）
     */
    suspend fun getDueItems(): List<ProgressItem>

    /**
     * 获取单个条目的学习进度
     */
    suspend fun getProgress(itemType: String, itemId: Int): ProgressItem?

    /**
     * 获取总体统计
     */
    suspend fun getStats(): LearningStats
}
```

#### LearningStats 数据模型

| 字段              | 类型 | 说明         |
|-------------------|------|--------------|
| totalKana         | Int  | 假名总数     |
| masteredKana      | Int  | 已掌握假名数 |
| totalWords        | Int  | 单词总数     |
| masteredWords     | Int  | 已掌握单词数 |
| todayReviewCount  | Int  | 今日复习数   |
| streakDays        | Int  | 连续学习天数 |

---

## 错误处理约定

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String, val cause: Throwable? = null) : Result<Nothing>()
}
```

所有 Repository 方法返回 `Result<T>`，UI 层统一处理。

---

## 数据库版本管理

| 版本 | 变更说明          |
|------|-------------------|
| 1    | 初始版本（MVP）   |
| 2    | 预留：音频/笔顺   |
| 3    | 预留：用户账号同步 |

---

## 文件清单

```
backend/
├── schema.sql        # 数据库表结构
├── seed_kana.sql     # 假名初始数据（92条）
├── seed_words.sql    # 基础单词初始数据（50条）
└── API.md            # 本文档（接口规范）
```
