# EMX-AUTH-030: Auth integration and E2E test suite

> **Jira Key:** EMX-AUTH-030  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/09-analytics-devops-qa.md](../tickets/09-analytics-devops-qa.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | testing, qa, e2e |
| **Depends on** | EMX-AUTH-015, EMX-AUTH-017, EMX-AUTH-018, EMX-AUTH-020, EMX-AUTH-022, EMX-AUTH-029 |
| **Blocks** | none (epic completion gate) |

### Description

Comprehensive test suite covering the full auth flow: signup → verify → login → `/v1/me` → refresh → logout → RBAC denial. Runs in CI against test Supabase project.

### Acceptance criteria

- [ ] Test framework: Vitest or Node test runner with supertest/fetch against Fastify
- [ ] Test scenarios:
  - [ ] Sign up new user (Supabase Auth API or service endpoint)
  - [ ] Profile auto-created in `public.profiles`
  - [ ] Login returns valid JWT with expected claims
  - [ ] `GET /v1/me` via gateway returns profile
  - [ ] Invalid token → 401 with `AUTH_INVALID_TOKEN`
  - [ ] Expired token → 401 with `AUTH_EXPIRED_TOKEN`
  - [ ] Rate limit triggers 429 on repeated failed logins
  - [ ] Logout revokes session; subsequent request fails
  - [ ] User without `profile:write` denied on `PATCH /v1/me`
  - [ ] RLS: user A cannot read user B profile via direct Supabase client
- [ ] Tests run in CI (EMX-AUTH-028) on every PR touching auth
- [ ] Test users cleaned up after suite (or isolated test project)
- [ ] Coverage report for `@emx/auth` and auth-service application layer

### Technical notes

- Use Supabase test project or local `supabase start` in CI with service container
- Seed test tenant + users in `beforeAll`
- Mark flaky OAuth tests as optional/manual

### Tasks

- [ ] Set up test harness with Supabase test credentials (GitHub secret)
- [ ] Write integration tests per scenario
- [ ] Wire into CI pipeline
- [ ] Document local test run: `doppler run -- pnpm test:auth`
