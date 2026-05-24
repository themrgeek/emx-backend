# EMX-AUTH-005: Implement RLS policies for auth-related tables

> **Jira Key:** EMX-AUTH-005  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/02-database.md](../tickets/02-database.md)

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
