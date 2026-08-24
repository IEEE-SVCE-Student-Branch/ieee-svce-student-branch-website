# Phase 1 Specification (Foundation)

## Overview
This document specifies the concrete implementation requirements for Phase 1. Do not implement application features (like Event CRUD or UI components) yet. Focus solely on establishing a secure, scalable foundation.

## 1. Repository & Local Development
- Initialize Next.js project using App Router (`npx create-next-app`).
- Strict TypeScript (`"strict": true`).
- ESLint and Prettier configured.
- Local development relies on Docker (e.g., `docker-compose.yml`) for running local PostgreSQL instance to ensure environment parity without requiring cloud dependencies for local dev.

## 2. Next.js Public App & Private App Shell
- **Routing Structure**:
  - `/(public)`: Public marketing site routes.
  - `/os`: Private operations system root.
- **Layouts**: Separate root layouts for public (SEO optimized) and private (Authenticated shell).

## 3. PostgreSQL & Content Model
- Define foundational schema using a migration tool (e.g., Prisma or Drizzle).
- **Required Entities (Phase 1)**: User, Role, Session (if using database sessions).
- Setup migration scripts in package.json (`npm run db:migrate`).
- Enforce schema definitions before any code reads/writes data.

## 4. Authentication & RBAC Foundation
- Implement Auth.js (NextAuth) using local directory credentials or magic links.
- Define explicit session TTLs.
- Implement middleware to protect `/os/*` routes. Unauthenticated users are redirected to login.
- **Role Constants**: Define Guest, Member, Committee Member, Admin in code.

## 5. Security Foundations
- **CSRF**: Configure Auth.js CSRF protection. Ensure all custom API routes modifying state use CSRF tokens or `SameSite=Strict` cookie enforcement.
- **Rate Limiting**: Implement basic in-memory or Redis-based rate limiting on authentication and API routes (e.g., `@upstash/ratelimit` if using Vercel, or simple middleware for local).
- **Sanitization**: Introduce a library like `isomorphic-dompurify` or `xss`. Define a utility function for sanitizing user inputs.
- **Media Security**: Create an upload handler skeleton that validates file magic bytes and file size before passing to storage.

## 6. Error Handling & Observability
- Define standard API error responses (Standardized JSON structure: `{ error: { code, message } }`).
- Implement a global error boundary for React components.
- Setup basic structured logging (e.g., using `pino` or `winston`).
- (Observability integration like Sentry is deferred to deployment setup, but logging must be structured now).

## 7. CI/CD & Deployment Foundation
- Setup GitHub Actions workflow:
  - Trigger: Push to `main` and Pull Requests.
  - Jobs: Linting, Typechecking, Unit Tests (Vitest setup), Accessibility (axe-core on a static build output).
- Ensure configuration is ready for deployment to Vercel/similar without requiring manual UI configuration where possible (e.g., via `vercel.json`).
