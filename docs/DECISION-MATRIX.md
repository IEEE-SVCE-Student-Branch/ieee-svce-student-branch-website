# Architecture Decision Matrix

## Decisions

### DEC-01: Mobile Experience Strategy
- **Decision:** Should the mobile experience be a PWA or a separate native application?
- **Options:** PWA (Progressive Web App), Native Mobile App (iOS/Android), Responsive Web Only
- **Recommended option:** PWA
- **Reason:** Avoids app store overhead, works on all devices, easier for future committees to maintain without native mobile devs.
- **Impact:** Mobile user experience, development effort.
- **Risk:** Low
- **Can defer?** YES

### DEC-02: Frontend Framework
- **Decision:** Which specific frontend framework will be standard?
- **Options:** Next.js, Astro, Nuxt
- **Recommended option:** Next.js
- **Reason:** Best ecosystem, easy SSG support for public site and SSR for private OS.
- **Impact:** All UI development, build pipeline.
- **Risk:** High
- **Can defer?** NO

### DEC-03: Database Provider
- **Decision:** Which specific database provider will host the relational data?
- **Options:** PostgreSQL, MySQL, SQLite
- **Recommended option:** PostgreSQL
- **Reason:** Robust JSON support, extensible for basic graph queries if needed later.
- **Impact:** Data access layer, deployments.
- **Risk:** Medium
- **Can defer?** NO

### DEC-04: vTools Schema Mapping
- **Decision:** What is the exact schema for vTools event synchronization?
- **Options:** 1:1 mapping with vTools, Custom superset schema
- **Recommended option:** Custom superset schema
- **Reason:** Platform needs rich data (media, extended descriptions) beyond what vTools natively stores.
- **Impact:** Integration layer, event data structure.
- **Risk:** Medium
- **Can defer?** YES

### DEC-05: Authentication System
- **Decision:** Will we integrate with IEEE Account (SSO) for authentication, or maintain a local directory?
- **Options:** IEEE Account SSO, Local Directory (Auth0/NextAuth)
- **Recommended option:** Local Directory
- **Reason:** IEEE SSO might be complex to integrate for student branches without official API access; local directory provides more control.
- **Impact:** Login flow, user provisioning, security.
- **Risk:** High
- **Can defer?** NO

### DEC-06: Private OS Boundary
- **Decision:** Will the Private OS be hosted on a separate subdomain to strictly separate cookies and CORS policies?
- **Options:** Same domain (e.g. ieeesvce.com/os), Separate subdomain (os.ieeesvce.com)
- **Recommended option:** Separate subdomain
- **Reason:** Strictly isolates cookies, CORS policies, and potential XSS vulnerabilities from the public site.
- **Impact:** Routing, DNS, deployment configuration.
- **Risk:** Medium
- **Can defer?** NO

### DEC-07: Content Approval Rights
- **Decision:** Who holds the final approval rights for publishing major institutional content?
- **Options:** Chair/Vice-Chair, Content Head, Any Committee Member
- **Recommended option:** Content Head
- **Reason:** Distributes workload while maintaining quality control.
- **Impact:** Workflow speed, content quality.
- **Risk:** Low
- **Can defer?** YES

### DEC-08: Source of Truth for Events
- **Decision:** Should vTools be the absolute source of truth, or should our platform be the source of truth that pushes to vTools?
- **Options:** vTools is source of truth, Platform is source of truth
- **Recommended option:** Platform is source of truth
- **Reason:** Allows draft states and rich media planning before official vTools publication.
- **Impact:** API synchronization logic, data flow.
- **Risk:** High
- **Can defer?** YES

### DEC-09: Media Limitations
- **Decision:** What are the maximum file size limits and supported formats for media uploads?
- **Options:** 5MB (Images only), 20MB (Images+PDF), Unlimited
- **Recommended option:** 20MB (Images+PDF)
- **Reason:** Balances storage costs with typical use cases.
- **Impact:** Storage budget, upload components.
- **Risk:** Low
- **Can defer?** YES

### DEC-10: Creative Experience Engine
- **Decision:** Will the Engine use a headless CMS visual editor, or a custom-built component composer?
- **Options:** Headless CMS, Custom component composer
- **Recommended option:** Custom component composer (JSON based)
- **Reason:** Ensures strict adherence to design system without CMS bloat.
- **Impact:** How pages are built, CMS complexity.
- **Risk:** Medium
- **Can defer?** YES

### DEC-11: Knowledge Graph DB
- **Decision:** Will a standard relational database suffice for graph queries, or is a specialized graph DB justified?
- **Options:** Relational DB (Postgres), Specialized Graph DB (Neo4j)
- **Recommended option:** Relational DB (Postgres)
- **Reason:** Aligns with "no unnecessary dependencies" rule. Postgres can handle simple graph relations perfectly.
- **Impact:** Query complexity, infrastructure footprint.
- **Risk:** Low
- **Can defer?** NO

### DEC-12: Archive Snapshots
- **Decision:** How will static snapshots of old sites be hosted to ensure URLs remain stable indefinitely?
- **Options:** S3 buckets, Vercel/Cloudflare static projects
- **Recommended option:** Vercel/Cloudflare static projects
- **Reason:** Free/cheap and provides stable CDN URLs.
- **Impact:** Long-term archival reliability.
- **Risk:** Low
- **Can defer?** YES

### DEC-13: Search Infrastructure
- **Decision:** Is native database search sufficient for our performance and typo-tolerance requirements?
- **Options:** Postgres Native Search, External service (Algolia/Elasticsearch)
- **Recommended option:** Postgres Native Search
- **Reason:** Minimizes external dependencies; sufficient for thousands of records.
- **Impact:** Search accuracy, external costs.
- **Risk:** Low
- **Can defer?** NO

### DEC-14: vTools Sync Method
- **Decision:** Does IEEE vTools provide a supported API for our specific needs, or does it require RPA/Scraping?
- **Options:** Official REST API, Web Scraping
- **Recommended option:** Official REST API
- **Reason:** Scraping is brittle and violates "failure tolerant" principle.
- **Impact:** Feasibility of automatic sync.
- **Risk:** High
- **Can defer?** YES

### DEC-15: CI/CD Platform
- **Decision:** Which CI/CD platform will execute the publishing pipeline?
- **Options:** GitHub Actions, Vercel CI
- **Recommended option:** GitHub Actions
- **Reason:** Integrated with repository, highly customizable for accessibility and linting checks.
- **Impact:** Deployment speed, developer experience.
- **Risk:** Medium
- **Can defer?** NO

### DEC-16: Deployment Budget & Platform
- **Decision:** What is the approved budget for deployment hosting, guiding the choice of platforms?
- **Options:** Free-tier PaaS (Vercel/Render), Paid VPS
- **Recommended option:** Free-tier PaaS
- **Reason:** Zero-cost maintenance for future student committees.
- **Impact:** Operational cost, system architecture constraints.
- **Risk:** High
- **Can defer?** NO

### DEC-17: Backup/DR Testing
- **Decision:** Who is responsible for testing the disaster recovery process annually?
- **Options:** Webmaster, Chairperson, Branch Counselor
- **Recommended option:** Webmaster
- **Reason:** Technical role suited for verifying data integrity.
- **Impact:** Recovery preparedness.
- **Risk:** Low
- **Can defer?** YES

### DEC-18: Testing Frameworks
- **Decision:** Which testing frameworks will be standardized?
- **Options:** Jest/Cypress, Vitest/Playwright
- **Recommended option:** Vitest/Playwright
- **Reason:** Modern, fast, excellent Next.js/React integration.
- **Impact:** Developer workflow, test reliability.
- **Risk:** Low
- **Can defer?** NO

### DEC-19: Handover Verification
- **Decision:** What is the exact verification process for authenticating the incoming committee members?
- **Options:** Branch Counselor email approval, Outgoing Chair manual provisioning
- **Recommended option:** Branch Counselor email approval
- **Reason:** Adds an institutional authority layer to prevent rogue takeovers.
- **Impact:** Security of transitions.
- **Risk:** High
- **Can defer?** YES

### DEC-20: Target Dates
- **Decision:** What are the target dates for each phase?
- **Options:** Fixed dates, Semester-based milestones
- **Recommended option:** Semester-based milestones
- **Reason:** Aligns with academic calendar flexibility.
- **Impact:** Project pacing.
- **Risk:** Low
- **Can defer?** YES


## Key Identifications

### 1. 5 architecture decisions that affect the most code
- **DEC-02:** Frontend Framework (Dictates all UI code and build processes)
- **DEC-03:** Database Provider (Dictates ORM, SQL dialect, and data access patterns)
- **DEC-08:** Source of Truth for Events (Dictates core business logic and sync complexity)
- **DEC-10:** Creative Experience Engine (Dictates how page components are structured and rendered)
- **DEC-05:** Authentication System (Dictates middleware, session handling, and user context)

### 2. 5 decisions affecting security/data
- **DEC-05:** Authentication System (Protects user identity and sessions)
- **DEC-06:** Private OS Boundary (Isolates administrative cookies from public XSS)
- **DEC-19:** Handover Verification (Prevents unauthorized long-term access)
- **DEC-16:** Deployment Budget & Platform (Dictates where data physically lives)
- **DEC-08:** Source of Truth for Events (Determines how data flows to external systems)

### 3. 5 decisions affecting long-term maintainability
- **DEC-02:** Frontend Framework (Needs to be popular enough for future students to learn)
- **DEC-11:** Knowledge Graph DB (Avoiding specialized DBs keeps the tech stack simple)
- **DEC-13:** Search Infrastructure (Avoiding external search engines reduces moving parts)
- **DEC-16:** Deployment Budget & Platform (Free-tier ensures the site won't go down if a credit card expires)
- **DEC-01:** Mobile Experience Strategy (PWAs are easier to maintain than separate iOS/Android apps)

### 4. Decisions we can safely defer
- **DEC-01:** Mobile Experience Strategy
- **DEC-04:** vTools Schema Mapping
- **DEC-07:** Content Approval Rights
- **DEC-08:** Source of Truth for Events
- **DEC-09:** Media Limitations
- **DEC-10:** Creative Experience Engine Implementation
- **DEC-12:** Archive Snapshots
- **DEC-14:** vTools Sync Method
- **DEC-17:** Backup/DR Testing Responsibility
- **DEC-19:** Handover Verification
- **DEC-20:** Target Dates
