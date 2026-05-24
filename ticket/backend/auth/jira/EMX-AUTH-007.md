# EMX-AUTH-007: Configure Supabase Auth providers and security settings

> **Jira Key:** EMX-AUTH-007  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/03-supabase-auth.md](../tickets/03-supabase-auth.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | Highest |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | supabase-auth, security |
| **Depends on** | EMX-AUTH-001 |
| **Blocks** | EMX-AUTH-008, EMX-AUTH-009, EMX-AUTH-014 |

### Description

Configure Supabase Auth for production-grade sign-up and login: email/password, email confirmation, password policy, and optional OAuth providers (Google, GitHub). Settings must be replicated consistently across dev/staging/prod with documented differences.

### Acceptance criteria

- [ ] Email/password signup enabled with **email confirmation** required in staging/prod
- [ ] Password minimum length and complexity configured
- [ ] JWT expiry and refresh token rotation settings documented and applied
- [ ] At least one OAuth provider configured in dev (Google or GitHub)
- [ ] Rate limiting on auth endpoints enabled (Supabase built-in + gateway layer later)
- [ ] `auth.users` leak prevention: no public SELECT on auth schema
- [ ] Auth settings exported/documented per environment

### Technical notes

- Prefer Supabase client SDK on frontend for sign-up/login OR server-assisted flow via auth-service — decision documented in EMX-AUTH-014
- Disable signups in prod until launch if needed via Supabase dashboard flag

### Tasks

- [ ] Configure Auth providers in Supabase dashboard (all envs)
- [ ] Document OAuth redirect URIs for Vercel preview and production domains
- [ ] Security review of auth settings checklist
