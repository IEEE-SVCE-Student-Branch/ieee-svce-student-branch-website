/**
 * IEEE SVCE Digital Institution — Design System Tokens
 *
 * These are the foundational design tokens. All UI code must reference
 * these tokens instead of hardcoding values.
 *
 * See docs/DESIGN-SYSTEM.md for the specification.
 */

export const colors = {
  // Brand
  primary: "hsl(214, 84%, 46%)",
  primaryLight: "hsl(214, 84%, 56%)",
  primaryDark: "hsl(214, 84%, 36%)",

  // Accents
  secondary: "hsl(262, 72%, 56%)",
  secondaryLight: "hsl(262, 72%, 66%)",

  // Surfaces
  background: "hsl(220, 20%, 97%)",
  backgroundDark: "hsl(220, 26%, 10%)",
  surface: "hsl(0, 0%, 100%)",
  surfaceDark: "hsl(220, 26%, 14%)",

  // Text
  textPrimary: "hsl(220, 26%, 10%)",
  textSecondary: "hsl(220, 10%, 46%)",
  textOnPrimary: "hsl(0, 0%, 100%)",

  // Feedback
  error: "hsl(0, 72%, 51%)",
  success: "hsl(142, 71%, 45%)",
  warning: "hsl(38, 92%, 50%)",
  info: "hsl(214, 84%, 46%)",

  // Borders
  border: "hsl(220, 13%, 87%)",
  borderDark: "hsl(220, 13%, 26%)",
} as const;

export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    h1: "3rem",
    h2: "2.25rem",
    h3: "1.5rem",
    bodyLarge: "1.125rem",
    bodyBase: "1rem",
    bodySmall: "0.875rem",
    caption: "0.75rem",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

export const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

export const borderRadius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

export const transitions = {
  fast: "150ms ease",
  normal: "250ms ease",
  slow: "350ms ease",
} as const;
