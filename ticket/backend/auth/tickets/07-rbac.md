# Phase 6 — RBAC

---

## EMX-AUTH-021 — Roles and permissions database schema

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | rbac, postgres, sql |
| **Depends on** | EMX-AUTH-004, EMX-AUTH-005 |
| **Blocks** | EMX-AUTH-022, EMX-AUTH-023 |

### Description

Extend auth schema with role-based access control: roles, permissions, and role assignments scoped to tenant or global.

### Acceptance criteria

- [ ] Tables: `roles`, `permissions`, `role_permissions`, `user_roles` (or enum on `tenant_memberships`)
- [ ] Seed permissions: `profile:read`, `profile:write`, `tenant:admin`, `user:invite`
- [ ] Default roles: `member`, `admin`, `owner`
- [ ] RLS on RBAC tables: users see only roles within their tenant
- [ ] Migration + seed for dev environment
- [ ] Custom JWT claim `app_role` syncs with assignment (via EMX-AUTH-008)

### Technical notes

- Start simple: role enum on membership before full permission matrix if timeline tight
- Document permission naming convention: `resource:action`

### Tasks

- [ ] Design RBAC ERD
- [ ] Write migration + seed
- [ ] Update generated types

---

## EMX-AUTH-022 — Authorization middleware and permission helpers

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

---

## EMX-AUTH-023 — Admin APIs for role assignment

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
