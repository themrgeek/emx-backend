# EMX-AUTH-006: Auth triggers: auto-create profile on signup

> **Jira Key:** EMX-AUTH-006  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/02-database.md](../tickets/02-database.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | postgres, triggers, supabase-auth |
| **Depends on** | EMX-AUTH-004, EMX-AUTH-005 |
| **Blocks** | EMX-AUTH-014, EMX-AUTH-024 |

### Description

When a user registers in Supabase Auth, automatically create a row in `public.profiles`. Handle email updates and user deletion sync.

### Acceptance criteria

- [ ] Trigger on `auth.users` INSERT creates matching `profiles` row
- [ ] Trigger on email UPDATE syncs `profiles.email`
- [ ] ON DELETE CASCADE or explicit cleanup verified
- [ ] Idempotent: re-running trigger logic does not duplicate profiles
- [ ] Works for email/password and OAuth signups
- [ ] Logged failures surface in Supabase logs (monitoring hook for later)

### Technical notes

- Alternative: Edge Function webhook on `auth.users` insert — prefer DB trigger for reliability unless webhook needed for external systems
- Use `SECURITY DEFINER` functions carefully; minimal privileges

### Tasks

- [ ] Write trigger function + migration
- [ ] Test signup flow end-to-end in dev
- [ ] Document conflict resolution if profile pre-exists
