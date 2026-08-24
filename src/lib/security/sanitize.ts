/**
 * IEEE SVCE Digital Institution — Input Sanitization
 *
 * Defense-in-depth sanitization utilities.
 * Primary defense is Zod validation at the API boundary (packages/validation).
 * This module provides additional sanitization for content that may be rendered.
 */

/**
 * Strip all HTML tags from a string.
 * Use for plain-text fields that should never contain markup.
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Escape HTML entities to prevent XSS when rendering user content.
 * Use when content must be displayed but should not be interpreted as HTML.
 */
export function escapeHtml(input: string): string {
  const escapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return input.replace(/[&<>"']/g, (char) => escapeMap[char] ?? char);
}

/**
 * Sanitize a filename to prevent path traversal and encoding attacks.
 * Generates a safe filename from user input.
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and null bytes
  const cleaned = filename.replace(/[/\\]/g, "").replace(/\0/g, "").replace(/\.\./g, "").trim();

  // If nothing remains, return a fallback
  if (!cleaned || cleaned === "." || cleaned === "..") {
    return "unnamed_file";
  }

  // Limit length
  return cleaned.slice(0, 255);
}

/**
 * Sanitize a URL to prevent javascript: and data: scheme injections.
 * Returns the URL if safe, or null if potentially malicious.
 */
export function sanitizeUrl(url: string): string | null {
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();

  // Block dangerous schemes
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return null;
  }

  // Allow relative URLs and standard schemes
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:")
  ) {
    return trimmed;
  }

  // Reject everything else
  return null;
}
