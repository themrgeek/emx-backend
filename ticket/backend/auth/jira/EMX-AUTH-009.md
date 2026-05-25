# EMX-AUTH-009: Email templates, redirect URLs, and site URL per environment

> **Jira Key:** EMX-AUTH-009  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/03-supabase-auth.md](../tickets/03-supabase-auth.md)

| Field | Value |
|-------|-------|
| **Type** | Task |
| **Priority** | Medium |
| **Status** | To Do |
| **Story Points** | 3 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | supabase-auth, email, vercel |
| **Depends on** | EMX-AUTH-007 |
| **Blocks** | EMX-AUTH-014 |

### Description

Configure Supabase Auth email templates (confirm signup, reset password, magic link) and environment-specific **Site URL** and **Redirect URLs** for Vercel deployments (preview + production).

### Acceptance criteria

- [ ] Branded email templates for confirm and password reset with EmX product name and support link
- [ ] Site URL set per env: localhost, staging domain, production domain
- [ ] Redirect allowlist includes Vercel preview URLs pattern (`*.vercel.app`) for staging
- [ ] Password reset and email confirm flows tested on staging
- [ ] DNS/SPF/DKIM documented if using custom SMTP (optional phase)

### Technical notes

- Coordinate with frontend team for callback route (e.g. `/auth/callback`)
- GTM consent mode does not block auth emails — separate concern

### Tasks

- [ ] Customize templates in Supabase
- [ ] Document redirect URL matrix
- [ ] QA email delivery in staging
