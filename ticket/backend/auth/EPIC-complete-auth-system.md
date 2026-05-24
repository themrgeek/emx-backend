# EPIC: Complete Auth System

| Field | Value |
|-------|-------|
| **Epic ID** | EMX-EPIC-AUTH |
| **Summary** | Build production-grade authentication and authorization for EmX |
| **Priority** | Highest |
| **Status** | To Do |

## Goal

Deliver a secure, scalable auth system using **Supabase Auth** as the identity provider, **Postgres + RLS** for data isolation, **Fastify services** (`auth-service`, `api-gateway`) for product APIs, **Redis** for session/rate-limit state, **Edge Functions** for auth hooks/webhooks, and full **DevOps + analytics** instrumentation.

## Architecture summary

```text
Client → api-gateway (JWT verify, rate limit)
           → auth-service (profile, sessions, RBAC)
           → Supabase Postgres (profiles, and RLS)
Supabase Auth ← signup/login/OAuth (client or server-assisted)
Edge Functions ← webhooks, custom JWT claims
PostHog ← auth funnel events (server-side)
```

## Out of scope (follow-up epics)

- Full admin dashboard UI
- SSO/SAML enterprise auth
- Passwordless magic-link-only UX polish
- Kubernetes migration (architecture-ready only)

## Phases & ticket map

| Phase | Tickets | Focus |
|-------|---------|-------|
| 0 — Foundation | 001–003 | Supabase projects, CLI, Doppler secrets |
| 1 — Database | 004–006 | Schema, RLS, triggers |
| 2 — Supabase Auth | 007–009 | Providers, JWT claims, email/redirects |
| 3 — Shared packages | 010–012 | database, config, auth utilities |
| 4 — Auth service | 013–017 | JWT, /me, sessions, logout |
| 5 — API gateway | 018–020 | Auth plugin, rate limits, errors |
| 6 — RBAC | 021–023 | Roles, permissions, admin APIs |
| 7 — Edge Functions | 024–025 | Webhooks, access token hook |
| 8 — Analytics | 026–027 | PostHog events, funnel definitions |
| 9 — DevOps & QA | 028–030 | CI migrations, deploy pipeline, E2E tests |

## Dependency graph (critical path)

```text
001 → 002 → 004 → 005 → 006
004 → 010 → 011 → 012
007 → 008 → 009
012 → 013 → 014–017
013 → 018 → 019 → 020
005 + 012 → 021 → 022 → 023
006 + 008 → 024 → 025
017 → 026 → 027
003 + 010 → 028 → 029 → 030
```

## Definition of done (epic)

- [ ] User can sign up, verify email, log in, refresh session, and log out across dev/staging/prod
- [ ] All user-facing tables protected by RLS; service role never exposed to clients
- [ ] `api-gateway` rejects invalid/expired tokens; `auth-service` serves `/v1/me` and session APIs
- [ ] RBAC enforced on at least one protected route
- [ ] Auth events tracked in PostHog with documented schema
- [ ] Migrations run in CI; secrets managed via Doppler; auth-service deploys via GitHub Actions

## Ticket files

### Individual Jira tickets (recommended)

| Resource | Description |
|----------|-------------|
| [jira/INDEX.md](./jira/INDEX.md) | Master index of all 30 tickets |
| [jira/EMX-AUTH-001.md](./jira/EMX-AUTH-001.md) … [EMX-AUTH-030.md](./jira/EMX-AUTH-030.md) | One file per Jira ticket |
| [jira/jira-import.csv](./jira/jira-import.csv) | CSV for bulk import into Jira |

### Phase bundles

| File | Tickets |
|------|---------|
| [01-foundation.md](./tickets/01-foundation.md) | EMX-AUTH-001 – 003 |
| [02-database.md](./tickets/02-database.md) | EMX-AUTH-004 – 006 |
| [03-supabase-auth.md](./tickets/03-supabase-auth.md) | EMX-AUTH-007 – 009 |
| [04-shared-packages.md](./tickets/04-shared-packages.md) | EMX-AUTH-010 – 012 |
| [05-auth-service.md](./tickets/05-auth-service.md) | EMX-AUTH-013 – 017 |
| [06-api-gateway.md](./tickets/06-api-gateway.md) | EMX-AUTH-018 – 020 |
| [07-rbac.md](./tickets/07-rbac.md) | EMX-AUTH-021 – 023 |
| [08-edge-functions.md](./tickets/08-edge-functions.md) | EMX-AUTH-024 – 025 |
| [09-analytics-devops-qa.md](./tickets/09-analytics-devops-qa.md) | EMX-AUTH-026 – 030 |
