# EMX-AUTH-008: Custom JWT claims (tenant_id, role)

> **Jira Key:** EMX-AUTH-008  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/03-supabase-auth.md](../tickets/03-supabase-auth.md)

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
