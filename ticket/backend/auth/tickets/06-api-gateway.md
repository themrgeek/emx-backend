# Phase 5 — API Gateway

---

## EMX-AUTH-018 — Gateway auth plugin and authenticated request forwarding

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

---

## EMX-AUTH-019 — Rate limiting auth endpoints with Redis

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

---

## EMX-AUTH-020 — Unified auth error responses and API contract

| Field | Value |
|-------|-------|
| **Type** | Task |
| **Priority** | Medium |
| **Status** | To Do |
| **Story Points** | 3 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | api-gateway, dx |
| **Depends on** | EMX-AUTH-018 |
| **Blocks** | EMX-AUTH-030 |

### Description

Standardize auth-related HTTP errors across gateway and auth-service for predictable client handling.

### Acceptance criteria

- [ ] Error shape: `{ error: { code: string, message: string, details?: unknown } }`
- [ ] Codes defined: `AUTH_INVALID_TOKEN`, `AUTH_EXPIRED_TOKEN`, `AUTH_MISSING_TOKEN`, `AUTH_FORBIDDEN`, `AUTH_RATE_LIMITED`
- [ ] Shared error mapper in `@emx/validation` or `@emx/auth`
- [ ] No stack traces or Supabase internals in responses
- [ ] Documented in ticket folder or API reference for frontend team

### Tasks

- [ ] Implement error handler in both services
- [ ] Export error code constants
- [ ] Frontend integration notes
