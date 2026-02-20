# 🎌 openclaw-nihongo-dojo

> A Japanese learning app built entirely by [OpenClaw](https://github.com/openclaw/openclaw) AI Agents working as a team.

📖 [中文文档 README_zh.md](./README_zh.md)

---

## Screenshots

| Home | Learn | Quiz | Result |
|------|-------|------|--------|
| ![Home](docs/screenshots/home.png) | ![Learn](docs/screenshots/learn.png) | ![Quiz](docs/screenshots/quiz.png) | ![Result](docs/screenshots/result.png) |

---

## Overview

**Nihongo Dojo** is a Japanese learning app for Chinese-speaking beginners, focusing on Kana (Hiragana / Katakana) and basic vocabulary study and quizzes.

This project was developed end-to-end by a multi-agent OpenClaw team:
- **Agent-PM** — Project planning & task coordination
- **Agent-Backend** — Database design & Repository interfaces
- **Agent-Frontend** — React Native UI development
- **Agent-QA** — Test planning & quality assurance

---

## Features

- 📖 **Learn Mode** — Flashcard-style display of Kana and vocabulary with tap-to-flip
- 🧪 **Quiz Mode** — Multiple-choice quizzes with instant feedback
- 📊 **Results** — Score summary and accuracy stats
- 🗃️ **Offline-first** — SQLite local storage, no network required (MVP)
- 🔤 **Coverage** — Hiragana & Katakana (92 chars), basic vocabulary (50+ words, JLPT N5)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React Native + Expo |
| Language | TypeScript |
| Navigation | React Navigation |
| Local DB | SQLite (expo-sqlite) |
| Data Layer | Repository Pattern |

---

## Project Structure

```
nihongo-app/
├── frontend/               # React Native app
│   ├── src/
│   │   ├── screens/        # HomeScreen / LearnScreen / QuizScreen / ResultScreen
│   │   ├── navigation/     # Route configuration
│   │   ├── db/             # SQLite Repository
│   │   └── data/           # Data service layer
│   └── App.tsx             # App entry point
├── backend/                # DB schema & API spec
│   ├── schema.sql          # Table definitions
│   ├── seed_kana.sql       # Kana seed data (92 records)
│   ├── seed_words.sql      # Vocabulary seed data (50 records)
│   └── API.md              # Repository interface docs
└── tests/
    └── MVP-TestPlan.md     # MVP test plan
```

---

## Getting Started

```bash
# Clone the repo
git clone git@github.com:zjyellow/openclaw-nihongo-dojo.git
cd openclaw-nihongo-dojo/frontend

# Install dependencies
npm install

# Start dev server
npm start

# Run on Android
npm run android
```

---

## Roadmap

- [x] Kana learning & quiz (MVP)
- [x] Basic vocabulary (50 words, JLPT N5)
- [ ] Audio pronunciation
- [ ] Card flip animation
- [ ] Spaced Repetition System (SRS)
- [ ] Remote API integration
- [ ] iOS support

---

## Built with OpenClaw

This project was developed by an AI Agent team powered by **OpenClaw** — an open-source framework for multi-agent task execution.

- 🔗 [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- 💬 [OpenClaw Discord](https://discord.com/invite/clawd)

---

## License

MIT
