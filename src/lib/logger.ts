/**
 * IEEE SVCE Digital Institution — Structured Logger
 *
 * Uses Pino for structured JSON logging. All application code should
 * use this logger instead of console.log.
 *
 * In production: JSON output for machine parsing.
 * In development: Pretty-printed for readability.
 */
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
  ...(process.env.NODE_ENV !== "production" && {
    transport: {
      target: "pino/file",
      options: { destination: 1 }, // stdout
    },
  }),
});

/**
 * Create a child logger scoped to a specific module.
 *
 * @example
 * const log = createLogger("auth");
 * log.info({ userId }, "User logged in");
 */
export function createLogger(module: string) {
  return logger.child({ module });
}
