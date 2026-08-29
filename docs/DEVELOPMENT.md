# IEEE SVCE Website — Development Guide

This guide provides technical details on the architecture, component organization, styling strategy, data structures, and build pipeline for the IEEE SVCE Student Branch platform.

---

## 1. Application Structure

The platform uses Next.js 15 App Router (`src/app/`):

```text
src/
├── app/
│   ├── (public)/          # Route group for all public-facing pages
│   │   ├── page.tsx       # Landing page (Signal Field, Hero, Featured initiatives)
│   │   ├── about/         # About branch, vision, executive leadership
│   │   ├── team/          # Team showcase and member cards
│   │   ├── events/        # Event listing and filtering
│   │   ├── innovation/    # Student projects & technology initiatives
│   │   ├── contact/       # Contact information & location map
│   │   └── ...            # Additional institutional routes
│   ├── os/                # Route group for private committee operating system
│   │   ├── page.tsx       # OS dashboard homepage
│   │   └── login/         # Authenticated member login
│   ├── api/               # API handlers (NextAuth auth routes, data APIs)
│   ├── globals.css        # Global CSS variables, reset, font definitions
│   └── layout.tsx         # Root HTML structure, font loading, metadata
├── components/            # Client & Server UI components
├── lib/                   # Utility libraries, schema definitions, data arrays
└── types/                 # Shared TypeScript interfaces
```

---

## 2. Component Organization

Components are organized by scope and usage:

- **Global Shell Components**:
  - `PageShell.tsx` — Layout wrapper providing header, footer, background particle field, and page transition wrappers.
  - `SiteHeader.tsx` / `SiteHeader.module.css` — Top navigation bar, brand logos, quick actions, and mobile drawer trigger.
  - `SiteFooter.tsx` / `SiteFooter.module.css` — Institutional footer with quick links, social channels, and copyright.
  - `ExploreMenu.tsx` / `ExploreMenu.module.css` — Overlay menu for instant section navigation.

- **Interactive Visual Components**:
  - `SignalField/SignalFieldHero.tsx` — Hero banner with interactive canvas-driven signal nodes.
  - `ParticleField.tsx` — Background canvas particle renderer with performance throttling.
  - `ScrollReveal.tsx` — IntersectionObserver wrapper for smooth scroll-triggered element animations.
  - `TeamCard.tsx` — Visual member card component displaying profile photo, role, and social links.

---

## 3. Styling Strategy

The project uses **Vanilla CSS with CSS Modules** (`.module.css`) to ensure optimal performance, scoped class names, and complete design control without heavy utility frameworks.

### Design Tokens (`globals.css`)
Centralized CSS variables define color schemes, typography scale, spacing, and glass effects:

```css
:root {
  --color-ieee-blue: #00629b;
  --color-ieee-dark: #002855;
  --color-svce-gold: #c59b27;
  --bg-primary: #040814;
  --text-primary: #f0f4f8;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: 16px;
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

---

## 4. Data & Content Organization

Institutional content is managed in static, strongly-typed data modules under `src/lib/data/`:

- `branch-data.ts`: Contains structured listings for:
  - Executive Committee members (`EXECUTIVE_COMMITTEE`)
  - Society & Affinity Group chairs
  - Event directories and category metadata
  - Innovation projects and flagship initiatives
- `discovery.ts`: Defines navigation routes, search keywords, and site menu trees used by `ExploreMenu`.

---

## 5. Asset Organization

- `public/ieee.svg` — Official IEEE vector brand mark.
- `public/svce.svg` — Official SVCE vector brand mark.
- `public/team/` — Executive committee photograph assets. File names match member names (e.g., `Janelle_Rebecca.jpg`).

---

## 6. Animation Approach

- **Canvas Signal / Particle Fields**: Implemented using HTML5 Canvas (`<canvas>`) rendered via `requestAnimationFrame` loops.
- **Throttling & Performance**: Animation frames pause when the browser tab is hidden (`document.hidden`) or when reduced motion is requested.
- **CSS Transitions**: Micro-interactions (hovers, menu transitions, card lifts) use hardware-accelerated CSS properties (`transform`, `opacity`).

---

## 7. Responsive Layout Strategy

Mobile-first responsive design using CSS Media Queries and fluid CSS functions:
- Fluid sizing: `font-size: clamp(1rem, 2vw + 0.5rem, 2.5rem);`
- Flexbox & CSS Grid for fluid element reflows.
- Tested across viewports from 360px up to 4K displays.

---

## 8. Testing Strategy

- **Unit Testing**: [Vitest](https://vitest.dev/) for data utility functions and component rendering logic.
- **E2E Testing**: [Playwright](https://playwright.dev/) for verifying page routes and interactive user journeys.

Command:
```bash
npm run test
```

---

## 9. Build Pipeline

The production build pipeline follows standard Next.js compilation:

1. `tsc --noEmit` validates TypeScript types.
2. `next lint` verifies ESLint rules.
3. `next build` compiles optimized static and dynamic routes to `.next/`.
