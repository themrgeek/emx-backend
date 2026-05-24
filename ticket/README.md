## 🌍 Database Environments & Development Workflow

To maintain a reliable delivery pipeline and prevent "code rot" or configuration drift, the EmX platform enforces a **Local-First** migration workflow. Developers must perform all schema, security policy, and structural changes on their local instances before pushing to cloud environments.

### Environment Matrix


| Environment                 | Purpose                                                                                | Hosting Platform                         | Access Method                     |
| --------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------- |
| **Local**                   | Active feature development, experimentation, and schema changes.                       | Local Docker Containers via Supabase CLI | `http://localhost:54323` (Studio) |
| **Development (`emx-dev`)** | Shared integration testing, team reviews, and continuous integration (CI) test builds. | Supabase Cloud (Sandboxed Remote)        | Supabase Dashboard                |
| **Production (`emx-prod`)** | Production application facing live end-users. Strict environment controls.             | Supabase Cloud (Isolated Remote)         | Supabase Dashboard                |


---

### 🆚 Local Supabase vs. Remote Dev Project (`emx-dev`)

Understanding when to interact with your local container engine versus the remote cloud development project is vital to keeping our database in sync.

#### 1. Local Supabase Engine (Your Daily Sandbox)

- **When to use:** 99% of your daily backend development. If you are adding tables, tweaking columns, writing Row Level Security (RLS) policies, adjusting authentication hooks, or testing edge functions locally.
- **Why:** It runs entirely on your MacBook via isolated Docker containers. It is fast, works offline, can be safely wiped/reset with `pnpm db:reset` without impacting teammates, and logs database structures automatically into version control text files.
- **Database Connection URL:** `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

#### 2. Remote Dev Project (`emx-dev`)

- **When to use:** When sharing a preview branch deployment with frontend team members, validating live edge integrations, or observing automated GitHub Actions test workflows during a Pull Request review.
- **Why:** It serves as the single source of truth for the *latest approved state* of our application before anything reaches production.
- **Rule of Engagement:** ⚠️ **NEVER manually add tables or alter schemas via the remote Supabase cloud dashboard interface.** Any changes made on the remote console will be overwritten the next time an automated migration script deploys from our Git repository.

---

### 🛠️ Core Team Commands

We wrap the Supabase CLI commands inside developer-friendly `pnpm` targets at the root of the monorepo:

- `pnpm db:start` — Boots your local database, authentication server, storage buckets, and management console using Docker.
- `pnpm db:stop` — Spins down the local container network cleanly without losing persisted data.
- `pnpm db:reset` — Wipes your local Postgres instance completely clean and recreates the schema from scratch by sequentially executing every SQL file inside `supabase/migrations/`.
- `pnpm db:types` — Scans your active local schema layout and automatically compiles auto-completing TypeScript typings into `packages/database/src/generated/supabase.ts`.

---

### 🚀 How to Make Structural Changes (The Migration Lifecycle)

When a task requires modifying our database architecture, follow this exact loop:

1. **Start Environment:** Run `pnpm db:start` to bring up your local machine dependencies.
2. **Generate Migration File:** Run `supabase migration new your_descriptive_change_name`. This will instantiate an empty, timestamped `.sql` file in `supabase/migrations/`.
3. **Write the Schema Alteration:** Open the new `.sql` file and add your structural commands (e.g., `CREATE TABLE...`, `ALTER TABLE...`).
4. **Apply and Validate:** Run `pnpm db:reset` to verify your SQL file executes error-free from top-to-bottom.
5. **Update Application Contracts:** Run `pnpm db:types` to regenerate your TypeScript typings so your application code inherits the updated tables.
6. **Commit to Git:** Stage and push the migration text files alongside your codebase changes. The CI pipeline will pick them up and apply them systematically downstream.

