# IEEE SVCE Student Branch Website

Official institutional web platform for the **IEEE SVCE Student Branch** (Sri Venkateswara College of Engineering).

---

## Project Overview

The IEEE SVCE Student Branch platform serves as the permanent digital institution for the student branch. It provides:
- A public digital experience showcasing branch events, chapters, societies, team members, and innovation projects.
- An institutional archive for past events, publications, and records.
- A private committee operating system (`/os`) for internal committee workflows and administrative operations.

---

## Current Status

This repository is the **official active development codebase** for the IEEE SVCE Student Branch website. All future contributions, feature additions, and maintenance should be conducted within this repository following the contribution guidelines.

---

## Tech Stack

The application is built using the following modern web stack:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Logic**: [React 19](https://react.dev/), [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS with [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) and CSS custom properties (design tokens)
- **Testing**: [Vitest](https://vitest.dev/) for unit testing, [Playwright](https://playwright.dev/) for end-to-end verification
- **Authentication**: [NextAuth v5 (Beta)](https://authjs.dev/)
- **Database & ORM**: [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL (`postgres` client)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Logging**: [Pino](https://getpino.io/)

---

## Project Structure

```text
ieee-svce-digital-institution/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public portal routes (Home, About, Team, Events, etc.)
│   │   ├── os/                # Private committee operating system portal
│   │   ├── api/               # API routes (authentication, data handlers)
│   │   ├── globals.css        # Global CSS design tokens and base styles
│   │   ├── layout.tsx         # Root application layout
│   │   └── not-found.tsx      # Custom 404 page
│   ├── components/            # Reusable UI components & animation canvas modules
│   └── lib/                   # Data sources, discovery routes, and utility functions
├── public/
│   ├── brand/                 # Official brand resources
│   ├── ieee.svg               # Official IEEE logo mark
│   ├── svce.svg               # Official SVCE logo mark
│   └── team/                  # Executive committee member photographs
├── tests/                     # Automated test suites
├── docs/                      # Technical documentation & architecture decisions (ADRs)
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── vitest.config.ts           # Test runner configuration
```

---

## Running Locally

To set up and run the project locally on your machine:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Verification

Before submitting pull requests or pushing commits, run all verification commands to ensure code health:

```bash
# 1. Check code style and linting
npm run lint

# 2. Run TypeScript type checking
npm run typecheck

# 3. Execute unit tests
npm run test

# 4. Create production build
npm run build
```

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development settings:

```bash
cp .env.example .env.local
```

Key environment variables:
- `AUTH_SECRET`: Secret key for session encryption.
- `DATABASE_URL`: PostgreSQL database connection string.

> [!WARNING]
> NEVER commit `.env` or `.env.local` files containing secrets to the repository.

---

## Design System

The visual language follows IEEE and SVCE official identity guidelines combined with modern web aesthetics:
- **Branding Colors**: Deep IEEE Blue (`#00629B`), crisp whites, subtle dark-mode accents, and golden highlights.
- **Typography**: Clean sans-serif typography with fluid viewport scaling (`clamp()`).
- **Glassmorphism**: Backdrop blur effects and translucent panels for content overlays.
- **Spatial Animations**: Interactive Canvas-based particle/signal fields with reduced-motion support.
- **Explore Navigation**: Quick-navigation overlay menu for rapid access to all site sections.
- **Responsive Layout**: Designed mobile-first, supporting phones, tablets, and wide desktop displays.
- **Accessibility**: Full keyboard navigation, screen reader support, and system preference detection (`prefers-reduced-motion`).

---

## Official Assets

The SVG files located at:
- `public/ieee.svg`
- `public/svce.svg`

are official brand assets. **Do NOT distort, recolor, modify, or replace these assets with unofficial logos.**

---

## Team Assets

Photographs of executive committee members are stored in:
- `public/team/`

**Naming Convention**: Member image files are named after the member's full name (e.g., `FirstName_LastName.jpg` or `FirstName LastName.png`). Ensure images are optimized for web display before committing.

---

## Architecture

The platform uses Next.js 15 App Router architecture with strict public/private boundaries:
- **Public Domain (`src/app/(public)`)**: Statically renderable public pages designed for high performance, SEO optimization, and fast load times.
- **Private Domain (`src/app/os`)**: Authenticated committee portal for internal management, member access, and operational workflows.
- **Data Layer (`src/lib/data/`)**: Centralized data modules (`branch-data.ts`, `discovery.ts`) providing structured content without hardcoding within presentation components.

---

## Routes / Pages

### Public Routes
- `/` - Main Landing Page & Branch Overview
- `/about` - About IEEE SVCE Student Branch & Leadership
- `/achievements` - Chapter & Branch Achievements
- `/archive` - Institutional Historical Archive
- `/certificates` - Certificate Verification Portal
- `/community` - Student Branch Community & Societies
- `/contact` - Contact Details & Branch Location
- `/events` - Event Directory & Flagship Initiatives
- `/gallery` - Visual Event Archive
- `/innovation` - Student Projects & Innovation Showcase
- `/learn` - Educational Workshops & Resources
- `/media` - Press Releases & Media Kit
- `/partners` - Institutional Partners & Collaborators
- `/people` - Executive Leadership Directory
- `/reports` - Annual & Activity Reports
- `/team` - Executive Committee & Team Showcase

### Committee OS Routes
- `/os` - Operating System Portal Dashboard
- `/os/login` - Operating System Authentication Page

---

## Development Workflow

Follow this standard process for contributing changes:

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Implement your changes following project patterns.
3. Run code formatting: `npm run format`
4. Run linting: `npm run lint`
5. Run type checks: `npm run typecheck`
6. Run unit tests: `npm run test`
7. Run production build: `npm run build`
8. Review your changes: `git diff`
9. Commit with clear messages: `git commit -m "feat: add feature description"`
10. Push branch and open a Pull Request against `main`.

---

## Contribution Rules

- **Dependencies**: Do not add external packages without team approval and clear justification.
- **Architecture**: Respect the public/private boundary and existing directory structure.
- **Official Logos**: Never modify `public/ieee.svg` or `public/svce.svg`.
- **Secrets**: Never commit API keys, database credentials, or secret tokens.
- **Build Artifacts**: Ensure `.next/`, `out/`, `dist/`, `node_modules/` are not committed.
- **Quality Assurance**: Always run lint, typecheck, test, and build before requesting code review.

---

## Current Milestones

- **Phase 1 Foundation**: Initial project setup, Next.js architecture, public layout, and data schema.
- **Phase 1.6 Signal Field Polish**: Enhanced interactive particle animations, Explore menu polish, and updated team data.
- **v1.6.0 Team Handoff Release**: Repository cleanup, team collaboration documentation, and official GitHub release.
