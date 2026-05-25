# EMX-AUTH-025: Custom access token hook Edge Function

> **Jira Key:** EMX-AUTH-025  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/08-edge-functions.md](../tickets/08-edge-functions.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | edge-functions, deno, jwt |
| **Depends on** | EMX-AUTH-008, EMX-AUTH-021, EMX-AUTH-024 |
| **Blocks** | EMX-AUTH-005, EMX-AUTH-022 |

### Description

Implement Supabase **Custom Access Token Hook** as a Deno Edge Function. Inject `tenant_id` and `app_role` claims into JWTs at issuance time by querying `tenant_memberships` / `user_roles`.

### Acceptance criteria

- [ ] Edge Function at `supabase/functions/custom-access-token/index.ts`
- [ ] Registered as Auth hook: "Customize Access Token"
- [ ] Reads user ID from hook payload; fetches tenant + role from Postgres via service client
- [ ] Returns modified claims object merged with defaults
- [ ] Latency under 200ms p95 (hook runs on every token issue)
- [ ] On DB error: fail closed — do not grant elevated claims
- [ ] Unit tests with mocked Supabase client where possible
- [ ] Claims documented and match EMX-AUTH-008 schema

### Technical notes

```typescript
import { createClient } from 'npm:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const payload = await req.json();
  // fetch membership, return { claims: { tenant_id, app_role } }
});
```

- Minimize DB queries — consider caching hot membership data later (Redis not available in Edge)
- Coordinate with RLS policies that reference `auth.jwt() ->> 'tenant_id'`

### Tasks

- [ ] Implement hook function
- [ ] Register in Supabase Auth → Hooks
- [ ] Integration test: login → decode JWT → verify claims
- [ ] Performance test under concurrent logins
