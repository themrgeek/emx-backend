# EMX-AUTH-010: Create packages/database with Supabase client and generated types

> **Jira Key:** EMX-AUTH-010  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/04-shared-packages.md](../tickets/04-shared-packages.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | monorepo, supabase, typescript |
| **Depends on** | EMX-AUTH-004 |
| **Blocks** | EMX-AUTH-013, EMX-AUTH-028 |

### Description

Add `@emx/database` package: Supabase client factory, repository interfaces, and TypeScript types generated from Postgres schema. Services import this package — no duplicated DB wiring.

### Acceptance criteria

- [ ] `packages/database/` with build, dev, lint, typecheck scripts
- [ ] `createSupabaseClient(config)` — supports anon and service role modes
- [ ] `supabase gen types typescript` output committed to `src/generated/database.types.ts`
- [ ] Root script: `pnpm db:types` regenerates types from linked project
- [ ] Repository interfaces: `ProfileRepository`, etc. (implementations in services)
- [ ] No `process.env` access — config injected from `@emx/config`

### Technical notes

- Consider `@supabase/supabase-js` v2
- Future: optional Kysely/Drizzle layer if PostgREST bypass needed for complex queries

### Tasks

- [ ] Scaffold package with tsconfig extending `@emx/typescript-config`
- [ ] Add client factory and export types
- [ ] Wire into auth-service and api-gateway dependencies
