# EMX-AUTH-016: Session management and token refresh with Redis

> **Jira Key:** EMX-AUTH-016  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/05-auth-service.md](../tickets/05-auth-service.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | redis, sessions, auth-service |
| **Depends on** | EMX-AUTH-013, EMX-AUTH-011 |
| **Blocks** | EMX-AUTH-017, EMX-AUTH-026 |

### Description

Implement session tracking and optional refresh-token proxy. Use Redis for session metadata, revocation list, and refresh token rotation coordination with Supabase Auth.

### Acceptance criteria

- [ ] Redis client in auth-service infrastructure (connection from `REDIS_URL`)
- [ ] On login: session record keyed by `userId:sessionId` with TTL aligned to JWT expiry
- [ ] `POST /v1/auth/refresh` accepts refresh token; returns new access token (if BFF pattern)
- [ ] Revoked sessions rejected even if JWT not yet expired (denylist in Redis)
- [ ] Graceful Redis failure behavior documented (fail closed for revocation check)
- [ ] Session audit events written to `auth_audit_log`

### Technical notes

- docker-compose already includes Redis — wire auth-service dependency
- Key prefix: `emx:auth:session:` / `emx:auth:revoked:`

### Tasks

- [ ] Redis adapter in infrastructure
- [ ] Refresh use case + route
- [ ] Session create/validate helpers
