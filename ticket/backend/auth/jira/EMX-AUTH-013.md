# EMX-AUTH-013: JWT verification and auth context middleware

> **Jira Key:** EMX-AUTH-013  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/05-auth-service.md](../tickets/05-auth-service.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Highest |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | fastify, auth-service, jwt |
| **Depends on** | EMX-AUTH-012, EMX-AUTH-010 |
| **Blocks** | EMX-AUTH-014–017, EMX-AUTH-018 |

### Description

Implement Fastify auth plugin in `auth-service` using `@emx/auth`. Attach verified user to request context. Reject missing/invalid tokens on protected routes.

### Acceptance criteria

- [ ] `infrastructure/http/plugins/auth-plugin.ts` validates `Authorization: Bearer <token>`
- [ ] `request.user` typed as `AuthUser` on authenticated routes
- [ ] 401 for missing token; 401 for expired; 403 only when identity known but forbidden
- [ ] Public routes: `/health`, auth callbacks (if any) skip plugin
- [ ] Structured logs include `userId` without logging raw tokens
- [ ] Follows clean architecture: plugin in infrastructure, no business logic in plugin

### Technical notes

- Match patterns in existing `create-server.ts` and `register-routes.ts`
- Use `@emx/logger` for structured logging

### Tasks

- [ ] Implement auth plugin
- [ ] Register on protected route groups
- [ ] Add unit/integration tests
