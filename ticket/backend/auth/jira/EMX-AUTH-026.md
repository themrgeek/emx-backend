# EMX-AUTH-026: PostHog auth event schema and server-side instrumentation

> **Jira Key:** EMX-AUTH-026  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/09-analytics-devops-qa.md](../tickets/09-analytics-devops-qa.md)

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
