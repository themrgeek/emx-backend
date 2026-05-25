# EMX-AUTH-018: Gateway auth plugin and authenticated request forwarding

> **Jira Key:** EMX-AUTH-018  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/06-api-gateway.md](../tickets/06-api-gateway.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Highest |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | api-gateway, jwt |
| **Depends on** | EMX-AUTH-012, EMX-AUTH-013 |
| **Blocks** | EMX-AUTH-019, EMX-AUTH-020, EMX-AUTH-030 |

### Description

Add authentication middleware to `api-gateway` using `@emx/auth`. Verify JWT once at the edge; forward trusted internal headers to downstream services (e.g. `x-user-id`, `x-tenant-id`) or re-validate per service based on threat model.

### Acceptance criteria

- [ ] Auth plugin applied to `/v1/*` protected routes
- [ ] Invalid/expired token → 401 with standard error body
- [ ] Valid token → `request.user` available; optional signed internal headers to auth-service
- [ ] Public routes: `/health`, `/v1/auth/*` signup/login if exposed through gateway
- [ ] Gateway does **not** hold service role key
- [ ] Correlation ID propagated (`x-request-id`)

### Technical notes

- Prefer verifying JWT at gateway AND auth-service (defense in depth) or gateway-only with mTLS later — document choice
- Use `@fastify/http-proxy` or manual fetch to auth-service when routing

### Tasks

- [ ] Implement gateway auth plugin
- [ ] Route proxy config to auth-service
- [ ] Integration test through gateway
