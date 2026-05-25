# Phase 3 — Shared Packages

---

## EMX-AUTH-010 — Create packages/database with Supabase client and generated types

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

---

## EMX-AUTH-011 — Extend packages/config with Supabase environment schemas

| Field | Value |
|-------|-------|
| **Type** | Task |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 2 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | config, zod |
| **Depends on** | EMX-AUTH-003 |
| **Blocks** | EMX-AUTH-010, EMX-AUTH-013 |

### Description

Extend existing Zod env validation in `packages/config` for all Supabase and auth-related variables per service.

### Acceptance criteria

- [ ] `auth-service-env.ts` includes: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `REDIS_URL`
- [ ] `api-gateway-env.ts` includes: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_JWT_SECRET`, `REDIS_URL`, `AUTH_SERVICE_URL`
- [ ] Fail-fast on missing/invalid env at bootstrap
- [ ] `infra/docker/.env.example` lists all keys with descriptions
- [ ] No secrets in example file

### Technical notes

- Reuse `createEnvSchema` and `parseEnv` from existing `env.ts`
- JWT secret used for local verification if JWKS not used

### Tasks

- [ ] Update env schemas
- [ ] Update docker-compose env passthrough for local dev

---

## EMX-AUTH-012 — Create packages/auth with JWT utilities and shared types

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | jwt, shared-package |
| **Depends on** | EMX-AUTH-011 |
| **Blocks** | EMX-AUTH-013, EMX-AUTH-018, EMX-AUTH-022 |

### Description

Shared auth utilities for gateway and auth-service: JWT verification (JWKS or secret), typed `AuthUser` context, error types, and claim parsing. Single implementation — no copy-paste between services.

### Acceptance criteria

- [ ] `packages/auth/` exported API:
  - `verifyAccessToken(token, config): Promise<AuthUser>`
  - `AuthUser` type: `userId`, `email`, `tenantId?`, `role?`
  - `AuthError` discriminated union (expired, invalid, missing)
- [ ] Supports Supabase JWT structure (`sub`, `email`, custom claims)
- [ ] Unit tests for token parsing edge cases
- [ ] Used by both api-gateway and auth-service

### Technical notes

- Prefer `jose` library for JWKS verification against Supabase issuer
- Cache JWKS keys with TTL

### Tasks

- [ ] Scaffold `@emx/auth` package
- [ ] Implement verify + types
- [ ] Add tests in package
