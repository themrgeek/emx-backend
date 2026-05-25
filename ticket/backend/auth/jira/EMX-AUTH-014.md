# EMX-AUTH-014: Sign-up and login API strategy and endpoints

> **Jira Key:** EMX-AUTH-014  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/05-auth-service.md](../tickets/05-auth-service.md)

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
