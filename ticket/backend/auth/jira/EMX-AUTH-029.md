# EMX-AUTH-029: Deploy auth-service and api-gateway with environment separation

> **Jira Key:** EMX-AUTH-029  
> **Epic:** [EMX-EPIC-AUTH](../EPIC-complete-auth-system.md)  
> **Phase file:** [tickets/09-analytics-devops-qa.md](../tickets/09-analytics-devops-qa.md)

| Field | Value |
|-------|-------|
| **Type** | Story |
| **Priority** | High |
| **Status** | To Do |
| **Story Points** | 8 |
| **Epic** | EMX-EPIC-AUTH |
| **Labels** | devops, docker, doppler, deployment |
| **Depends on** | EMX-AUTH-028, EMX-AUTH-013, EMX-AUTH-018 |
| **Blocks** | EMX-AUTH-030 |

### Description

Production deployment pipeline for auth-service and api-gateway with dev/staging/production separation. Secrets from Doppler; container images from multi-stage Dockerfiles; health/readiness probes.

### Acceptance criteria

- [ ] GitHub Actions deploy workflow: build → push image → deploy (target TBD: Railway/Fly/K8s — document choice)
- [ ] Vercel hosts frontend only; backend deploy target documented (not Vercel serverless for Fastify)
- [ ] Doppler configs inject env per environment at deploy time
- [ ] Readiness probe checks: Postgres connectivity, Redis connectivity
- [ ] `/health` liveness vs `/ready` readiness endpoints
- [ ] DNS configured for staging API (`api.staging.emx...`) and prod (`api.emx...`)
- [ ] Rollback procedure documented
- [ ] docker-compose dev parity verified with Doppler `dev` config

### Technical notes

- Existing `infra/docker/Dockerfile` and `Dockerfile.dev` — extend for auth env vars
- api-gateway must reach auth-service via internal URL in prod
- Never deploy with `SUPABASE_SERVICE_ROLE_KEY` on gateway

### Tasks

- [ ] Choose and document hosting platform
- [ ] Create deploy workflow
- [ ] Configure DNS records
- [ ] Smoke test staging deploy
