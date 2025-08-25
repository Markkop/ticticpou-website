# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm run dev` - Start development server with Turbopack. Always kill this after testing with Playright MCP.
- `pnpm run build` - Never run this.
- `pnpm run build:sandbox` - Build in sandbox mode
- `pnpm start` - Start production server
- `pnpm run clean` - Clean build artifacts (.next, .next-buildcheck, .turbo)
- `pnpm run lint` - Run ESLint
- `pnpm run tsc` - Run TypeScript compiler checks

**Important**: Never build this project unless explicitly asked to do so. Always run lint and tsc and fix all issues.

## Project Overview

This is a Next.js 15 website for "Tic Tic Pou" - a Brazilian circle game with character classes. The site features:

- **Authentication**: Stack Auth (@stackframe/stack) for user management
- **Database**: Neon PostgreSQL with Drizzle ORM
- **UI**: Tailwind CSS 4 with Shadcn/ui components
- **Routing**: Next.js 15 App Router

## Architecture

### Authentication Flow
- Stack Auth handles authentication with custom sign-in/up flows
- Auth routes configured at `/auth/signin` and `/auth/signup`
- Stack handler at `/handler/[...stack]/page.tsx`
- New users redirect to `/profile/setup` after signup
- Configuration in `stack.config.ts` and `stack.tsx`

### Database Schema
Located in `lib/db/schema.ts`:

- **Users**: Stack Auth integration with game-specific fields (elo, favoriteClass, isAmbassador)
- **Matches**: Game sessions with ambassador tracking
- **Match Participants**: Player participation with ELO changes
- **Classes/Actions/GameModes**: Static game data
- **Class Stats**: Aggregated statistics

Key relationships:
- Ambassadors can create official matches
- Participants track ELO before/after each match
- Classes have associated actions and interactions

### Game Concept
Based on the initial prompt in `instructions/initial-prompt.md`, the game is a Brazilian circle game where players choose character classes with special abilities. The site will feature:

- Landing page with game overview
- Class showcase with detailed information
- Game modes and rules explanation
- Actions reference with search
- Official match system with ELO ranking
- User profiles and statistics

### File Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable UI components (prefer Shadcn/ui)
- `/lib/db` - Database schema and connection
- `/lib/data` - Game data and server actions
- `/lib/utils.ts` - Utility functions
- `/drizzle` - Database migrations

## Development Guidelines

### Components
- Use Shadcn/ui components from `/components/ui/`
- Install new components with `npx shadcn@latest add [component]`
- Main navigation in `/components/navigation.tsx`

### Database
- Drizzle config in `drizzle.config.ts`
- Run migrations with `npx drizzle-kit push` (check Drizzle docs for exact commands)
- Connection configured via `DATABASE_URL` environment variable

### Styling
- Tailwind CSS 4 configuration
- Portuguese language set in layout (`lang="pt-BR"`)
- Dark theme preferred (orange and black color scheme mentioned in requirements)

### Authentication
- Server-side: Use `stackServerApp.getUser()` from `stack.tsx`
- Client-side: Use `useUser()` hook from Stack Auth
- Protected routes should check authentication and redirect as needed