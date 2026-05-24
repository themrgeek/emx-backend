# Phase 0 — Foundation

---

## EMX-AUTH-001 — Provision Supabase projects and environment separation

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Highest |
| **Status** | To Do |
| **Story Points** | 3 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | supabase, infra, environments |
| **Blocks** | EMX-AUTH-002, EMX-AUTH-004, EMX-AUTH-007 |

### Description

Create separate Supabase projects for **development**, **staging**, and **production**. Document project URLs, anon keys, and service role keys (stored only in Doppler — see EMX-AUTH-003). Align with EmX environment separation standards.

### Acceptance criteria

- [ ] Three Supabase projects exist: `emx-dev`, `emx-staging`, `emx-prod`
- [ ] Each project has Auth, Postgres, and Edge Functions enabled
- [ ] Connection pooling (Supavisor) enabled for server-side Node services
- [ ] Project reference IDs documented in internal runbook (not committed to git)
- [ ] Staging and prod have PITR/backups enabled per Supabase plan
- [ ] Local dev can target dev project or Supabase CLI local stack (decision documented)

### Technical notes

- Use Supabase **organization** structure if multiple products are planned
- Never commit `SUPABASE_SERVICE_ROLE_KEY` to the repo
- Map to existing monorepo env pattern in `packages/config`

### Tasks

- [ ] Create Supabase org/projects
- [ ] Enable pooler; note transaction vs session mode for Fastify
- [ ] Write environment matrix (dev/staging/prod URLs and key names)

---

## EMX-AUTH-002 — Integrate Supabase CLI and local development workflow

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

---

## EMX-AUTH-003 — Configure Doppler secrets for auth and Supabase

| Field | Value |
|-------|-------|
| **Type** | Task |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 3 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | doppler, devops, secrets |
| **Depends on** | EMX-AUTH-001 |
| **Blocks** | EMX-AUTH-028, EMX-AUTH-029 |

### Description

Store all auth-related secrets in **Doppler** with configs per environment (`dev`, `stg`, `prd`). Wire GitHub Actions and Vercel (if frontend) to pull secrets at deploy time. Extend `packages/config` env schemas to validate required keys.

### Acceptance criteria

- [ ] Doppler project `emx-backend` (or equivalent) with configs: `dev`, `stg`, `prd`
- [ ] Secrets defined per service:
  - **auth-service:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `REDIS_URL`
  - **api-gateway:** `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_JWT_SECRET`, `REDIS_URL`
- [ ] `infra/docker/.env.example` updated with placeholder names only
- [ ] GitHub Actions uses Doppler CLI or OIDC integration
- [ ] Secret rotation procedure documented (service role, JWT secret)

### Technical notes

- Service role key **only** in auth-service and Edge Function env — never api-gateway or client
- Align with existing `parseEnv` + Zod pattern in `packages/config`

### Tasks

- [ ] Create Doppler configs and invite team
- [ ] Add `auth-service-env.ts` Supabase fields
- [ ] Add `api-gateway-env.ts` Supabase fields
- [ ] Document local dev: `doppler run -- pnpm dev`
