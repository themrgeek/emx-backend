# EMX-AUTH-015: GET /v1/me — current user profile

> **Jira Key:** EMX-AUTH-015  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/05-auth-service.md](../tickets/05-auth-service.md)

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
