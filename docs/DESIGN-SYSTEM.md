# Design System Specification

## Overview
This document defines the foundational design system for the IEEE SVCE Digital Institution. All UI development, including the Creative Experience Engine, must strictly adhere to these specifications.

## 1. Design Principles
- **Modern & Premium**: Visually stunning, leveraging modern web design aesthetics (glassmorphism, vibrant yet controlled color palettes).
- **Accessible (WCAG 2.1 AA)**: All contrast ratios must pass minimum accessibility standards.
- **Consistent**: No ad-hoc utility classes. All styles must map to defined tokens.

## 2. Token System

### Colors
Defined as logical tokens, not hex values in code.
- `primary`: The brand identity color (IEEE Blue derivative).
- `secondary`: Accents and highlights.
- `background`: Main app background.
- `surface`: Card and modal backgrounds.
- `text-primary`: High contrast text.
- `text-secondary`: Muted text.
- `error`: Destructive actions.
- `success`: Positive feedback.
- `warning`: Cautionary feedback.

### Typography (Inter / Roboto)
- `h1`: 48px, bold, tight tracking
- `h2`: 36px, semibold
- `h3`: 24px, medium
- `body-large`: 18px, regular
- `body-base`: 16px, regular
- `body-small`: 14px, regular

### Spacing & Layout
Based on an 8px grid.
- `space-1`: 4px
- `space-2`: 8px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px

## 3. Component Inventory (Phase 1)
These are the approved components that can be used across the application:
1. **Button**: Primary, Secondary, Outline, Ghost, Danger variants.
2. **Input/Form**: Text input, textarea, select, checkbox (with error states).
3. **Card**: Surface for content grouping.
4. **Dialog/Modal**: Overlays requiring user interaction.
5. **Toast/Alert**: Ephemeral notifications.
6. **Navigation**: Topbar, sidebar.

*Future phases will expand this inventory for the Creative Experience Engine.*
