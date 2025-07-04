# AGENT.md - Tweet Responder Project

## Commands
- **Dev**: `npm run dev` (with turbopack)
- **Build**: `npm run build` 
- **Test**: `npm test` (Jest)
- **Lint**: `npm run lint`
- **Single test**: `npm test -- --testNamePattern="test name"`

## Architecture
- **Next.js 15** app with Pages Router
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth with Google OAuth + JWT sessions
- **UI**: Radix UI + Tailwind CSS + shadcn/ui components
- **APIs**: `/api/generateReply` (main tweet processing), `/api/createIssue` (GitHub feedback)

## Code Style
- **TypeScript strict mode** with ES2017 target
- **Imports**: Use `@/*` aliases (`@/components`, `@/lib`, `@/pages`)
- **Utilities**: Use `cn()` from `@/lib/utils` for className merging
- **Components**: Radix UI patterns with CVA for variants
- **Props**: Extend React component props with `&` for composition
- **Database**: Prisma models with cuid() IDs and proper relations

## Rules
- See `.cursor/rules/` for specific task-based rules
- ESLint errors ignored in builds (nextConfig)
- Test environment: jsdom with custom module mapping
