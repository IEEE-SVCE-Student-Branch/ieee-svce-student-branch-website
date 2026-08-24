/**
 * IEEE SVCE Digital Institution — Standardized Error Handling
 *
 * Provides a consistent error response format for all API routes.
 * Response shape: { error: { code: string, message: string } }
 */
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createLogger } from "./logger";

const log = createLogger("errors");

/**
 * Application error with an HTTP status code and machine-readable code.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

// Common error factories
export const Errors = {
  badRequest: (message = "Bad request") => new AppError(400, "BAD_REQUEST", message),
  unauthorized: (message = "Unauthorized") => new AppError(401, "UNAUTHORIZED", message),
  forbidden: (message = "Forbidden") => new AppError(403, "FORBIDDEN", message),
  notFound: (message = "Not found") => new AppError(404, "NOT_FOUND", message),
  conflict: (message = "Conflict") => new AppError(409, "CONFLICT", message),
  tooManyRequests: (message = "Too many requests") =>
    new AppError(429, "TOO_MANY_REQUESTS", message),
  internal: (message = "Internal server error") => new AppError(500, "INTERNAL_ERROR", message),
};

/**
 * Convert any error into a standardized JSON response.
 * Safe to use in API route catch blocks.
 */
export function errorResponse(error: unknown): NextResponse {
  // Known application error
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message } },
      { status: error.statusCode }
    );
  }

  // Zod validation error
  if (error instanceof ZodError) {
    const messages = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: messages.join("; ") } },
      { status: 400 }
    );
  }

  // Unknown error — log and return generic 500
  log.error({ err: error }, "Unhandled error in API route");
  return NextResponse.json(
    { error: { code: "INTERNAL_ERROR", message: "Internal server error" } },
    { status: 500 }
  );
}
