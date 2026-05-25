# EMX-AUTH-012: Create packages/auth with JWT utilities and shared types

> **Jira Key:** EMX-AUTH-012  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/04-shared-packages.md](../tickets/04-shared-packages.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | jwt, shared-package |
| **Depends on** | EMX-AUTH-011 |
| **Blocks** | EMX-AUTH-013, EMX-AUTH-018, EMX-AUTH-022 |

### Description

Shared auth utilities for gateway and auth-service: JWT verification (JWKS or secret), typed `AuthUser` context, error types, and claim parsing. Single implementation — no copy-paste between services.

### Acceptance criteria

- [ ] `packages/auth/` exported API:
  - `verifyAccessToken(token, config): Promise<AuthUser>`
  - `AuthUser` type: `userId`, `email`, `tenantId?`, `role?`
  - `AuthError` discriminated union (expired, invalid, missing)
- [ ] Supports Supabase JWT structure (`sub`, `email`, custom claims)
- [ ] Unit tests for token parsing edge cases
- [ ] Used by both api-gateway and auth-service

### Technical notes

- Prefer `jose` library for JWKS verification against Supabase issuer
- Cache JWKS keys with TTL

### Tasks

- [ ] Scaffold `@emx/auth` package
- [ ] Implement verify + types
- [ ] Add tests in package
