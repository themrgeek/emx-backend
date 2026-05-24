# Phase 1 — Database

---

## EMX-AUTH-004 — Design and migrate core auth database schema

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Highest |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | postgres, sql, migrations |
| **Depends on** | EMX-AUTH-002 |
| **Blocks** | EMX-AUTH-005, EMX-AUTH-006, EMX-AUTH-010, EMX-AUTH-021 |

### Description

Create SQL migrations for the auth domain: user profiles (shadow `auth.users`), optional multi-tenancy, and session audit tables. Follow EmX naming conventions and enforce constraints at the status level.

### Acceptance criteria

- [ ] Migration creates `public.profiles` linked to `auth.users(id)` ON DELETE CASCADE
- [ ] Columns: `id`, `email`, `display_name`, `avatar_url`, `created_at`, `updated_at`
- [ ] Optional: `tenants`, `tenant_memberships` with `role` enum if multi-tenant
- [ ] `auth_audit_log` table for login/logout/failed attempts (append-only)
- [ ] All tables have `created_at` / `updated_at` with triggers
- [ ] Indexes on foreign keys and lookup columns (`email`, `tenant_id`)
- [ ] Migration applies cleanly via Supabase CLI locally and on staging

### SQL sketch (reference)

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Technical notes

- Use `uuid` consistently with Supabase Auth
- Business user ID = `auth.users.id` unless internal ID mapping is required later
- No business logic in migrations beyond constraints and triggers

### Tasks

- [ ] Write initial migration SQL
- [ ] Add seed data for local dev test users
- [ ] Review with team for tenant model (single vs multi-tenant)

---

## EMX-AUTH-005 — Implement RLS policies for auth-related tables

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Highest |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | rls, security, postgres |
| **Depends on** | EMX-AUTH-004 |
| **Blocks** | EMX-AUTH-021, EMX-AUTH-022 |

### Description

Enable Row Level Security on all user-facing tables. Users may only read/update their own profile; tenant members may only access rows within their tenant. Service role bypass is implicit — document and restrict server usage.

### Acceptance criteria

- [ ] RLS **enabled** on `profiles`, `tenant_memberships`, and any tenant-scoped tables
- [ ] Policy: users SELECT/UPDATE own profile where `auth.uid() = id`
- [ ] Policy: users cannot INSERT profiles directly (trigger or service only)
- [ ] Tenant policies use JWT claim `tenant_id` (after EMX-AUTH-008) or membership subquery
- [ ] Negative tests: user A cannot read user B's profile via PostgREST with user JWT
- [ ] Migration includes `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- [ ] RLS policy documentation in epic runbook

### Technical notes

- RLS is **defense in depth** — Fastify services still enforce authorization in application layer
- Avoid complex business rules in policies; keep policies readable and auditable
- Test with `SET request.jwt.claim.sub` in SQL or Supabase client with test users

### Tasks

- [ ] Write RLS migration
- [ ] Add SQL tests or documented manual test matrix
- [ ] Security review checklist completed

---

## EMX-AUTH-006 — Auth triggers: auto-create profile on signup

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | postgres, triggers, supabase-auth |
| **Depends on** | EMX-AUTH-004, EMX-AUTH-005 |
| **Blocks** | EMX-AUTH-014, EMX-AUTH-024 |

### Description

When a user registers in Supabase Auth, automatically create a row in `public.profiles`. Handle email updates and user deletion sync.

### Acceptance criteria

- [ ] Trigger on `auth.users` INSERT creates matching `profiles` row
- [ ] Trigger on email UPDATE syncs `profiles.email`
- [ ] ON DELETE CASCADE or explicit cleanup verified
- [ ] Idempotent: re-running trigger logic does not duplicate profiles
- [ ] Works for email/password and OAuth signups
- [ ] Logged failures surface in Supabase logs (monitoring hook for later)

### Technical notes

- Alternative: Edge Function webhook on `auth.users` insert — prefer DB trigger for reliability unless webhook needed for external systems
- Use `SECURITY DEFINER` functions carefully; minimal privileges

### Tasks

- [ ] Write trigger function + migration
- [ ] Test signup flow end-to-end in dev
- [ ] Document conflict resolution if profile pre-exists
