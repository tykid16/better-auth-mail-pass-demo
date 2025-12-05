# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js (App Router) + Better Auth + Drizzle + PostgreSQL。`/login` と `/register` で email/password 認証を提供。Better Auth React クライアントを利用。

## Development Commands

### Running the application
```bash
bun dev                    # http://localhost:3000
```

### Database operations
```bash
bunx drizzle-kit generate  # Generate migration files
bunx drizzle-kit migrate   # Run migrations
bunx drizzle-kit studio    # Drizzle Studio
```

### Better Auth CLI
```bash
bunx @better-auth/cli@latest generate --config ./better-auth.config.ts --output ./src/db/schema.ts
```

## Architecture

### Authentication Setup

- サーバー: `src/lib/auth.ts` で Better Auth + Drizzle adapter を設定
- API ルート: `src/app/api/auth/[...all]/route.ts` で `toNextJsHandler(auth)` を公開
- クライアント: `src/lib/auth-client.ts` (`createAuthClient`) をフロントで利用
- 画面: `/login`（サインイン）, `/register`（name/email/password でサインアップ）

### Database Configuration

- ORM: Drizzle + postgres-js
- スキーマ: `./src/db/schema.ts`（Better Auth CLI で生成）
- マイグレーション: `./drizzle`
- DB クライアント: `src/db/client.ts`（max: 1）

### Environment Variables

- `DATABASE_URL`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`

### Project Structure

```
src/
  app/
    api/auth/[...all]/route.ts
    login/page.tsx
    register/page.tsx
    layout.tsx
    page.tsx
    globals.css
  db/
    client.ts
    schema.ts
  lib/
    auth.ts
    auth-client.ts
```

### Tech Stack

- Next.js (App Router), React 19, TypeScript strict
- Tailwind CSS v4
- Path alias: `@/*` -> `./src/*`
