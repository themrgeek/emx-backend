# EMX-AUTH-027: Auth funnel metrics and dashboard definitions

> **Jira Key:** EMX-AUTH-027  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/09-analytics-devops-qa.md](../tickets/09-analytics-devops-qa.md)

| Field | Value |
|-------|-------|
| **Type** | Task |
| **Priority** | Medium |
| **Status** | To Do |
| **Story Points** | 3 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | posthog, analytics, product |
| **Depends on** | EMX-AUTH-026 |
| **Blocks** | none |

### Description

Define auth funnel metrics, PostHog insights, and success criteria. Align with GA4 conversion events where applicable (frontend team).

### Acceptance criteria

- [ ] Funnel defined: `user_signed_up` → `email_verified` → `user_logged_in` → first API call
- [ ] PostHog insight/dashboard created for auth conversion rates
- [ ] Drop-off alerts documented (e.g. signup without verify within 24h)
- [ ] A/B test readiness: feature flag `auth-flow-v2` stub documented
- [ ] GA4 event mapping table (client-side): `sign_up`, `login` via GTM dataLayer spec shared with frontend
- [ ] GTM consent mode: auth events respect consent state (document interaction)

### Technical notes

- Reason about event schemas before implementation — property names are contracts
- Funnel metrics should use server-side events as source of truth for login success

### Tasks

- [ ] Create PostHog dashboard
- [ ] Write funnel spec markdown in `ticket/backend/auth/`
- [ ] Review with product/frontend for GA4/GTM alignment
