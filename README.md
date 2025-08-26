# Tic Tic Pou – Website

A modern web platform for **Tic Tic Pou**, a Brazilian circle game where players choose character classes with unique abilities and battle in rhythmic rounds. This site showcases the game’s rules, classes, actions, and official match rankings while providing user profiles and authentication.

## ✨ Key Features

- **Landing Page** – High-level overview of the game with dark orange/black theme.
- **Classes Explorer** – Grid view of every class with expandable details.
- **Actions Reference** – Searchable list of all in-game actions.
- **Game Modes** – Documentation for every mode (Campaign, Team, Jo-Ken-Po, etc.).
- **Official Matches** – Ambassadors can record matches; results feed the ELO-based ranking.
- **Player Ranking** – Dynamic leaderboard driven by match data.
- **Profiles** – Users can customise avatar, display name, favourite class & mode.

## 🛠 Tech Stack

| Layer            | Technology |
| ---------------- | ---------- |
| Framework        | Next.js 15 (App Router) |
| Styling & UI     | Tailwind CSS v4 + Shadcn/ui |
| Database         | Neon PostgreSQL (via Drizzle ORM) |
| Auth             | Stack Auth (`@stackframe/stack`) |
| Tooling          | pnpm, Turbopack, ESLint, TypeScript |

## 🚀 Quick Start

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment variables**

   Copy `.env.example` (if present) to `.env.local` and fill in:

   - `DATABASE_URL` – Neon connection string
   - `NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`, `STACK_SECRET_SERVER_KEY` – credentials from Stack Auth

3. **Run the dev server**

   ```bash
   pnpm run dev
   ```

   The site will be available at http://localhost:3000.

## 🧰 Development Helpers

Leverage the following AI tools while working on this project:

- **Playwright MCP** – browser testing automation.
- **Neon MCP** – create projects, tables, and run queries.
- **Claude Code** – boostrap big features, easy fixes
- **Cursor** – for more fine-grained codebase changes

---

Built with ❤️ for the Tic Tic Pou community.