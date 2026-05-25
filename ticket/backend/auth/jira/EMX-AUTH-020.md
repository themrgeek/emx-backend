# EMX-AUTH-020: Unified auth error responses and API contract

> **Jira Key:** EMX-AUTH-020  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/06-api-gateway.md](../tickets/06-api-gateway.md)

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
