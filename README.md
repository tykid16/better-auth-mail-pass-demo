# better-auth demo app (Bun + Next.js + Drizzle + PostgreSQL)

Better Auth の email/password 認証を試すシンプルな App Router 構成です。ログインとサインアップを `/login` と `/register` に用意しています。

## セットアップ

### 1) 依存インストール
```bash
bun install
```

### 2) 環境変数
`.env.local` は commit 済みです（1Password CLI 経由で秘匿情報を参照）：
```env
DATABASE_URL="op://Private/my-auth-app/DATABASE_URL"

// Generate from here : https://www.better-auth.com/docs/installation#set-environment-variables
BETTER_AUTH_SECRET="op://Private/my-auth-app/BETTER_AUTH_SECRET"
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** `op://` 形式の参照は、実行時に `op run --env-file=.env.local -- <command>` で展開されます。

### 3) DB スキーマ生成 & マイグレーション
Better Auth のスキーマ生成と Drizzle マイグレーションを実行：
```bash
op run --env-file=.env.local -- bunx @better-auth/cli@latest generate --config ./better-auth.config.ts --output ./src/db/schema.ts
op run --env-file=.env.local -- bunx drizzle-kit generate
op run --env-file=.env.local -- bunx drizzle-kit migrate
```

### 4) 開発サーバー
```bash
op run --env-file=.env.local -- bun dev
# http://localhost:3000
```

## 画面
- `/login` : email + password でサインイン
- `/register` : name + email + password でサインアップ（`authClient.signUp.email` に name 必須）

## 主なファイル
- `src/lib/auth.ts` : Better Auth サーバー設定
- `src/lib/auth-client.ts` : Better Auth React クライアント
- `src/app/api/auth/[...all]/route.ts` : Better Auth API ハンドラー
- `src/app/login/page.tsx` : ログインフォーム
- `src/app/register/page.tsx` : サインアップフォーム

## よくあるハマりどころ
- `BETTER_AUTH_URL` や `NEXT_PUBLIC_APP_URL` の設定漏れでリダイレクトや Cookie が正しく動かない
- `authClient.signUp.email` で `name` の渡し忘れ（必須）
