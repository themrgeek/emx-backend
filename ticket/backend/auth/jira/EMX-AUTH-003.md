# EMX-AUTH-003: Configure Doppler secrets for auth and Supabase

> **Jira Key:** EMX-AUTH-003  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/01-foundation.md](../tickets/01-foundation.md)

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
