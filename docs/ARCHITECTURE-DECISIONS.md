# Architecture Decisions (Phase 1 Resolution)

## Resolved Decisions (Phase 1)

These decisions are finalized to unblock Phase 1 Foundation implementation.

- **Frontend Framework**: Next.js (App Router). Best ecosystem for static public site and dynamic private OS.
- **Database Provider**: PostgreSQL. Robust JSON support, standard relational features.
- **Authentication**: NextAuth.js / Auth.js (Local Directory). No Auth0 vendor lock-in.
- **Private OS Boundary**: Same domain with path-based routing (`/os/*`), secured via `SameSite=Strict`, `HttpOnly`, `Secure` cookies. Separate subdomain adds unnecessary operational complexity for free-tier.
- **CI/CD Platform**: GitHub Actions.
- **Deployment & Hosting**: Consolidate to two vendors maximum: Next.js frontend/API on Vercel, PostgreSQL on Neon or Supabase.
- **Testing Frameworks**: Vitest (Unit), Playwright (E2E), axe-core (Accessibility).
- **Background Jobs**: Triggered via HTTP endpoints, invoked by external cron (e.g., GitHub Actions schedule) to stay within free-tier limits.
- **Dependency Governance**: Any new dependency requires justification added to a `deps.md` file.

## Deferred Decisions (Phase 2+)

These decisions are explicitly deferred. Do not overdesign solutions for them during Phase 1.

- **Mobile Experience Strategy**: (PWA vs Native). Defer.
- **Creative Experience Engine Implementation**: Defer all custom visual builders.
- **vTools Sync Method**: Defer until API access is verified.
- **vTools Schema Mapping**: Defer.
- **Source of Truth for Events**: Defer conflict resolution between Platform and vTools.
- **Knowledge Graph GraphDB vs Relational**: Defer (using Postgres relational joins for now).
- **Archive Snapshots & URL Scheme**: Defer detailed scheme until content model is finalized.
- **Media Limitations & Storage**: Defer full media pipeline. Phase 1 will implement basic security validation, but storage strategy is deferred.
- **Event Registration Ownership**: Defer (internal vs external registration).
- **Notification System**: Defer (email vs webhook vs in-app).
