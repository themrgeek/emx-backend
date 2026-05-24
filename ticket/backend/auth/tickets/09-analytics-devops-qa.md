# Phase 8 — Analytics | Phase 9 — DevOps & QA

---

## EMX-AUTH-026 — PostHog auth event schema and server-side instrumentation

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Medium |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | posthog, analytics, observability |
| **Depends on** | EMX-AUTH-014, EMX-AUTH-017, EMX-AUTH-024 |
| **Blocks** | EMX-AUTH-027 |

### Description

Define and implement server-side PostHog event instrumentation for the auth funnel. Events emitted from auth-service and Edge Functions — not only client-side — for reliable funnel metrics.

### Acceptance criteria

- [ ] PostHog project key stored in Doppler (`POSTHOG_API_KEY`, `POSTHOG_HOST`)
- [ ] Event schema documented:

| Event | Properties | Source |
|-------|------------|--------|
| `user_signed_up` | `method`, `tenant_id?` | Edge webhook / auth-service |
| `user_logged_in` | `method`, `session_id` | auth-service |
| `user_logged_out` | `session_id` | auth-service |
| `auth_login_failed` | `reason`, `method` | auth-service / gateway |
| `email_verified` | — | Edge webhook |
| `password_reset_requested` | — | auth-service or client |

- [ ] `distinct_id` = Supabase `user.id` (UUID)
- [ ] No passwords, tokens, or raw emails in event properties
- [ ] `@emx/analytics` package or module with typed `trackAuthEvent()` helper
- [ ] Feature flag hook prepared: `posthog.isFeatureEnabled()` for gradual auth rollout (optional)

### Technical notes

- Server-side capture via PostHog Node SDK in auth-service
- Edge Function uses PostHog HTTP API (capture endpoint) — Deno fetch
- GA4/GTM are frontend concerns; document which auth events stay server-only vs client GTM dataLayer

### Tasks

- [ ] Create analytics helper package or module
- [ ] Instrument auth use cases
- [ ] Document event schema in ticket folder
- [ ] Verify events in PostHog live view (dev project)

---

## EMX-AUTH-027 — Auth funnel metrics and dashboard definitions

| Field | Value |
|-------|-------|
| **Type** | Task |
| **Priority** | Medium |
| **Status** | To Do |
| **Story Points** | 3 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | posthog, analytics, product |
| **Depends on** | EMX-AUTH-026 |
| **Blocks** | none |

### Description

Define auth funnel metrics, PostHog insights, and success criteria. Align with GA4 conversion events where applicable (frontend team).

### Acceptance criteria

- [ ] Funnel defined: `user_signed_up` → `email_verified` → `user_logged_in` → first API call
- [ ] PostHog insight/dashboard created for auth conversion rates
- [ ] Drop-off alerts documented (e.g. signup without verify within 24h)
- [ ] A/B test readiness: feature flag `auth-flow-v2` stub documented
- [ ] GA4 event mapping table (client-side): `sign_up`, `login` via GTM dataLayer spec shared with frontend
- [ ] GTM consent mode: auth events respect consent state (document interaction)

### Technical notes

- Reason about event schemas before implementation — property names are contracts
- Funnel metrics should use server-side events as source of truth for login success

### Tasks

- [ ] Create PostHog dashboard
- [ ] Write funnel spec markdown in `ticket/backend/auth/`
- [ ] Review with product/frontend for GA4/GTM alignment

---

## EMX-AUTH-028 — GitHub Actions: database migrations and auth CI pipeline

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | github-actions, ci, supabase |
| **Depends on** | EMX-AUTH-003, EMX-AUTH-010, EMX-AUTH-002 |
| **Blocks** | EMX-AUTH-029, EMX-AUTH-030 |

### Description

Extend existing `.github/workflows/ci.yml` with auth-specific checks: Supabase migration validation, Edge Function lint/deploy to staging, and integration test job.

### Acceptance criteria

- [ ] CI job: `pnpm typecheck`, `pnpm lint` (existing) includes new packages
- [ ] CI job: validate SQL migrations (`supabase db lint` or dry-run against local/ephemeral DB)
- [ ] CI job: deploy Edge Functions to staging on merge to `main` (Supabase CLI + token from Doppler/GitHub secret)
- [ ] CI job: run auth integration tests (EMX-AUTH-030) against test Supabase project
- [ ] Doppler or GitHub Secrets for: `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_ID_STAGING`
- [ ] Migration failures block merge
- [ ] No secrets in workflow logs

### Technical notes

- Use Supabase GitHub integration if preferred over manual CLI
- Separate workflow for prod deploy with manual approval gate

### Tasks

- [ ] Add migration validation job
- [ ] Add Edge Function deploy job (staging)
- [ ] Wire Doppler secrets to GitHub Actions
- [ ] Document CI pipeline in epic README

---

## EMX-AUTH-029 — Deploy auth-service and api-gateway with environment separation

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | devops, docker, doppler, deployment |
| **Depends on** | EMX-AUTH-028, EMX-AUTH-013, EMX-AUTH-018 |
| **Blocks** | EMX-AUTH-030 |

### Description

Production deployment pipeline for auth-service and api-gateway with dev/staging/production separation. Secrets from Doppler; container images from multi-stage Dockerfiles; health/readiness probes.

### Acceptance criteria

- [ ] GitHub Actions deploy workflow: build → push image → deploy (target TBD: Railway/Fly/K8s — document choice)
- [ ] Vercel hosts frontend only; backend deploy target documented (not Vercel serverless for Fastify)
- [ ] Doppler configs inject env per environment at deploy time
- [ ] Readiness probe checks: Postgres connectivity, Redis connectivity
- [ ] `/health` liveness vs `/ready` readiness endpoints
- [ ] DNS configured for staging API (`api.staging.emx...`) and prod (`api.emx...`)
- [ ] Rollback procedure documented
- [ ] docker-compose dev parity verified with Doppler `dev` config

### Technical notes

- Existing `infra/docker/Dockerfile` and `Dockerfile.dev` — extend for auth env vars
- api-gateway must reach auth-service via internal URL in prod
- Never deploy with `SUPABASE_SERVICE_ROLE_KEY` on gateway

### Tasks

- [ ] Choose and document hosting platform
- [ ] Create deploy workflow
- [ ] Configure DNS records
- [ ] Smoke test staging deploy

---

## EMX-AUTH-030 — Auth integration and E2E test suite

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
