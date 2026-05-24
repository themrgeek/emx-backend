# EMX-AUTH-011: Extend packages/config with Supabase environment schemas

> **Jira Key:** EMX-AUTH-011  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/04-shared-packages.md](../tickets/04-shared-packages.md)

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
