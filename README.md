# VALORANT Random Agent Picker

VALORANT をパーティーで遊ぶ際に、
毎回同じエージェントにならないよう **ランダムでピックを決定する支援ツール**です。
完全ランダム以外にも、ロールを考慮したランダムピックも簡単に出来ます。

操作は即時、考えるストレスを減らすことを目的に  
UX を最優先したシンプルな設計で実装しています。

本プロジェクトは **就職用ポートフォリオ** も兼ねており、
実装だけでなく **技術選定・設計判断** も重視しています。

---

## Features

* エージェントのランダムピック
* ロールを考慮したピック
* パーティー人数に応じた選択
* ピック結果のログ保存（UX 非阻害）

---

## Architecture / Design Documents

本プロジェクトの設計意図・技術判断は以下のドキュメントにまとめています。

* [Architecture Overview](docs/architecture.md)
* [Database Design](docs/database-design.md)
* [Tech Stack Decision](docs/tech-stack-decision.md)

---

## Tech Stack

* Frontend: Next.js (App Router)
* Backend / DB: Supabase (PostgreSQL)
* Hosting: Vercel

---

## Design Policy (Summary)

* **UX に影響する処理はフロントエンドで完結**
* ランダムピック処理に DB レイテンシを持ち込まない
* DB はマスターデータ管理およびログ用途に限定
* DB 障害時でも最低限の機能を維持可能な設計

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Future Plans

* ピック履歴の可視化
* 統計情報の表示（ロール出現率など）
* ユーザー認証の導入
* パーティー共有機能

---

## Motivation

通常のプレイとは異なる制約を設けることで、
パーティープレイ時のコミュニケーションや戦略性を高めることを目的としています。

同時に、個人開発においても
**設計意図を言語化し、説明できること** を重視しました。
