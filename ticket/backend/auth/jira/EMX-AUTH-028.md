# EMX-AUTH-028: GitHub Actions: database migrations and auth CI pipeline

> **Jira Key:** EMX-AUTH-028  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/09-analytics-devops-qa.md](../tickets/09-analytics-devops-qa.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 5 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | github-actions, ci, supabase |
| **Depends on** | EMX-AUTH-003, EMX-AUTH-010, EMX-AUTH-002 |
| **Blocks** | EMX-AUTH-029, EMX-AUTH-030 |

### Description

Extend existing `.github/workflows/ci.yml` with auth-specific checks: Supabase migration validation, Edge Function lint/deploy to staging, and integration test job.

### Acceptance criteria

- [ ] CI job: `pnpm typecheck`, `pnpm lint` (existing) includes new packages
- [ ] CI job: validate SQL migrations (`supabase db lint` or dry-run against local/ephemeral DB)
- [ ] CI job: deploy Edge Functions to staging on merge to `main` (Supabase CLI + token from Doppler/GitHub secret)
- [ ] CI job: run auth integration tests (EMX-AUTH-030) against test Supabase project
- [ ] Doppler or GitHub Secrets for: `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_ID_STAGING`
- [ ] Migration failures block merge
- [ ] No secrets in workflow logs

### Technical notes

- Use Supabase GitHub integration if preferred over manual CLI
- Separate workflow for prod deploy with manual approval gate

### Tasks

- [ ] Add migration validation job
- [ ] Add Edge Function deploy job (staging)
- [ ] Wire Doppler secrets to GitHub Actions
- [ ] Document CI pipeline in epic README
