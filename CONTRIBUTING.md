# Contributing to IEEE SVCE Student Branch Website

Thank you for contributing to the IEEE SVCE Student Branch platform. This document outlines the guidelines and workflow for contributing to this codebase.

---

## Branch Naming Conventions

Always create a new branch from `main` when working on a task. Use descriptive names formatted as follows:

- `feature/<short-name>` — New user-facing features or capabilities (e.g., `feature/event-filtering`)
- `fix/<short-name>` — Bug fixes (e.g., `fix/mobile-nav-overflow`)
- `design/<short-name>` — Styling, theme, or animation improvements (e.g., `design/particle-glow`)
- `content/<short-name>` — Content updates or data file adjustments (e.g., `content/2026-exco-list`)
- `docs/<short-name>` — Documentation updates or additions (e.g., `docs/api-guide`)

---

## Commit Message Guidelines

We follow Conventional Commits format to keep commit history readable:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes only
- `style:` Changes that do not affect code logic (formatting, missing semi-colons)
- `refactor:` Code refactoring without adding features or fixing bugs
- `test:` Adding or updating tests
- `chore:` Maintenance tasks, build configuration, or repository cleanup

**Examples**:
```text
feat(team): add team member social links filter
fix(nav): resolve mobile explore menu focus trap
docs(readme): update build verification instructions
```

---

## Pull Request Expectations

Before opening a Pull Request (PR):

1. **Verify your code locally**:
   ```bash
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   ```
2. **Clean git status**: Ensure no untracked build files or temporary logs are staged.
3. **Descriptive PR Title & Summary**:
   - Briefly explain what changed and why.
   - Attach screenshots/recordings for UI/visual changes.
   - List test cases verified.

---

## Asset Guidelines

- **Official Logos**: `public/ieee.svg` and `public/svce.svg` are official brand vector files. **Never modify, recolor, or distort these files.**
- **Team Photographs**: Store team photos in `public/team/`.
  - Format: `.jpg` or `.png`.
  - Resolution: Recommended 800x800 maximum, compressed for web performance.
  - File Naming: Use exact member name matching data records (e.g., `Janelle_Rebecca.jpg`).

---

## Accessibility & Responsive Standards

- **Semantic HTML**: Use proper `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, and `<nav>` elements.
- **Keyboard Navigation**: Ensure all interactive elements (buttons, links, menus) are reachable and operable using `Tab` and `Enter`/`Space`.
- **Reduced Motion**: Respect user preferences. Wrap canvas or CSS animations in `prefers-reduced-motion` media query checks:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animated-element {
      animation: none;
    }
  }
  ```
- **Responsive QA**: Test UI layouts across device breakpoints:
  - Mobile Small: `360px`
  - Mobile Large / Tablet: `768px`
  - Desktop: `1024px`
  - Wide Desktop: `1440px+`

---

## Dependency Policy

- Avoid introducing external libraries for simple tasks that can be accomplished using native Web APIs or standard React/CSS techniques.
- If a new dependency is strictly necessary, provide a clear rationale in your Pull Request description.

---

## Visual Quality Assurance

- No visual overlaps, unstyled text shifts (CLS), or broken layout bounds on small screens.
- Keep animation frame rates smooth (60fps) by using CSS transforms or throttled canvas animation loops.
- Maintain consistent color contrast ratios for text readability against backgrounds.
