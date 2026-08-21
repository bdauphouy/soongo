# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project state

This is a freshly scaffolded `create-next-app` project (Next.js 16.3.1, App Router, React 19, TypeScript, Tailwind CSS v4). Aside from the default boilerplate in `app/`, no application code has been written yet.

## Commands

Package manager is pnpm (see `packageManager` in package.json).

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)

There is no test setup in this repo yet.

## Structure

- `app/` — App Router routes; `app/layout.tsx` is the root layout, `app/page.tsx` the home page, `app/globals.css` the Tailwind entry point.
- `public/` — static assets served from `/`.
- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Fonts are loaded via `next/font/google` (Geist Sans/Mono) and exposed as CSS variables in the root layout.

## Next.js version note

Per `AGENTS.md`, this Next.js version (16.3.1) diverges from what training data assumes. Before writing App Router code, check `node_modules/next/dist/docs/01-app/` for current APIs and conventions rather than relying on memorized Next.js behavior — e.g. `app/layout.tsx` already uses a generated `LayoutProps<"/">` type instead of a hand-written props interface.
