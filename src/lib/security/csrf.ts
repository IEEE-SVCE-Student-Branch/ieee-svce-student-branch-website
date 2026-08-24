/**
 * IEEE SVCE Digital Institution — CSRF Protection
 *
 * Auth.js handles CSRF for its own routes. This module provides CSRF
 * protection for custom API routes that perform state changes.
 *
 * Strategy: Double Submit Cookie pattern.
 * - A CSRF token is set as an HttpOnly cookie.
 * - The client sends the same token in a custom header.
 * - The server verifies they match.
 */
import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "../logger";

const log = createLogger("csrf");

const CSRF_COOKIE_NAME = "__ieee_csrf";
const CSRF_HEADER_NAME = "x-csrf-token";

/**
 * Generate a cryptographically random CSRF token.
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Set a CSRF token cookie on a response.
 */
export function setCsrfCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
  return response;
}

/**
 * Validate the CSRF token from a request.
 * Returns true if valid, false if invalid.
 */
export function validateCsrf(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken) {
    log.warn("CSRF validation failed: missing token");
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  if (cookieToken.length !== headerToken.length) {
    log.warn("CSRF validation failed: token length mismatch");
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < cookieToken.length; i++) {
    mismatch |= cookieToken.charCodeAt(i) ^ headerToken.charCodeAt(i);
  }

  if (mismatch !== 0) {
    log.warn("CSRF validation failed: token mismatch");
    return false;
  }

  return true;
}

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME };
