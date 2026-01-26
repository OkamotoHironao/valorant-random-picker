# Database Design

本ドキュメントでは、VALORANT ランダムピック MVP におけるデータベース設計を定義する。
本プロジェクトでは、**ユーザー体験に影響する処理はフロントエンドで完結**させ、
データベースは主に **マスターデータ管理およびログ用途** に限定して利用する。

---

## Design Policy

* ランダムピック処理はフロントエンドで完結
* DB アクセスは初回ロードまたはログ保存時のみ
* DB 障害時でもサービス継続可能な設計

---

## Tables Overview

| Table     | Purpose       |
| --------- | ------------- |
| agents    | エージェントマスターデータ |
| pick_logs | ランダムピック結果ログ   |

---

## agents

| Column     | Type      | Description |
| ---------- | --------- | ----------- |
| id         | uuid (PK) | エージェントID    |
| name       | text      | エージェント名     |
| role       | text      | ロール         |
| is_active  | boolean   | 使用可否        |
| created_at | timestamp | 作成日時        |

### Notes

* 更新頻度が低いためキャッシュ前提
* フロントエンドにフォールバックデータを保持

---

## pick_logs

| Column        | Type      | Description |
| ------------- | --------- | ----------- |
| id            | uuid (PK) | ログID        |
| picked_agents | jsonb     | ピック結果       |
| party_size    | integer   | パーティー人数     |
| created_at    | timestamp | 実行日時        |

### Notes

* 非同期保存
* 分析・統計用途を想定

---

## Future Extensions

* user_id カラム追加（認証導入時）
* マップ別・ロール制限対応
