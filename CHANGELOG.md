# Changelog

All notable changes and verified milestones for the IEEE SVCE Student Branch website platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.6.0] - Team Handoff Release

### Added
- Created comprehensive team collaboration documentation: `README.md`, `CONTRIBUTING.md`, `docs/DEVELOPMENT.md`, and `CHANGELOG.md`.
- Expanded `.gitignore` rules for standard Next.js, TypeScript, log, and environment file exclusions.
- Added visual components: `ParticleField`, `ScrollReveal`, `TeamCard`, and `Home` components.
- Added executive team photographic assets under `public/team/`.
- Added brand SVG assets under `public/ieee.svg` and `public/svce.svg`.

### Changed
- Polished public portal pages (`about`, `contact`, `events`, `innovation`, `team`, home page).
- Refactored `SignalField` and `ExploreMenu` UI modules for improved responsive rendering and performance.
- Updated branch leadership and team data schemas in `src/lib/data/branch-data.ts`.

---

## [Phase 1.6] - Signal Field & UI Polish (`3b807fe`)

### Added
- Interactive `SignalFieldHero` hero section with animated node grid canvas.
- Global `ExploreMenu` overlay search and fast-navigation menu.
- Dynamic data discovery matrix (`src/lib/data/discovery.ts`).

### Changed
- Enhanced page layout headers, footers, and page shell wrappers.

---

## [Architecture Milestone] - Platform Architecture Setup (`eb8764e`)

### Added
- Established core platform architecture decisions (`docs/adr/`).
- Configured Next.js 15 App Router structure with public portal and private committee OS route groups.
- Set up Drizzle ORM schema, Vitest testing, and NextAuth v5 authentication structure.

---

## [Foundation] - Initial Project Foundation (`06ce3fd`)

### Added
- Initialized Next.js 15 application with React 19 and TypeScript.
- Configured ESLint, Prettier, and base project structure.

---

*Note: Historical content prior to git foundation commit `06ce3fd`: CONTENT / HISTORY PENDING VERIFICATION.*
