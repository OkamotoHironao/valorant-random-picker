# Architecture Overview

本ドキュメントでは、VALORANT ランダムピック MVP の全体アーキテクチャを簡潔に示す。 本プロジェクトは **UX を最優先** とし、処理責務をフロントエンド中心に設計している。

---

## System Overview

* Frontend: Next.js (App Router)
* Backend: Supabase (PostgreSQL / API)
* Hosting: Vercel

---

## Architecture Diagram (Conceptual)

```
[ Browser ]
     |
     v
[ Next.js Frontend ]
     |
     | (初回ロード時のみ)
     v
[ Supabase API ] ---- [ PostgreSQL ]
```

---

## Responsibility Split

### Frontend

* エージェント一覧の保持（初回取得後は state 管理）
* ランダムピックロジック
* UI / UX 制御

### Backend / DB

* エージェントマスターデータの提供
* ランダムピック結果のログ保存
* 将来的な分析・統計用途

---

## Data Flow

1. ユーザーがページにアクセス
2. 初回ロード時にエージェント一覧を取得
3. フロントエンドの state に保持
4. ランダムピックはフロントエンドで即時実行
5. 結果を非同期でログ保存（失敗しても UX に影響なし）

---

## Design Intent

* DB レイテンシを UX に持ち込まない
* DB 障害時でも最低限の機能を維持
* MVP から段階的に拡張可能な構成
