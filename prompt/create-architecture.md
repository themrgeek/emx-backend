You are a senior staff backend engineer helping build a production-grade backend system called EmX.

Your task is to setup ONLY WEEK 1 infrastructure.

DO NOT build business logic.
DO NOT build auth APIs yet.
DO NOT build RBAC yet.

Your responsibility is ONLY infra + architecture + DX.

# Tech Stack

- Node.js 22
- TypeScript
- pnpm workspace monorepo
- Turborepo
- Fastify
- Docker
- Docker Compose
- ESLint
- Prettier
- Zod
- Redis
- Strict TypeScript
- Clean Architecture mindset

# Goal

Setup a scalable backend monorepo architecture suitable for:

- microservices
- shared packages
- CI/CD
- observability
- Redis
- Supabase
- event-driven architecture
- future Kubernetes deployment

# Required Folder Structure

emx-backend/
│
├── apps/
│ ├── api-gateway/
│ └── auth-service/
│
├── packages/
│ ├── config/
│ ├── typescript-config/
│ ├── eslint-config/
│ ├── logger/
│ └── validation/
│
├── infra/
│ └── docker/
│
├── .github/
│ └── workflows/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json

# Requirements

## Monorepo

- Use pnpm workspaces
- Use Turborepo
- Shared TypeScript config package
- Shared ESLint config package

## TypeScript

- strict mode enabled
- noImplicitAny
- noUncheckedIndexedAccess
- exactOptionalPropertyTypes

## Fastify

- Setup auth-service Fastify server
- Add /health endpoint
- Use async bootstrap pattern

## Docker

Create:

- Dockerfile.dev
- Dockerfile
- docker-compose.yml

docker-compose must include:

- auth-service
- redis

## Shared Configs

Create:

- packages/typescript-config/base.json
- packages/eslint-config/base.js

## Code Quality

Setup:

- ESLint
- Prettier
- consistent formatting
- no any allowed

## Environment Validation

Use:

- dotenv
- zod

Create:

- packages/config/env.ts

## Auth Service

Create:

- apps/auth-service/src/index.ts
- Fastify server
- logging enabled

## Scripts

Ensure all packages contain:

- dev
- build
- lint
- typecheck

# Architecture Constraints

- NEVER mix business logic in routes
- NEVER use Express
- NEVER use any
- NEVER hardcode configs
- NEVER access env directly outside config package

# Engineering Constraints

- Use scalable folder structures
- Use clean naming conventions
- Prefer composition over inheritance
- Prepare architecture for future microservices

# Output Requirements

Generate:

1. Complete folder structure
2. All configuration files
3. Docker files
4. Base Fastify auth-service
5. Correct package.json files
6. Correct tsconfig files
7. Correct turbo configuration
8. Correct workspace configuration

# Important

This is NOT a tutorial project.

This should resemble infrastructure created by experienced backend engineers in production systems.
