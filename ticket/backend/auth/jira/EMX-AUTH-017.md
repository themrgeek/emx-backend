# EMX-AUTH-017: Logout and global session revocation

> **Jira Key:** EMX-AUTH-017  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/05-auth-service.md](../tickets/05-auth-service.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Medium |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | auth-service, security |
| **Depends on** | EMX-AUTH-016 |
| **Blocks** | EMX-AUTH-026, EMX-AUTH-030 |

### Description

Allow users to log out current session or all sessions. Invalidate refresh tokens via Supabase Admin API and Redis revocation list.

### Acceptance criteria

- [ ] `POST /v1/auth/logout` — revokes current session
- [ ] `POST /v1/auth/logout-all` — revokes all user sessions (optional v1.1)
- [ ] Supabase `signOut` / admin session invalidation called where applicable
- [ ] Redis revocation updated; subsequent requests with old access token rejected at gateway
- [ ] Audit log entry for logout events
- [ ] PostHog `user_logged_out` event emitted (EMX-AUTH-026)

### Tasks

- [ ] Logout use case
- [ ] Route + tests
- [ ] Coordinate gateway token rejection behavior
