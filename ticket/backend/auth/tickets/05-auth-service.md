# Phase 4 — Auth Service

---

## EMX-AUTH-013 — JWT verification and auth context middleware

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

---

## EMX-AUTH-014 — Sign-up and login API strategy and endpoints

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | auth-service, rest-api |
| **Depends on** | EMX-AUTH-007, EMX-AUTH-006, EMX-AUTH-013 |
| **Blocks** | EMX-AUTH-026, EMX-AUTH-030 |

### Description

Define and implement auth entrypoint strategy. **Recommended:** client uses Supabase SDK for sign-up/login; auth-service exposes complementary REST endpoints for server-side flows, profile bootstrap verification, and mobile BFF if needed.

### Acceptance criteria

- [ ] ADR documented: client-direct vs BFF auth flow (decision recorded in ticket folder or `docs/`)
- [ ] If BFF: `POST /v1/auth/signup`, `POST /v1/auth/login` with Zod validation
- [ ] If client-direct: `POST /v1/auth/sync-profile` after Supabase signup (idempotent)
- [ ] All routes versioned under `/v1`
- [ ] Input validated via `@emx/validation` Zod schemas
- [ ] Errors return consistent shape `{ code, message }` — no internal leaks
- [ ] Routes delegate to `application/use-cases/` — not inline in route handlers

### Technical notes

- Use Supabase Admin API from auth-service only when necessary (service role)
- Rate limit signup/login (EMX-AUTH-019)

### Tasks

- [ ] Write ADR for auth flow
- [ ] Implement use cases + routes
- [ ] OpenAPI or route schema documentation

---

## EMX-AUTH-015 — GET /v1/me — current user profile

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 3 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | auth-service, rest-api |
| **Depends on** | EMX-AUTH-013, EMX-AUTH-006 |
| **Blocks** | EMX-AUTH-030 |

### Description

Protected endpoint returning the authenticated user's profile and membership summary from Postgres via repository layer.

### Acceptance criteria

- [ ] `GET /v1/me` requires valid JWT
- [ ] Response: `{ id, email, displayName, avatarUrl, tenantId?, role?, createdAt }`
- [ ] Data fetched via `ProfileRepository` — not raw Supabase in route
- [ ] 404 if profile missing (should not happen post-trigger; log as error)
- [ ] Response schema validated/exported for gateway consumers

### Tasks

- [ ] `GetCurrentUserUseCase` in application layer
- [ ] Supabase profile repository in infrastructure
- [ ] Route + integration test

---

## EMX-AUTH-016 — Session management and token refresh with Redis

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

---

## EMX-AUTH-017 — Logout and global session revocation

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
