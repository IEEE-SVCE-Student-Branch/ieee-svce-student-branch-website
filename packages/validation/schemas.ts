/**
 * IEEE SVCE Digital Institution — Validation Schemas
 *
 * Zod schemas for validating and sanitizing user input.
 * All API routes must validate input through these schemas.
 */
import { z } from "zod";

/**
 * Sanitize a string by stripping HTML tags and trimming whitespace.
 * This is a defense-in-depth measure — not a replacement for
 * context-aware output encoding.
 */
function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

// ----- Auth Schemas -----

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email too long")
    .transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long").transform(stripHtml),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email too long")
    .transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long"),
});

// ----- Generic Sanitization -----

/** Sanitize a plain text string (strip HTML, trim, enforce max length) */
export const safeString = (maxLength = 1000) =>
  z.string().max(maxLength, `Text must be at most ${maxLength} characters`).transform(stripHtml);

/** Sanitize a slug (URL-safe string) */
export const slugSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format");

// ----- Type Exports -----

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
