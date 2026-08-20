# Adversarial Architecture Review

**Review date:** 2026-08-20
**Perspective:** 10+ year operational lifetime, student committee turnover every 1–2 years, zero guaranteed institutional memory between committees.

---

## CRITICAL FINDINGS

### SEC-01: No session invalidation model

- **Severity:** CRITICAL
- **Problem:** The Security Model defines four roles (Guest, Member, Committee Member, Admin) but specifies no session management: no token expiry, no refresh rotation, no forced logout on role change, no concurrent session limits.
- **Why:** A graduated committee member's session token could remain valid indefinitely. Over 10 years, dozens of people retain ghost access. If any of those tokens leak, the entire Private OS is compromised.
- **Recommendation:** Define explicit session TTLs. Mandate that role changes (especially demotion during handover) immediately invalidate all sessions for that user. Implement forced re-authentication on privilege escalation.
- **Architectural impact:** Requires session store design (not just stateless JWTs) or short-lived JWTs with a revocation list. Affects SECURITY-MODEL, COMMITTEE-HANDOVER, and the API layer.

---

### SEC-02: No secret rotation lifecycle

- **Severity:** CRITICAL
- **Problem:** COMMITTEE-HANDOVER mentions "key rotation for API secrets and service accounts" but there is no defined lifecycle: when secrets rotate, who triggers it, how the system survives a missed rotation, what happens to running services during rotation.
- **Why:** A student who graduates in 2028 and had access to the Vercel deploy token, database connection string, and object storage key retains those credentials forever unless rotation actually happens. Over 10 years this is a certainty, not a risk.
- **Recommendation:** Define a secret inventory. Each secret must have: owner, rotation trigger (handover event), rotation procedure, and a dead-man's-switch alert if rotation doesn't happen within N days of a handover.
- **Architectural impact:** Requires a secrets inventory document and a handover checklist. Affects COMMITTEE-HANDOVER and DEPLOYMENT.

---

### SEC-03: Audit log is mentioned but not designed

- **Severity:** HIGH
- **Problem:** AGENTS.md rule 9 says "every important institutional mutation must be auditable." SECURITY-MODEL mentions "Audit Logs" in parentheses. No document defines: what gets logged, log schema, retention policy, who can read logs, whether logs are tamper-evident, where logs are stored.
- **Why:** Without a schema, developers will log inconsistently or not at all. Without tamper-evidence, a compromised admin can delete logs covering their tracks. Without retention policy, logs either grow unbounded or get silently purged.
- **Recommendation:** Create a dedicated AUDIT-LOG.md. Define: log event types, schema (who, what, when, before-state, after-state), immutable storage (append-only), retention period (at minimum the archive retention period), access controls (admins can read, nobody can delete).
- **Architectural impact:** New architecture document. Affects DATA-MODEL, SECURITY-MODEL, BACKUP-RECOVERY.

---

### DATA-01: Data model has no schema

- **Severity:** CRITICAL
- **Problem:** DATA-MODEL.md lists six entity names with one-line descriptions. There are no fields, no types, no relationships, no cardinality, no constraints, no indexes. This is an entity list, not a data model.
- **Why:** Without a schema, two developers will build incompatible assumptions about the same entity. Without defined relationships, the knowledge graph is hand-waving. Without constraints, data integrity is enforced nowhere.
- **Recommendation:** Define actual schemas with fields, types, nullability, unique constraints, and foreign keys. Use a notation (ERD, Prisma schema, SQL DDL) that is unambiguous. At minimum define: User, Event, Project, Media, CommitteeTerm, AuditLog, ContentPage, Tag/Topic.
- **Architectural impact:** DATA-MODEL.md must be rewritten as the single source of truth for the database schema. Blocks all implementation work.

---

### DATA-02: No versioning or migration strategy

- **Severity:** HIGH
- **Problem:** No document mentions how the database schema evolves over time. No migration tool, no versioning convention, no rollback procedure.
- **Why:** Over 10 years the schema will change dozens of times. Without migrations, a new committee inheriting the codebase cannot understand what changed, cannot roll back a broken deploy, and cannot reproduce the database state from source control.
- **Recommendation:** Mandate a migration tool (e.g., Prisma Migrate, Drizzle Kit, raw SQL migrations with a runner). All schema changes must be versioned, committed, and reversible.
- **Architectural impact:** Affects DATA-MODEL, DEPLOYMENT, BACKUP-RECOVERY, IMPLEMENTATION-ROADMAP.

---

### DATA-03: Soft-delete without a purge policy is unbounded growth

- **Severity:** MEDIUM
- **Problem:** ARCHIVE.md mandates soft deletes for all database records. Over 10 years, every row ever created persists. No purge policy, no archival tiering, no cold storage strategy.
- **Why:** Table sizes grow monotonically. Queries slow down unless every query includes `WHERE deleted_at IS NULL`. Indexes bloat. Backups grow. Free-tier database limits (DEC-16) will be exceeded.
- **Recommendation:** Define which entities truly require permanent retention (events, people, projects) vs. which can be hard-deleted after archival (drafts, failed uploads, expired sessions). Define an annual archival process that moves old soft-deleted rows to cold storage or export files.
- **Architectural impact:** Affects ARCHIVE, DATA-MODEL, BACKUP-RECOVERY, DEPLOYMENT (storage costs).

---

### BOUNDARY-01: Public/private boundary has no enforcement mechanism

- **Severity:** CRITICAL
- **Problem:** PUBLIC-PRIVATE-BOUNDARY.md states the rule ("private data must never be sent to an unauthorized client") but defines no enforcement. There is no API gateway, no middleware specification, no data serialization boundary, no field-level visibility rules.
- **Why:** The rule is a policy statement, not an architecture. A developer building an API endpoint can accidentally include a private field in a public response. There is nothing structural preventing this.
- **Recommendation:** Define a concrete enforcement layer: (a) separate API route trees for public vs. private, (b) DTO/serialization layer that strips private fields before response, (c) integration tests that assert no private field appears in public API responses. Consider separate database views for public queries.
- **Architectural impact:** Affects TECHNICAL-ARCHITECTURE, SECURITY-MODEL, TESTING, DATA-MODEL.

---

### BOUNDARY-02: SSG build process has access to entire database

- **Severity:** HIGH
- **Problem:** PUBLISHING-PIPELINE says content triggers an SSG build. The SSG build must query the database to generate static pages. If the build process has full database access, a bug in a template could render private data into a public static page that gets deployed to CDN.
- **Why:** Static pages are cached globally. A private field leaked into a static page persists in CDN caches and browser caches even after the source is fixed. This is worse than a dynamic API leak because you cannot instantly revoke it.
- **Recommendation:** The SSG build process must connect through a read-only, public-scoped database view or API that physically cannot return private data. Never give the build process the same credentials as the Private OS.
- **Architectural impact:** Affects PUBLISHING-PIPELINE, PUBLIC-PRIVATE-BOUNDARY, DEPLOYMENT, SECURITY-MODEL.

---

### ARCHIVE-01: "Stable URLs" has no URL scheme

- **Severity:** HIGH
- **Problem:** AGENTS.md rule 8 and ARCHIVE.md require "every important public entity must have a stable URL." No document defines the URL scheme. No routing convention. No redirect policy for when URLs must change.
- **Why:** If the first committee uses `/events/2026/hackathon` and the next committee restructures to `/e/hackathon-2026`, every external link, every Google index entry, and every IEEE report referencing the old URL breaks permanently.
- **Recommendation:** Define a canonical URL scheme now: `/{entity-type}/{year}/{slug}`. Mandate that URL changes require 301 redirects. Store the canonical URL as a field on each entity so it can be validated.
- **Architectural impact:** Affects DATA-MODEL (url_slug field), ARCHIVE, PUBLISHING-PIPELINE, CONTENT-LIFECYCLE.

---

### ARCHIVE-02: No defined export/import format

- **Severity:** HIGH
- **Problem:** The archive is described as "permanent institutional memory" but there is no defined export format. If the platform is replaced in year 5, how does the next system import 5 years of data?
- **Why:** Platforms die. Vendors change pricing. Frameworks become unmaintained. Without a portable export format, the archive is locked inside whatever database and object storage the current platform uses.
- **Recommendation:** Define a standard export format (e.g., JSON-LD, a documented JSON schema per entity, plus a media manifest). Run an annual export as part of backup procedures. Store exports in a vendor-neutral location (e.g., a git repo of JSON files, a ZIP archive).
- **Architectural impact:** Affects ARCHIVE, BACKUP-RECOVERY, DATA-MODEL.

---

### CEE-01: Creative Experience Engine is underspecified to the point of danger

- **Severity:** HIGH
- **Problem:** CREATIVE-EXPERIENCE-ENGINE.md is 13 lines long. It says "composes approved UI components" and "must not generate arbitrary HTML/CSS." It does not define: what a "component" is, what the composition format is, how compositions are stored, how they are rendered, what happens when the design system changes and existing compositions reference removed components.
- **Why:** Without this, the Creative Engine is either never built (committees just hardcode pages, violating AGENTS.md rule 7) or built ad-hoc and becomes the single greatest source of tech debt. A custom visual page builder is one of the hardest things to build correctly.
- **Recommendation:** Define the component registry (a finite list of allowed blocks: Hero, Speaker Grid, Schedule, Gallery, etc.), the composition schema (JSON document referencing component IDs with slot data), and the versioning strategy (compositions pin a design system version). Alternatively, acknowledge this is Phase 3+ and define a simpler interim solution (Markdown + frontmatter templates).
- **Architectural impact:** Affects CREATIVE-EXPERIENCE-ENGINE, CONTENT-LIFECYCLE, EVENT-LIFECYCLE, DATA-MODEL.

---

### VTOOLS-01: vTools integration is built on an unverified assumption

- **Severity:** HIGH
- **Problem:** DEC-14 recommends "Official REST API" for vTools sync but flags the risk as High. The entire vTools synchronization architecture assumes an API exists. No one has verified this.
- **Why:** If vTools has no API (or only a limited one), the entire sync strategy collapses. The architecture has no fallback. Manual entry is not documented as a degraded mode.
- **Recommendation:** Before any implementation: verify what vTools actually provides. Design the sync layer with an explicit manual-entry fallback. The architecture must work even if vTools integration is impossible.
- **Architectural impact:** Affects VTOOLS-SYNCHRONIZATION, EVENT-LIFECYCLE, IMPLEMENTATION-ROADMAP.

---

### PUBLISHING-01: No rollback mechanism

- **Severity:** HIGH
- **Problem:** PUBLISHING-PIPELINE describes a one-way flow: content → build → tests → deploy. There is no rollback step. No "unpublish." No "revert to previous build."
- **Why:** A committee member publishes incorrect information. The only fix is to edit the content and re-deploy. If the build is broken, the incorrect content stays live on CDN until someone fixes the build. Over 10 years, this will happen repeatedly.
- **Recommendation:** Define rollback: (a) the ability to instantly revert to the previous successful deployment, (b) an "unpublish" content state that triggers an immediate rebuild excluding that content, (c) CDN cache purge as part of rollback.
- **Architectural impact:** Affects PUBLISHING-PIPELINE, CONTENT-LIFECYCLE, DEPLOYMENT.

---

### BACKUP-01: 24-hour RPO is unacceptable for an event platform during event season

- **Severity:** MEDIUM
- **Problem:** BACKUP-RECOVERY sets RPO at 24 hours. During a multi-day event (e.g., a hackathon), attendance records, submissions, and real-time data accumulated over 12+ hours could be lost.
- **Why:** Events are the core product. Losing a day of event data is losing the evidence/provenance that AGENTS.md requires.
- **Recommendation:** Define tiered RPO: 24 hours for general content, 1 hour (or continuous WAL archiving) for transactional data during active events. This is achievable with Postgres WAL archiving at zero additional cost on most managed providers.
- **Architectural impact:** Affects BACKUP-RECOVERY, DEPLOYMENT.

---

### BACKUP-02: No backup verification procedure

- **Severity:** HIGH
- **Problem:** BACKUP-RECOVERY says "disaster recovery plan documented for the next committee" but no document describes how to verify that backups actually work. DEC-17 defers the question of who tests DR.
- **Why:** Untested backups are not backups. Over 10 years, backup configurations will silently break. The committee that discovers this will be the one that needs the backup.
- **Recommendation:** Define a semi-annual backup restoration test. Document the exact steps. Make it part of the handover checklist: "incoming committee must successfully restore a backup before accepting the system."
- **Architectural impact:** Affects BACKUP-RECOVERY, COMMITTEE-HANDOVER.

---

### HANDOVER-01: No dead-man's-switch for abandoned systems

- **Severity:** CRITICAL
- **Problem:** No document addresses what happens if a committee simply stops existing, or if the handover process is never initiated. The system assumes an orderly handover always occurs.
- **Why:** Student branches dissolve, lose membership, or simply forget. If the outgoing chair graduates without handing over, and the Branch Counselor doesn't initiate it, the system becomes orphaned: credentials expire, domains lapse, data becomes inaccessible. This will happen within 10 years.
- **Recommendation:** Define an institutional backstop: (a) the Branch Counselor (faculty) must always have emergency access independent of student accounts, (b) critical credentials (domain registrar, cloud account root) must be held by a non-student institutional account, (c) an annual "proof of life" check triggered by the system itself.
- **Architectural impact:** Affects COMMITTEE-HANDOVER, SECURITY-MODEL, DEPLOYMENT.

---

### HANDOVER-02: Key rotation during handover can cause downtime

- **Severity:** MEDIUM
- **Problem:** COMMITTEE-HANDOVER says "key rotation for API secrets and service accounts" during handover. If keys are rotated simultaneously, running services (background jobs, SSG builds, vTools sync) will fail until reconfigured with new keys.
- **Why:** The handover window is the highest-risk moment for the system. Adding a coordinated key rotation to that window without a procedure guarantees at least partial downtime.
- **Recommendation:** Define a two-phase rotation: (a) new keys are provisioned and verified while old keys remain active, (b) old keys are revoked only after all services are confirmed working with new keys. Document the exact sequence.
- **Architectural impact:** Affects COMMITTEE-HANDOVER, DEPLOYMENT, VTOOLS-SYNCHRONIZATION.

---

### PERF-01: No caching strategy defined

- **Severity:** MEDIUM
- **Problem:** No document mentions caching at any layer: CDN cache headers for static assets, API response caching, database query caching, or SSG revalidation strategy (ISR vs. full rebuild).
- **Why:** Without caching, every page view hits the origin. On free-tier hosting (DEC-16), this will hit rate limits or bandwidth caps during traffic spikes (e.g., event registration opens).
- **Recommendation:** Define CDN cache TTLs for static pages, API cache-control headers for public endpoints, and whether the SSG uses full rebuilds or incremental static regeneration.
- **Architectural impact:** Affects TECHNICAL-ARCHITECTURE, PUBLISHING-PIPELINE, DEPLOYMENT.

---

### A11Y-01: Accessibility is a requirement but has no specification

- **Severity:** HIGH
- **Problem:** AGENTS.md rule 11 says "accessibility is a release requirement." TESTING.md mentions "Lighthouse/axe runs." No document defines: which WCAG level (A, AA, AAA), which pages are covered, what score constitutes a pass, or what happens when a third-party embed fails accessibility.
- **Why:** "Accessibility" without a target level is unenforceable. Different developers will interpret it differently. Lighthouse scores fluctuate. Without a defined pass/fail threshold, accessibility becomes aspirational rather than enforced.
- **Recommendation:** Define WCAG 2.1 AA as the target. Define minimum Lighthouse accessibility score (e.g., 90). Define which page templates require manual accessibility review. Add axe-core integration tests that fail the build.
- **Architectural impact:** Affects TESTING, PUBLISHING-PIPELINE, CREATIVE-EXPERIENCE-ENGINE (all composed pages must pass).

---

### MAINT-01: RBAC has no permission granularity

- **Severity:** HIGH
- **Problem:** SECURITY-MODEL defines four roles but no permissions within those roles. "Committee Member" has "write access to specific operational domains" but the domains are undefined.
- **Why:** In practice, different committee members have different responsibilities (events head, design head, content head). Without granular permissions, either every committee member can edit everything (data integrity risk) or the system is too restrictive (usability problem, people work around it).
- **Recommendation:** Define a permission model: either role-based with sub-roles (events_editor, content_editor, media_manager) or resource-based (each entity has an owner/editor list). Document the permission matrix.
- **Architectural impact:** Affects SECURITY-MODEL, DATA-MODEL, COMMITTEE-HANDOVER (role assignment during handover).

---

## OVERENGINEERING WARNINGS

### OE-01: Knowledge Graph is premature

- **Severity:** MEDIUM (overengineering risk)
- **Problem:** The Knowledge Graph is described as "a systemic mapping of all institutional entities to show relationships" with use cases of "discoverability" and "rich archiving context." For a student branch with likely hundreds (not millions) of entities, this is a relational join, not a knowledge graph.
- **Why:** Calling it a "knowledge graph" invites building graph infrastructure. The actual need (Person A spoke at Event B about Topic C) is a many-to-many relationship, trivially handled by junction tables in Postgres.
- **Recommendation:** Rename to "Entity Relationships" or "Cross-references." Implement as standard relational joins with a Tag/Topic taxonomy. If actual graph queries are ever needed (they probably won't be), Postgres recursive CTEs or `ltree` are sufficient.
- **Architectural impact:** Simplifies KNOWLEDGE-GRAPH, DATA-MODEL. Removes a premature abstraction.

---

### OE-02: Creative Experience Engine scope is disproportionate

- **Severity:** HIGH (overengineering risk)
- **Problem:** Building a custom visual page composer is a multi-month project. For a student branch that runs perhaps 10–20 events per year, the investment is disproportionate to the need.
- **Why:** Most events need a page with: title, date, description, speakers, schedule, registration link, and a photo gallery. This is a structured data form + a template, not a page builder.
- **Recommendation:** Phase 1: structured event pages rendered from schema data (frontmatter + Markdown or a typed JSON form). Phase 2 (if ever needed): a simple block editor limited to 5–8 pre-built blocks. Never build a general-purpose page builder.
- **Architectural impact:** Drastically simplifies CREATIVE-EXPERIENCE-ENGINE, reduces implementation time, reduces maintenance burden.

---

### OE-03: Separate subdomain for Private OS adds operational complexity

- **Severity:** LOW (overengineering risk)
- **Problem:** DEC-06 recommends a separate subdomain (os.ieeesvce.com) for cookie isolation. This requires separate DNS records, separate deployment configurations, separate SSL certificates, and CORS configuration between the two origins.
- **Why:** For a student-maintained system on free-tier hosting, the operational overhead of two deployments exceeds the security benefit. Cookie scoping can be achieved with `SameSite` attributes and path-scoped cookies on a single domain.
- **Recommendation:** Use a single domain with path-based routing (`/os/*` for private). Use `SameSite=Strict`, `HttpOnly`, `Secure` cookie attributes. If the team grows sophisticated enough to want subdomain isolation, it can be added later without architectural change.
- **Architectural impact:** Simplifies DEPLOYMENT, PUBLIC-PRIVATE-BOUNDARY.

---

## UNNECESSARY DEPENDENCIES / SERVICES

### UD-01: DEC-05 recommends Auth0 as an option

- **Severity:** LOW
- **Problem:** Auth0 is a paid SaaS with a free tier that has limits. It introduces a vendor dependency for a core capability (authentication) that is straightforward to implement with NextAuth.js / Auth.js.
- **Recommendation:** Use Auth.js (open source, framework-native). Avoid external auth SaaS unless IEEE SSO requires it.

### UD-02: No dependency budget defined

- **Severity:** MEDIUM
- **Problem:** AGENTS.md rule 14 says "do not introduce dependencies without justification" but no document defines how justification is recorded or reviewed.
- **Recommendation:** Add a `deps.md` or a section in ARCHITECTURE-DECISIONS requiring each non-trivial dependency to have a one-line justification and a named alternative.

---

## PREMATURE AI

### AI-01: No AI features are needed yet

- **Severity:** LOW (premature complexity risk)
- **Problem:** AGENTS.md rule 17 says "AI-generated content is never automatically considered institutional truth." CONTENT-LIFECYCLE repeats this. The architecture is correctly cautious. However, neither document defines what AI features (if any) are planned.
- **Why:** The defensive rules are good, but they suggest someone is considering AI content generation. For a student branch platform, AI features are premature. Every AI integration adds cost, complexity, and governance burden.
- **Recommendation:** Explicitly state: "No AI content generation features are in scope for the initial platform. The rule exists as a safeguard against future additions." This prevents a future committee from adding ChatGPT-generated event descriptions without governance.

---

## PREMATURE INFRASTRUCTURE

### PI-01: IaC is premature for free-tier PaaS

- **Severity:** LOW
- **Problem:** DEPLOYMENT.md says "Infrastructure as Code (IaC) preferred." If hosting is Vercel free-tier (DEC-16), there is almost nothing to codify. Vercel projects are configured via `vercel.json` and environment variables.
- **Recommendation:** Replace "IaC preferred" with "deployment configuration must be committed to the repository (e.g., vercel.json, render.yaml)." This achieves the same goal without implying Terraform/Pulumi.

---

## SUMMARY OF MISSING DOCUMENTS

The following architecture documents are referenced or implied by the review but do not exist:

| Document | Why it's needed |
|---|---|
| AUDIT-LOG.md | AGENTS.md rule 9 requires auditability; no spec exists |
| URL-SCHEME.md | AGENTS.md rule 8 requires stable URLs; no scheme exists |
| SECRETS-INVENTORY.md | COMMITTEE-HANDOVER requires key rotation; no inventory exists |
| PERMISSION-MATRIX.md | SECURITY-MODEL defines roles; no permissions defined |
| CACHING-STRATEGY.md | No caching mentioned anywhere; critical for free-tier performance |
| EXPORT-FORMAT.md | ARCHIVE requires reproducibility; no portable format defined |

---

## VERDICTS BY PRIORITY AREA

| Area | Verdict |
|---|---|
| SECURITY | **FAIL.** Session management, secret rotation, and audit logging are undefined. |
| DATA MODEL | **FAIL.** No actual schema exists. Entity list is not a data model. |
| PUBLIC/PRIVATE BOUNDARY | **FAIL.** Policy exists but no enforcement mechanism is designed. |
| ARCHIVE | **WEAK.** Soft-delete policy exists but no export format, no URL scheme, no purge policy. |
| AI INGESTION | **PASS.** Correctly conservative. Should explicitly state "not in scope." |
| CREATIVE ENGINE | **FAIL.** Dangerously underspecified. Will be either never built or built wrong. |
| vTOOLS SYNC | **WEAK.** Built on unverified assumption about API availability. |
| PUBLISHING | **WEAK.** No rollback, no cache strategy, no SSG credential isolation. |
| BACKUP/RECOVERY | **WEAK.** RPO inappropriate for events, no verification procedure. |
| COMMITTEE HANDOVER | **FAIL.** No dead-man's-switch, no secret inventory, no two-phase rotation. |
| PERFORMANCE | **FAIL.** No caching strategy at any layer. |
| ACCESSIBILITY | **WEAK.** Requirement stated but no WCAG level, no pass/fail threshold. |
| MAINTAINABILITY | **WEAK.** Good principles but no dependency governance, no migration strategy. |
