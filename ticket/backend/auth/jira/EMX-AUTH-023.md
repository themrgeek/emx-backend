# EMX-AUTH-023: Admin APIs for role assignment

> **Jira Key:** EMX-AUTH-023  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/07-rbac.md](../tickets/07-rbac.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Medium |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | rbac, rest-api |
| **Depends on** | EMX-AUTH-022 |
| **Blocks** | none |

### Description

REST endpoints for tenant admins to invite users and assign roles. Validates caller has `tenant:admin` or `user:invite` permission.

### Acceptance criteria

- [ ] `POST /v1/tenants/:tenantId/members` — invite/add member with role
- [ ] `PATCH /v1/tenants/:tenantId/members/:userId` — update role
- [ ] `DELETE /v1/tenants/:tenantId/members/:userId` — remove member
- [ ] All endpoints require admin permission
- [ ] Triggers JWT claim refresh on role change (re-login or token refresh)
- [ ] Audit log entries for role changes

### Tasks

- [ ] Use cases + routes
- [ ] Zod schemas for request bodies
- [ ] Integration tests with multiple users
