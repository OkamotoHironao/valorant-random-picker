---
name: github-operation-rules
description: VALORANT Random Picker プロジェクトにおける GitHub 運用・変更ルールを定義するスキル
version: 1.0.0
---

# GitHub Operation Rules Skill

## When to use

- コードを新規作成・修正したとき
- コミット・ブランチ作成・PR作成を行う前
- リポジトリ構成やファイル配置に迷ったとき

---

## Core Principles

- このリポジトリは **MVP ver1 を最速で安定リリースするためのもの**である
- 将来拡張よりも **現在の完成度とシンプルさを最優先**する
- 「後で使うかもしれない」コード・設定・ファイルは置かない

---

## Branch Rules

### Allowed Branches

- `main` : 常にデプロイ可能な状態
- `feature/*` : 単一目的の作業ブランチのみ

### Prohibited

- 長期間生き続けるブランチ
- ver2 以降を見越した先行ブランチ

---

## Commit Rules

### One Commit = One Purpose

- 1コミットでやってよいことは **1つだけ**
- UI修正とロジック修正を同時に行わない

### Commit Message Format

```
type: 変更内容を簡潔に書く
```

#### Allowed types

- `feat:` 機能追加（ver1のMustHaveに限る）
- `fix:` バグ修正
- `chore:` 構成・設定・リファクタリング
- `docs:` ドキュメントのみの変更

#### Examples

```
feat: エージェントを完全ランダムで選択する処理を追加
fix: スマホ表示時にボタンがはみ出る問題を修正
docs: READMEに利用手順を追記
```

---

## File Change Rules

### Allowed

- ver1 の MustHave を直接満たすコード
- UI 崩れ修正・軽微な改善
- README / 設計ドキュメントの更新

### Prohibited

- ver2 以降の機能に関するコード
- 未使用ファイル・コメントアウトコード
- 仮実装・TODO前提のコード
- 「将来のため」の設定ファイル追加

---

## Pull Request Rules（PRを使う場合）

### PRを作る前のチェック

- この変更は **ver1 の Definition of Done に必要か？**
- 1クリック操作を壊していないか？
- スマホUIを複雑にしていないか？

### PR Description に必ず書くこと

- 何を達成したか（1文）
- ver1 のどの MustHave / DoD に対応するか

---

## Decision Rules（迷ったとき）

- MVPに直接関係しない → **やらない**
- 仕様として明文化されていない → **やらない**
- 説明が長くなる変更 → **やらない**
- 「便利そう」「きれいそう」 → **やらない**

---

## Notes

- このスキルは **system prompt より下位の具体運用ルール**である
- system prompt や MVP 定義と矛盾する場合は、そちらを優先する