# EMX-AUTH-022: Authorization middleware and permission helpers

> **Jira Key:** EMX-AUTH-022  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/07-rbac.md](../tickets/07-rbac.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | rbac, auth-service |
| **Depends on** | EMX-AUTH-021, EMX-AUTH-012, EMX-AUTH-008 |
| **Blocks** | EMX-AUTH-023, EMX-AUTH-030 |

### Description

Application-layer authorization in auth-service (and reusable in `@emx/auth`): `requirePermission()`, `requireRole()`, and use-case-level checks.

### Acceptance criteria

- [ ] `authorize(permission: Permission): preHandler` Fastify hook
- [ ] `hasPermission(user, permission): boolean` pure function for use cases
- [ ] Permissions loaded from JWT claims first; DB fallback for sensitive ops
- [ ] 403 with `AUTH_FORBIDDEN` when denied
- [ ] At least one sample protected route: `PATCH /v1/me` requires `profile:write`
- [ ] Unit tests for permission matrix

### Technical notes

- Never rely on RLS alone for admin actions invoked via service role
- Prepare for future policy engine (OPA/Cedar) — keep interface small

### Tasks

- [ ] Add authorization module to `@emx/auth`
- [ ] Wire hooks in auth-service
- [ ] Document RBAC usage for future domain services
