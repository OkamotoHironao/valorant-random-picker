# Tech Stack Decision

本ドキュメントでは、本プロジェクトにおける技術選定理由を整理する。
選定基準は **ポートフォリオとしての評価性** と **実務を意識した設計** の両立である。

---

## Frontend

### Next.js (App Router)

**選定理由**

* React ベースで業界標準
* App Router による Server / Client Component の明確な分離
* SEO・初期表示性能を考慮可能

**本プロジェクトでの使いどころ**

* UI とロジックをフロントエンドに集約
* ランダムピック処理を即時実行

---

## Backend / DB

### Supabase (PostgreSQL)

**選定理由**

* PostgreSQL をベースとした本番品質の DB
* API / 認証 / RLS を一体で扱える
* 個人開発でも運用コストが低い

**本プロジェクトでの使いどころ**

* マスターデータ管理
* ログ・分析用途

---

## Hosting

### Vercel

**選定理由**

* Next.js との親和性が高い
* デプロイが容易
* Edge 対応

---

## DB Usage Policy

* UX に影響する処理には DB を介さない
* ランダム処理はフロントエンド完結
* DB は補助的・分析用途に限定

---

## Portfolio Perspective

* モダンな技術スタックの理解を示せる
* 設計意図を言語化できる
* 実務に近い意思決定プロセスをアピール可能
