# Phase 2 — Supabase Auth Configuration

---

## EMX-AUTH-007 — Configure Supabase Auth providers and security settings

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Highest |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | supabase-auth, security |
| **Depends on** | EMX-AUTH-001 |
| **Blocks** | EMX-AUTH-008, EMX-AUTH-009, EMX-AUTH-014 |

### Description

Configure Supabase Auth for production-grade sign-up and login: email/password, email confirmation, password policy, and optional OAuth providers (Google, GitHub). Settings must be replicated consistently across dev/staging/prod with documented differences.

### Acceptance criteria

- [ ] Email/password signup enabled with **email confirmation** required in staging/prod
- [ ] Password minimum length and complexity configured
- [ ] JWT expiry and refresh token rotation settings documented and applied
- [ ] At least one OAuth provider configured in dev (Google or GitHub)
- [ ] Rate limiting on auth endpoints enabled (Supabase built-in + gateway layer later)
- [ ] `auth.users` leak prevention: no public SELECT on auth schema
- [ ] Auth settings exported/documented per environment

### Technical notes

- Prefer Supabase client SDK on frontend for sign-up/login OR server-assisted flow via auth-service — decision documented in EMX-AUTH-014
- Disable signups in prod until launch if needed via Supabase dashboard flag

### Tasks

- [ ] Configure Auth providers in Supabase dashboard (all envs)
- [ ] Document OAuth redirect URIs for Vercel preview and production domains
- [ ] Security review of auth settings checklist

---

## EMX-AUTH-008 — Custom JWT claims (tenant_id, role)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | jwt, edge-functions, rls |
| **Depends on** | EMX-AUTH-007, EMX-AUTH-004 |
| **Blocks** | EMX-AUTH-005, EMX-AUTH-022, EMX-AUTH-025 |

### Description

Enrich Supabase access tokens with custom claims (`tenant_id`, `app_role`) so RLS policies and services can authorize without extra DB lookups on every request. Implement via **Custom Access Token Hook** (Edge Function) or Auth package Supabase auth hook.

### Acceptance criteria

- [ ] Access token JWT includes claims: `sub`, `email`, `tenant_id` (nullable), `app_role`
- [ ] Claims update when user joins/leaves tenant or role changes
- [ ] RLS policies reference claims where applicable
- [ ] auth-service validates claims match DB on sensitive operations
- [ ] Claim schema documented for frontend and backend consumers
- [ ] Hook failure does not silently grant elevated access (fail closed)

### Technical notes

- Deno Edge Function with npm-specifier imports: `import { createClient } from 'npm:@supabase/supabase-js@2'`
- Keep hook logic minimal — fetch membership, merge claims, return

### Tasks

- [ ] Implement access token hook (see EMX-AUTH-025)
- [ ] Register hook in Supabase Auth settings
- [ ] Integration test: token contains expected claims after login

---

## EMX-AUTH-009 — Email templates, redirect URLs, and site URL per environment

| Field | Value |
|-------|-------|
| **Type** | Task |
| **Priority** | Medium |
| **Status** | To Do |
| **Story Points** | 3 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | supabase-auth, email, vercel |
| **Depends on** | EMX-AUTH-007 |
| **Blocks** | EMX-AUTH-014 |

### Description

Configure Supabase Auth email templates (confirm signup, reset password, magic link) and environment-specific **Site URL** and **Redirect URLs** for Vercel deployments (preview + production).

### Acceptance criteria

- [ ] Branded email templates for confirm and password reset with EmX product name and support link
- [ ] Site URL set per env: localhost, staging domain, production domain
- [ ] Redirect allowlist includes Vercel preview URLs pattern (`*.vercel.app`) for staging
- [ ] Password reset and email confirm flows tested on staging
- [ ] DNS/SPF/DKIM documented if using custom SMTP (optional phase)

### Technical notes

- Coordinate with frontend team for callback route (e.g. `/auth/callback`)
- GTM consent mode does not block auth emails — separate concern

### Tasks

- [ ] Customize templates in Supabase
- [ ] Document redirect URL matrix
- [ ] QA email delivery in staging
