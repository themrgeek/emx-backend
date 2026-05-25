# EMX-AUTH-002: Integrate Supabase CLI and local development workflow

> **Jira Key:** EMX-AUTH-002  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/01-foundation.md](../tickets/01-foundation.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | supabase, dx, docker |
| **Depends on** | EMX-AUTH-001 |
| **Blocks** | EMX-AUTH-004, EMX-AUTH-024 |

### Description

Add `supabase/` directory to the monorepo with CLI config, link to dev project, and document local workflow (`supabase start`, `supabase db reset`, `supabase migration up`). Integrate with existing Docker Compose where appropriate.

### Acceptance criteria

- [ ] `supabase/config.toml` exists at repo root (or `infra/supabase/`)
- [ ] `supabase/migrations/` directory initialized
- [ ] `supabase link` documented for team onboarding
- [ ] `pnpm` script or Makefile target: `db:reset`, `db:migrate`, `db:types`
- [ ] README section: local Supabase vs remote dev project
- [ ] CI can run migrations against ephemeral/staging DB (prep for EMX-AUTH-028)

### Technical notes

- Keep migrations as **source of truth** — no manual prod schema edits
- Generated types output target: `packages/database/src/generated/` (EMX-AUTH-010)

### Tasks

- [ ] Run `supabase init`
- [ ] Add npm/pnpm scripts at root `package.json`
- [ ] Document port conflicts with Redis/auth-service in docker-compose
