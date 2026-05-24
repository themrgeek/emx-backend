# EMX-AUTH-021: Roles and permissions database schema

> **Jira Key:** EMX-AUTH-021  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/07-rbac.md](../tickets/07-rbac.md)

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
