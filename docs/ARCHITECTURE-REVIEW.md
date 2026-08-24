# Adversarial Architecture Review

**Review date:** 2026-08-20 (Pass 2)
**Perspective:** 10+ year operational lifetime, student committee turnover every 1–2 years, zero guaranteed institutional memory between committees.
**Method:** Attempt to break every system, exploit every gap, predict every failure mode.

---

## PART 1: CRITICAL FINDINGS

---

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

### SEC-04: No rate limiting or abuse protection anywhere

- **Severity:** HIGH
- **Problem:** No document mentions rate limiting on any endpoint: public API, authentication attempts, media uploads, search queries, or content publishing. The Private OS has no brute-force protection on login.
- **Why:** A student branch website is a soft target. Without rate limiting, a single script can: enumerate all members via the people API, DDoS the site into exceeding free-tier bandwidth caps (causing downtime or unexpected charges), brute-force admin credentials, or spam the event RSVP system with fake registrations. On free-tier hosting (DEC-16), bandwidth-based abuse is especially dangerous because it can trigger account suspension.
- **Recommendation:** Define rate limiting at two layers: (a) CDN/edge-level rate limiting for all public endpoints (Vercel/Cloudflare provide this), (b) application-level rate limiting for authentication (max 5 failures per 15 minutes per IP), media uploads (max N per hour per user), and API calls (reasonable per-user quotas).
- **Architectural impact:** Affects SECURITY-MODEL, TECHNICAL-ARCHITECTURE, DEPLOYMENT.

---

### SEC-05: Media uploads are an unprotected attack vector

- **Severity:** HIGH
- **Problem:** MEDIA-LIFECYCLE says "uploaded by authorized users" and "automatic optimization (resizing, format conversion)." No document addresses: file type validation (beyond extension), malware scanning, EXIF stripping, image bomb protection, SVG XSS prevention, or path traversal in filenames.
- **Why:** An authorized committee member (or a compromised committee account) can upload: an SVG containing embedded JavaScript (XSS via media CDN), an image with 100,000 x 100,000 pixel dimensions (image bomb that crashes the optimization pipeline), a file with a crafted filename containing `../` (path traversal), or a file with sensitive EXIF data (GPS coordinates of members). The "permanent institutional record" policy means malicious uploads persist forever unless explicitly purged.
- **Recommendation:** Define a media validation pipeline: (a) allowlist file types by magic bytes, not extension, (b) strip EXIF metadata on ingestion, (c) reject images exceeding reasonable dimensions (e.g., 10,000 x 10,000), (d) sanitize SVGs or convert to raster, (e) generate all filenames server-side (never trust client filenames), (f) serve media from a separate domain/CDN origin to isolate any XSS.
- **Architectural impact:** Affects MEDIA-LIFECYCLE, SECURITY-MODEL, TECHNICAL-ARCHITECTURE.

---

### SEC-06: No CSRF protection model

- **Severity:** HIGH
- **Problem:** No document mentions Cross-Site Request Forgery protection. The Private OS performs state-changing operations (publish content, modify roles, initiate handover) via authenticated API calls, but no CSRF mitigation is specified.
- **Why:** If a committee member visits a malicious page while logged into the Private OS, that page can silently submit requests to the Private OS API using the member's cookies. This could publish content, modify events, or even trigger handover actions without the member's knowledge.
- **Recommendation:** Mandate CSRF tokens on all state-changing endpoints, or use `SameSite=Strict` cookies combined with custom request headers (e.g., `X-Requested-With`) that cannot be set by cross-origin forms.
- **Architectural impact:** Affects SECURITY-MODEL, TECHNICAL-ARCHITECTURE, PUBLIC-PRIVATE-BOUNDARY.

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

### DATA-04: No multi-tenancy or year-partitioning strategy

- **Severity:** MEDIUM
- **Problem:** The data model makes no distinction between "current year's active data" and "historical data from 8 years ago." All events, projects, and members from all years share the same tables with no partitioning.
- **Why:** After 10 years, the events table contains events from 10 different committees. Public queries for "upcoming events" must scan past all historical events. The Private OS dashboard shows the current committee's work, but must filter through all historical data to do so. Without partitioning or a clear `committee_term_id` foreign key on every entity, cross-committee data attribution becomes ambiguous.
- **Recommendation:** Every mutable entity (Event, Project, ContentPage, Media) must carry a `committee_term_id` foreign key. This enables: (a) efficient queries scoped to the current term, (b) clean archival per committee term, (c) clear provenance of who created what, (d) handover-based data freezing (outgoing committee's data becomes read-only).
- **Architectural impact:** Affects DATA-MODEL, ARCHIVE, COMMITTEE-HANDOVER, SEARCH.

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

### BOUNDARY-03: No content sanitization layer defined

- **Severity:** HIGH
- **Problem:** PUBLIC-PRIVATE-BOUNDARY says "public site is built from sanitized, approved data." No document defines what "sanitized" means. There is no specification for HTML sanitization, Markdown rendering safety, or user-generated content filtering.
- **Why:** Committee members enter event descriptions, project summaries, and page content. If this content is rendered as raw HTML, any committee member can inject arbitrary JavaScript into the public site (stored XSS). If content passes through the Creative Experience Engine, the sanitization gap is even wider because the engine composes richer structures.
- **Recommendation:** Define a sanitization boundary: (a) all user-authored content is stored as Markdown or structured JSON, never raw HTML, (b) Markdown rendering uses a strict allowlist of HTML tags (no `<script>`, `<iframe>`, `<object>`, event handlers), (c) sanitization happens at write-time (content is sanitized before storage) AND render-time (defense in depth).
- **Architectural impact:** Affects CONTENT-LIFECYCLE, CREATIVE-EXPERIENCE-ENGINE, PUBLISHING-PIPELINE, SECURITY-MODEL.

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

### ARCHIVE-03: "Immutable storage" is undefined and probably unavailable on free tier

- **Severity:** MEDIUM
- **Problem:** ARCHIVE.md says "immutable storage for critical media." This implies object-lock or WORM storage. Free-tier object storage (Vercel Blob, Cloudflare R2 free tier, Supabase Storage) does not offer immutability guarantees. Anyone with the storage credentials can delete or overwrite files.
- **Why:** If a compromised admin or a sloppy handover leads to someone deleting media, the "permanent institutional record" is gone. The architecture claims immutability it cannot deliver.
- **Recommendation:** Either (a) drop the "immutable" claim and instead implement versioning + deletion protection via application-level checks and backup verification, or (b) define which specific storage provider offers actual immutability within budget. Be honest about what the architecture can actually guarantee.
- **Architectural impact:** Affects ARCHIVE, MEDIA-LIFECYCLE, DEPLOYMENT, BACKUP-RECOVERY.

---

### CEE-01: Creative Experience Engine is underspecified to the point of danger

- **Severity:** HIGH
- **Problem:** CREATIVE-EXPERIENCE-ENGINE.md is 13 lines long. It says "composes approved UI components" and "must not generate arbitrary HTML/CSS." It does not define: what a "component" is, what the composition format is, how compositions are stored, how they are rendered, what happens when the design system changes and existing compositions reference removed components.
- **Why:** Without this, the Creative Engine is either never built (committees just hardcode pages, violating AGENTS.md rule 7) or built ad-hoc and becomes the single greatest source of tech debt. A custom visual page builder is one of the hardest things to build correctly.
- **Recommendation:** Define the component registry (a finite list of allowed blocks: Hero, Speaker Grid, Schedule, Gallery, etc.), the composition schema (JSON document referencing component IDs with slot data), and the versioning strategy (compositions pin a design system version). Alternatively, acknowledge this is Phase 3+ and define a simpler interim solution (Markdown + frontmatter templates).
- **Architectural impact:** Affects CREATIVE-EXPERIENCE-ENGINE, CONTENT-LIFECYCLE, EVENT-LIFECYCLE, DATA-MODEL.

---

### CEE-02: Creative Engine compositions have no preview/staging separation

- **Severity:** MEDIUM
- **Problem:** The event lifecycle says the Creative Engine generates "promotional pages" at the Promotion phase. No document describes how a committee member previews a composed page before it goes live. There is no staging environment, no preview URL scheme, no draft rendering pipeline.
- **Why:** Without preview, committee members either: (a) publish directly and fix mistakes live (unprofessional, violates institutional credibility), or (b) never use the engine because they can't verify output (back to hardcoding pages). Either outcome defeats the purpose.
- **Recommendation:** Define a preview mode: composed pages can be rendered at a private preview URL (e.g., `/preview/{page-id}`) accessible only to authenticated users. Preview rendering uses the same pipeline as production but does not deploy to CDN.
- **Architectural impact:** Affects CREATIVE-EXPERIENCE-ENGINE, PUBLISHING-PIPELINE, PUBLIC-PRIVATE-BOUNDARY.

---

### VTOOLS-01: vTools integration is built on an unverified assumption

- **Severity:** HIGH
- **Problem:** DEC-14 recommends "Official REST API" for vTools sync but flags the risk as High. The entire vTools synchronization architecture assumes an API exists. No one has verified this.
- **Why:** If vTools has no API (or only a limited one), the entire sync strategy collapses. The architecture has no fallback. Manual entry is not documented as a degraded mode.
- **Recommendation:** Before any implementation: verify what vTools actually provides. Design the sync layer with an explicit manual-entry fallback. The architecture must work even if vTools integration is impossible.
- **Architectural impact:** Affects VTOOLS-SYNCHRONIZATION, EVENT-LIFECYCLE, IMPLEMENTATION-ROADMAP.

---

### VTOOLS-02: No conflict resolution for bidirectional sync

- **Severity:** MEDIUM
- **Problem:** DEC-08 recommends "platform is source of truth" for events but vTools is used for "compliance and centralized reporting." If someone edits an event directly in vTools (which will happen), the platform and vTools will have conflicting data. No conflict resolution strategy exists.
- **Why:** IEEE section officers may edit events in vTools directly. Branch counselors report through vTools. If the platform doesn't detect or reconcile these edits, the two systems diverge silently. The "source of truth" claim becomes a lie.
- **Recommendation:** Define explicit conflict handling: (a) the platform periodically reads vTools state and flags discrepancies, (b) discrepancies are surfaced to the committee as alerts, not auto-resolved, (c) document which fields are authoritative from which source (e.g., vTools owns the official event date for IEEE reporting purposes; the platform owns extended descriptions and media).
- **Architectural impact:** Affects VTOOLS-SYNCHRONIZATION, EVENT-LIFECYCLE, DATA-MODEL.

---

### PUBLISHING-01: No rollback mechanism

- **Severity:** HIGH
- **Problem:** PUBLISHING-PIPELINE describes a one-way flow: content → build → tests → deploy. There is no rollback step. No "unpublish." No "revert to previous build."
- **Why:** A committee member publishes incorrect information. The only fix is to edit the content and re-deploy. If the build is broken, the incorrect content stays live on CDN until someone fixes the build. Over 10 years, this will happen repeatedly.
- **Recommendation:** Define rollback: (a) the ability to instantly revert to the previous successful deployment, (b) an "unpublish" content state that triggers an immediate rebuild excluding that content, (c) CDN cache purge as part of rollback.
- **Architectural impact:** Affects PUBLISHING-PIPELINE, CONTENT-LIFECYCLE, DEPLOYMENT.

---

### PUBLISHING-02: Build failures leave the site in an undefined state

- **Severity:** MEDIUM
- **Problem:** PUBLISHING-PIPELINE says tests run during the build. If the build fails (type error, accessibility test fails, linting error), the pipeline stops. But no document specifies: does the old deployment remain live? Is anyone notified? Is there a retry? What if the build fails for 2 weeks because no committee member can fix it?
- **Why:** On a static site, a failed build means the live site is stale, not broken. But stale content (e.g., showing an event that happened two weeks ago as "upcoming") is still a problem. Without notification, the committee may not even know the build is failing.
- **Recommendation:** Define build failure handling: (a) failed builds must send a notification (email, Slack, or in-app alert), (b) the previous successful deployment remains live (explicit blue-green or atomic deployment), (c) a build staleness alert fires if no successful build has occurred in N days.
- **Architectural impact:** Affects PUBLISHING-PIPELINE, DEPLOYMENT, TESTING.

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

### BACKUP-03: 4-hour RTO is a fantasy without a runbook

- **Severity:** MEDIUM
- **Problem:** BACKUP-RECOVERY claims a 4-hour Recovery Time Objective. There is no runbook, no documented recovery procedure, no list of services to restore, no order of operations, and no assignment of who performs recovery.
- **Why:** A 4-hour RTO means a student — likely one who has never done this before, possibly one who joined the committee last month — must: identify the failure, access backup storage, provision a new database, restore the backup, update connection strings, verify data integrity, redeploy all services, and validate the site works. Without a step-by-step runbook, this takes days, not hours.
- **Recommendation:** Write an actual runbook. Test it during handover. A stated RTO without a tested procedure is marketing, not architecture.
- **Architectural impact:** Affects BACKUP-RECOVERY, COMMITTEE-HANDOVER, DEPLOYMENT.

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

### HANDOVER-03: No knowledge transfer mechanism

- **Severity:** HIGH
- **Problem:** COMMITTEE-HANDOVER covers technical assets (roles, keys, audit logs) but says nothing about knowledge transfer. There is no onboarding documentation, no recorded walkthrough, no admin guide, no "how to deploy," "how to publish an event," or "how to debug a failed build."
- **Why:** Technical handover (rotating keys, changing roles) takes an hour. Knowledge transfer takes weeks. Without documented operational procedures, the new committee will spend their first semester figuring out how the system works instead of using it. By the time they understand it, their term is half over.
- **Recommendation:** Define an operations guide (`docs/OPERATIONS.md`) covering: how to publish content, how to create an event, how to deploy, how to restore a backup, how to debug a failed build, how to add a new committee member. Make updating this guide part of the handover checklist.
- **Architectural impact:** Affects COMMITTEE-HANDOVER, IMPLEMENTATION-ROADMAP. New document required.

---

### PERF-01: No caching strategy defined

- **Severity:** MEDIUM
- **Problem:** No document mentions caching at any layer: CDN cache headers for static assets, API response caching, database query caching, or SSG revalidation strategy (ISR vs. full rebuild).
- **Why:** Without caching, every page view hits the origin. On free-tier hosting (DEC-16), this will hit rate limits or bandwidth caps during traffic spikes (e.g., event registration opens).
- **Recommendation:** Define CDN cache TTLs for static pages, API cache-control headers for public endpoints, and whether the SSG uses full rebuilds or incremental static regeneration.
- **Architectural impact:** Affects TECHNICAL-ARCHITECTURE, PUBLISHING-PIPELINE, DEPLOYMENT.

---

### PERF-02: No build performance budget

- **Severity:** MEDIUM
- **Problem:** The publishing pipeline triggers a full SSG build on every content change. No document addresses build duration limits. After 10 years of accumulated content (hundreds of events, thousands of media references), the SSG build could take 10+ minutes.
- **Why:** Free-tier CI/CD has build-time limits (Vercel: 45 minutes, GitHub Actions: 6 hours but with concurrency limits). If the build exceeds these limits, the site cannot be updated. This is a creeping failure — it works fine in year 1 and breaks silently in year 5.
- **Recommendation:** Define a build time budget (e.g., < 5 minutes). Design the SSG to build only active content (current year + N recent years) at build time, serving older archival content from pre-built snapshots or on-demand ISR. Monitor build duration in CI.
- **Architectural impact:** Affects PUBLISHING-PIPELINE, ARCHIVE, DEPLOYMENT.

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

### MAINT-02: No error monitoring or observability

- **Severity:** HIGH
- **Problem:** No document mentions error tracking, application monitoring, uptime monitoring, or alerting. The architecture has no way to know when something is broken unless a user reports it.
- **Why:** Student committees do not proactively check server logs. If a background job (vTools sync, backup, media optimization) fails silently, it stays failed until someone notices the consequences — potentially months later. If the public site throws 500 errors on a specific page, nobody knows until an external visitor complains (if they bother).
- **Recommendation:** Define minimal observability: (a) uptime monitoring via a free service (e.g., UptimeRobot, Checkly free tier, or a GitHub Actions cron ping), (b) error tracking via a lightweight solution (e.g., Sentry free tier or structured logging to a queryable store), (c) build failure notifications to a committee communication channel. Keep it simple — the goal is "someone gets pinged when something breaks."
- **Architectural impact:** Affects TECHNICAL-ARCHITECTURE, DEPLOYMENT, TESTING. Potentially new OBSERVABILITY.md document.

---

### MAINT-03: No design system specification

- **Severity:** MEDIUM
- **Problem:** AGENTS.md and CREATIVE-EXPERIENCE-ENGINE.md repeatedly reference "the design system" and "approved components." No document defines what the design system is: no color tokens, no typography scale, no spacing system, no component inventory, no naming convention.
- **Why:** Without a design system specification, every committee builds their own visual language. The public site looks different every year. The Creative Engine cannot "adhere to the design system" if the design system doesn't exist as a specification. Over 10 years, the frontend becomes an archaeological site of layered styles.
- **Recommendation:** Define a design system document (`docs/DESIGN-SYSTEM.md`) or use a tool like Storybook. At minimum specify: color palette (tokens, not hex values), typography scale, spacing scale, and a list of approved UI components with their props/variants.
- **Architectural impact:** Affects CREATIVE-EXPERIENCE-ENGINE, PUBLISHING-PIPELINE, TECHNICAL-ARCHITECTURE. New document required.

---

## PART 2: OVERENGINEERING WARNINGS

---

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

### OE-04: "Evidence/provenance system" is listed in AGENTS.md but has no document and no definition

- **Severity:** MEDIUM (overengineering risk)
- **Problem:** AGENTS.md lists "evidence/provenance system" as a core platform component. EVENT-LIFECYCLE mentions "capturing evidence/provenance." No architecture document defines what this system is, what it stores, how it differs from audit logs or media attachments, or what problems it solves.
- **Why:** Without a definition, "evidence/provenance" is a buzzword that either gets silently dropped (wasted architecture slot) or gets interpreted by a future developer as something complex (blockchain provenance? cryptographic attestation?) when the actual need is probably "attach photos and a report PDF to the event record."
- **Recommendation:** Either (a) define it concretely (e.g., "evidence = media attachments + attendance records + post-event report linked to an event entity; provenance = audit log entries showing who uploaded what and when"), or (b) remove it as a named system and fold the functionality into EVENT-LIFECYCLE and MEDIA-LIFECYCLE.
- **Architectural impact:** Clarifies AGENTS.md scope. Potentially removes an entire undefined subsystem.

---

## PART 3: UNNECESSARY DEPENDENCIES / SERVICES

---

### UD-01: DEC-05 recommends Auth0 as an option

- **Severity:** LOW
- **Problem:** Auth0 is a paid SaaS with a free tier that has limits. It introduces a vendor dependency for a core capability (authentication) that is straightforward to implement with NextAuth.js / Auth.js.
- **Recommendation:** Use Auth.js (open source, framework-native). Avoid external auth SaaS unless IEEE SSO requires it.

---

### UD-02: No dependency budget defined

- **Severity:** MEDIUM
- **Problem:** AGENTS.md rule 14 says "do not introduce dependencies without justification" but no document defines how justification is recorded or reviewed.
- **Recommendation:** Add a `deps.md` or a section in ARCHITECTURE-DECISIONS requiring each non-trivial dependency to have a one-line justification and a named alternative.

---

### UD-03: Three separate frontend/backend/database hosts is unnecessary fragmentation

- **Severity:** MEDIUM
- **Problem:** DEPLOYMENT.md lists three separate hosting concerns: Edge network for frontend, PaaS for backend, managed DB service. DEC-16 recommends free-tier PaaS. This implies three separate vendor accounts, three billing relationships, three failure domains, three sets of credentials to rotate at handover.
- **Why:** Next.js on Vercel (or a similar full-stack platform) can serve the frontend, run API routes as serverless functions, and connect to a managed Postgres (e.g., Vercel Postgres, Neon, Supabase). This is two vendors (hosting + database), not three. Minimizing vendor count directly reduces handover burden and credential sprawl.
- **Recommendation:** Consolidate to two services maximum: one full-stack hosting platform (Vercel or equivalent) and one managed database (Neon, Supabase, or equivalent). Object storage can be the hosting platform's built-in blob storage. Do not introduce a third vendor unless absolutely necessary.
- **Architectural impact:** Simplifies DEPLOYMENT, COMMITTEE-HANDOVER (fewer credentials), BACKUP-RECOVERY.

---

## PART 4: PREMATURE AI

---

### AI-01: No AI features are needed yet

- **Severity:** LOW (premature complexity risk)
- **Problem:** AGENTS.md rule 17 says "AI-generated content is never automatically considered institutional truth." CONTENT-LIFECYCLE repeats this. The architecture is correctly cautious. However, neither document defines what AI features (if any) are planned.
- **Why:** The defensive rules are good, but they suggest someone is considering AI content generation. For a student branch platform, AI features are premature. Every AI integration adds cost, complexity, and governance burden.
- **Recommendation:** Explicitly state: "No AI content generation features are in scope for the initial platform. The rule exists as a safeguard against future additions." This prevents a future committee from adding ChatGPT-generated event descriptions without governance.

---

### AI-02: No policy for AI crawling/scraping of public content

- **Severity:** LOW
- **Problem:** The architecture does not address whether the public site should allow or disallow AI training crawlers (GPTBot, CCBot, etc.). As a public educational institution's site, this is a policy decision with long-term implications.
- **Why:** If the site contains original student work (project descriptions, event reports), AI crawlers will ingest it. If the branch wants to control this, they need `robots.txt` directives and potentially `ai.txt` now, not after the content is already indexed.
- **Recommendation:** Define a `robots.txt` policy for AI crawlers as part of the public site configuration. This is a one-line config decision but should be documented as a policy choice.
- **Architectural impact:** Minor. Affects PUBLISHING-PIPELINE (robots.txt generation).

---

## PART 5: PREMATURE INFRASTRUCTURE

---

### PI-01: IaC is premature for free-tier PaaS

- **Severity:** LOW
- **Problem:** DEPLOYMENT.md says "Infrastructure as Code (IaC) preferred." If hosting is Vercel free-tier (DEC-16), there is almost nothing to codify. Vercel projects are configured via `vercel.json` and environment variables.
- **Recommendation:** Replace "IaC preferred" with "deployment configuration must be committed to the repository (e.g., vercel.json, render.yaml)." This achieves the same goal without implying Terraform/Pulumi.

---

### PI-02: "Scheduled background jobs" have no runtime

- **Severity:** MEDIUM
- **Problem:** VTOOLS-SYNCHRONIZATION mentions "scheduled background jobs." MEDIA-LIFECYCLE implies "automatic optimization." COMMITTEE-HANDOVER uses "automated scripts." No architecture document specifies where these background jobs run. Vercel free-tier does not support persistent background workers. Cron jobs require either a separate service or Vercel Cron (limited to once per day on free tier).
- **Why:** This is a hidden infrastructure requirement. Background jobs need a runtime. If the architecture doesn't plan for this, developers will either: (a) skip background jobs and make everything synchronous (breaking vTools sync and media optimization), or (b) introduce an unplanned service (violating "no unnecessary microservices").
- **Recommendation:** Decide now: are background jobs handled by (a) Vercel Cron (limited), (b) GitHub Actions scheduled workflows (free, flexible), or (c) a lightweight external cron service? Document this in TECHNICAL-ARCHITECTURE. Design all background tasks to be triggered via HTTP endpoints so they can be invoked by any cron scheduler.
- **Architectural impact:** Affects TECHNICAL-ARCHITECTURE, VTOOLS-SYNCHRONIZATION, MEDIA-LIFECYCLE, DEPLOYMENT.

---

## PART 6: HIDDEN DECISIONS THAT WILL HURT LATER

---

### HD-01: No decision on event registration ownership

- **Problem:** EVENT-LIFECYCLE mentions "attendance tracking" and RSVP. No document specifies whether the platform handles event registration itself or delegates to external tools (Google Forms, Eventbrite, etc.).
- **Why this hurts later:** If registration is external, the platform has no attendance data to archive. If registration is internal, it needs form builder capabilities, email confirmations, capacity limits, waitlists — a significant feature set not represented anywhere in the architecture.
- **Recommendation:** Decide now. If external: define how external registration data is imported for archival. If internal: add registration as a core entity in DATA-MODEL and a major feature in IMPLEMENTATION-ROADMAP.

---

### HD-02: No decision on email/notification system

- **Problem:** No document mentions email. The platform has authenticated users (members, committee) but no specification for how they receive notifications: event reminders, content approval requests, handover alerts, build failure notifications, dead-man's-switch pings.
- **Why this hurts later:** Email is infrastructure. Adding it later requires choosing a provider, configuring DNS (SPF, DKIM, DMARC), designing templates, and handling bounce/complaint management. If deferred, the system has no way to communicate with its own users outside of them manually visiting the site.
- **Recommendation:** Define a notification strategy. Options: (a) email via a transactional provider (Resend, SendGrid free tier), (b) in-app notifications only, (c) webhook to a Telegram/Discord bot. Pick one and document it.

---

### HD-03: No decision on domain ownership

- **Problem:** No document specifies who owns the domain name, where it's registered, or how DNS is managed. This is the single most important infrastructure credential for a 10-year platform.
- **Why this hurts later:** If the domain is registered under a graduating student's personal account, the domain is lost when that student stops paying or loses access. This has killed more student organization websites than any technical failure.
- **Recommendation:** Document in DEPLOYMENT or a new INFRASTRUCTURE-OWNERSHIP.md: the domain must be registered under an institutional account (college IT, faculty advisor, or a dedicated IEEE SVCE account with a non-personal recovery email). The Branch Counselor must have registrar access.

---

### HD-04: No decision on hosting account ownership

- **Problem:** Same as HD-03 but for Vercel/hosting provider accounts. If the Vercel project is under a student's personal GitHub account, the platform is hostage to that student's continued cooperation.
- **Why this hurts later:** Student graduates → doesn't respond to emails → Vercel project is inaccessible → site goes down → new committee must rebuild deployment from scratch.
- **Recommendation:** All hosting and CI/CD must use an organizational GitHub account (e.g., `github.com/ieee-svce`) and organizational hosting accounts. Personal accounts must never be the sole owner of production infrastructure.

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
| DESIGN-SYSTEM.md | Creative Engine and AGENTS.md reference "the design system"; it doesn't exist |
| OPERATIONS.md | No operational runbook for day-to-day tasks or DR recovery |
| INFRASTRUCTURE-OWNERSHIP.md | Domain, hosting, and database account ownership undocumented |

---

## VERDICTS BY PRIORITY AREA

| Area | Verdict | Key blockers |
|---|---|---|
| SECURITY | **FAIL** | No sessions, no CSRF, no rate limiting, no media validation, no secret lifecycle |
| DATA MODEL | **FAIL** | No schema. Cannot implement anything until fields and relationships exist. |
| PUBLIC/PRIVATE BOUNDARY | **FAIL** | Policy without enforcement. SSG has full DB access. No sanitization layer. |
| ARCHIVE | **WEAK** | No export format, no URL scheme, no purge policy, fake immutability claim |
| AI INGESTION | **PASS** | Correctly conservative. Add "not in scope" statement and robots.txt policy. |
| CREATIVE ENGINE | **FAIL** | 13 lines of specification for the hardest feature. Will be built wrong or not at all. |
| vTOOLS SYNC | **WEAK** | Unverified API assumption. No conflict resolution. No fallback mode. |
| PUBLISHING | **WEAK** | No rollback, no build failure handling, no cache strategy, no preview mode |
| BACKUP/RECOVERY | **WEAK** | RPO too coarse, RTO is fiction without a runbook, no verification procedure |
| COMMITTEE HANDOVER | **FAIL** | No dead-man's-switch, no knowledge transfer, no infrastructure ownership, no tested runbook |
| PERFORMANCE | **FAIL** | No caching, no build budget, will break on free-tier limits under load |
| ACCESSIBILITY | **WEAK** | No WCAG level, no threshold, no enforcement |
| MAINTAINABILITY | **FAIL** | No observability, no design system, no dependency governance, no operations guide |
