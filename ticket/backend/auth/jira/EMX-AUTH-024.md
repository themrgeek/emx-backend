# EMX-AUTH-024: Auth webhook handler for user lifecycle events

> **Jira Key:** EMX-AUTH-024  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/08-edge-functions.md](../tickets/08-edge-functions.md)

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
