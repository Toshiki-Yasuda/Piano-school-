# ピアノ教室 統合Webシステム

HP + 予約システム + CMS を統合したピアノ教室向けWebサイトです。

## 概要

- **ホームページ**: 教室紹介、講師紹介、レッスン・料金、アクセス
- **予約システム**: カレンダーで空き枠確認・予約、LINE通知
- **ブログ**: microCMS連携によるブログ機能

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router), React, TypeScript
- **スタイリング**: Tailwind CSS
- **データベース**: Supabase (PostgreSQL)
- **CMS**: microCMS
- **通知**: LINE Messaging API
- **ホスティング**: Vercel（推奨）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、必要な値を設定します。

```bash
cp .env.example .env.local
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# microCMS
MICROCMS_SERVICE_DOMAIN=your_service_domain
MICROCMS_API_KEY=your_api_key

# LINE Messaging API
LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
LINE_USER_ID=teacher_line_user_id
```

### 3. データベースのセットアップ

Supabaseダッシュボードで `database/schema.sql` を実行します。

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

## デモモード

Supabase/microCMSを設定しなくても、デモデータで動作を確認できます。

- 予約システム: ダミーの空き枠が表示されます
- ブログ: サンプル記事が表示されます
- LINE通知: コンソールにログが出力されます

## ページ構成

| パス | 説明 |
|------|------|
| `/` | トップページ |
| `/about` | 教室紹介 |
| `/teacher` | 講師紹介 |
| `/lessons` | レッスン・料金 |
| `/access` | アクセス |
| `/blog` | ブログ一覧 |
| `/blog/[id]` | ブログ詳細 |
| `/reservation` | 予約ページ |

## Supabaseの設定

### テーブル構成

- `time_slots`: 空き枠データ
  - `id`, `date`, `start_time`, `end_time`, `is_available`
- `reservations`: 予約データ
  - `id`, `slot_id`, `student_name`, `student_email`, `student_phone`, `parent_name`, `message`, `status`

### 空き枠の追加

Supabaseダッシュボードから直接追加するか、管理画面（別途実装）から追加します。

```sql
INSERT INTO time_slots (date, start_time, end_time) VALUES
    ('2025-02-01', '14:00', '14:45'),
    ('2025-02-01', '15:00', '15:45');
```

## microCMSの設定

### APIスキーマ

`blog` エンドポイントに以下のフィールドを設定：

| フィールドID | 表示名 | 種類 |
|-------------|--------|------|
| title | タイトル | テキストフィールド |
| content | 本文 | リッチエディタ |
| excerpt | 概要 | テキストエリア |
| thumbnail | サムネイル | 画像 |
| category | カテゴリ | コンテンツ参照（categories） |

### カテゴリAPI

`categories` エンドポイント：

| フィールドID | 表示名 | 種類 |
|-------------|--------|------|
| name | カテゴリ名 | テキストフィールド |

## LINE通知の設定

1. [LINE Developers](https://developers.line.biz/) でMessaging APIチャンネルを作成
2. チャンネルアクセストークンを発行
3. 通知を受け取る先生のLINE User IDを取得
4. 環境変数に設定

## 本番デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリをVercelに連携
2. 環境変数を設定
3. デプロイ

### その他のホスティング

```bash
npm run build
npm start
```

## カスタマイズ

### デザインの変更

- `tailwind.config.ts`: カラーパレット、フォントの設定
- `src/app/globals.css`: グローバルスタイル

### コンテンツの変更

- 各ページのテキストは `src/app/*/page.tsx` で直接編集
- 本番では実際の教室情報に差し替えてください

## ライセンス

MIT

---

作成: AY Consulting
「愛とAIで、あなたの変革を支援します」
