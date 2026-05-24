# EMX-AUTH-004: Design and migrate core auth database schema

> **Jira Key:** EMX-AUTH-004  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/02-database.md](../tickets/02-database.md)

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
