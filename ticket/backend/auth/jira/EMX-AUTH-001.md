# EMX-AUTH-001: Provision Supabase projects and environment separation

> **Jira Key:** EMX-AUTH-001  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/01-foundation.md](../tickets/01-foundation.md)

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
