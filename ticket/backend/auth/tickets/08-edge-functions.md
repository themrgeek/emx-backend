# Phase 7 — Edge Functions (Deno)

---

## EMX-AUTH-024 — Auth webhook handler for user lifecycle events

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | edge-functions, deno, webhooks |
| **Depends on** | EMX-AUTH-006, EMX-AUTH-002 |
| **Blocks** | EMX-AUTH-025, EMX-AUTH-026 |

### Description

Deploy a Supabase Edge Function to handle Auth webhooks (`user.created`, `user.updated`, `user.deleted`). Sync external systems, emit analytics events, and handle edge cases the DB trigger cannot cover.

### Acceptance criteria

- [ ] Edge Function at `supabase/functions/auth-webhook/index.ts`
- [ ] Verifies webhook signature / secret from Supabase Auth hooks config
- [ ] Handles `user.created`: confirm profile exists; emit PostHog `user_signed_up` (server-side)
- [ ] Handles `user.deleted`: cleanup external references if any
- [ ] Uses npm-specifier imports: `npm:@supabase/supabase-js@2`, `npm:zod@3`
- [ ] Deployed to dev/staging/prod via Supabase CLI in CI (EMX-AUTH-028)
- [ ] Idempotent processing; safe to retry
- [ ] Structured JSON logs; no PII in log messages

### Technical notes

- Deno runtime — no Node APIs; keep function small and stateless
- Service role key injected via Supabase function secrets (Doppler → Supabase secrets)
- Fail closed on invalid signature

### Tasks

- [ ] Implement webhook handler with Zod payload validation
- [ ] Register Auth hook in Supabase dashboard
- [ ] Test with local `supabase functions serve`
- [ ] Document webhook payload schema

---

## EMX-AUTH-025 — Custom access token hook Edge Function

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
