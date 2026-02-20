# 日语学习 App - Frontend

MVP 版本的日语学习应用前端代码。

## 技术栈

- **框架**: React Native + Expo
- **语言**: TypeScript
- **导航**: React Navigation
- **动画**: React Native Reanimated
- **音频**: Expo AV

## 项目结构

```
frontend/
├── App.tsx                 # 应用入口
├── src/
│   ├── navigation/         # 导航配置
│   │   └── index.tsx
│   ├── screens/            # 页面组件
│   │   ├── HomeScreen.tsx   # 首页（选择学习内容）
│   │   ├── LearnScreen.tsx  # 学习页（卡片展示）
│   │   ├── QuizScreen.tsx   # 测验页（选择题）
│   │   └── ResultScreen.tsx # 结果页（得分反馈）
│   ├── components/         # 可复用组件（待扩展）
│   ├── data/              # Mock 数据
│   │   └── mockData.ts
│   └── types/             # TypeScript 类型定义
│       └── index.ts
└── babel.config.js        # Babel 配置

```

## 功能页面

### 1. 首页 (HomeScreen)
- 选择学习内容：平假名 / 片假名 / 单词
- 彩色卡片式按钮，视觉友好

### 2. 学习页 (LearnScreen)
- 卡片展示：字符 + 读音（点击翻转）
- 进度条显示
- 上一个/下一个导航
- 可直接跳转到测验

### 3. 测验页 (QuizScreen)
- 多选题形式
- 即时反馈（正确/错误）
- 进度显示
- 5 道题一组

### 4. 结果页 (ResultScreen)
- 分数展示（圆形进度）
- 正确/错误统计
- 再来一次 / 返回首页

## 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 运行 Android 版本
npm run android
```

## Mock 数据

当前使用本地 mock 数据：
- 平假名：15 个基础字符（元音 + K/S 行）
- 片假名：15 个基础字符（元音 + K/S 行）
- 单词：10 个常用词

## 待后端对接

等后端 API 准备好后，替换 `src/data/mockData.ts` 中的数据获取逻辑。

API 接口需求：
- `GET /api/kana?type=hiragana|katakana` - 获取假名列表
- `GET /api/words` - 获取单词列表
- `GET /api/quiz?type=...` - 获取测验题目

## 下一步

- [ ] 添加音频播放功能
- [ ] 添加卡片翻转动画
- [ ] 优化 UI 细节
- [ ] 对接后端 API
- [ ] 添加学习进度保存