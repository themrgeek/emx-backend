# EMX-AUTH-019: Rate limiting auth endpoints with Redis

> **Jira Key:** EMX-AUTH-019  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/06-api-gateway.md](../tickets/06-api-gateway.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | redis, api-gateway, security |
| **Depends on** | EMX-AUTH-018, EMX-AUTH-011 |
| **Blocks** | EMX-AUTH-014 |

### Description

Protect auth endpoints from brute force and abuse using Redis-backed rate limiting at the api-gateway (and optionally auth-service).

### Acceptance criteria

- [ ] Rate limit on: login, signup, refresh, password reset proxy — e.g. 10 req/min/IP
- [ ] Stricter limit on failed login attempts per email
- [ ] 429 response with `Retry-After` header
- [ ] Limits configurable via env (`RATE_LIMIT_*`)
- [ ] Redis shared instance from docker-compose / Doppler
- [ ] Structured log on limit exceeded (no PII in logs)

### Technical notes

- Use `@fastify/rate-limit` with Redis store or custom sliding window
- Consider separate limits for authenticated vs anonymous

### Tasks

- [ ] Configure rate limit plugin on gateway
- [ ] Add Redis to api-gateway docker-compose env
- [ ] Load test threshold validation
