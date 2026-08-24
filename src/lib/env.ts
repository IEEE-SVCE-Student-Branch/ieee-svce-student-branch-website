/**
 * IEEE SVCE Digital Institution — Environment Validation
 *
 * Validates all required environment variables at startup.
 * If any are missing or invalid, the app will crash immediately
 * with a clear error message rather than failing later.
 */
import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid connection string"),

  // Auth
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET must be at least 16 characters"),
  AUTH_URL: z.string().url("AUTH_URL must be a valid URL").optional(),

  // App
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Parse and validate environment variables.
 * Call this once at app startup.
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const message = Object.entries(errors)
      .map(([key, msgs]) => `  ${key}: ${msgs?.join(", ")}`)
      .join("\n");

    throw new Error(
      `\n❌ Invalid environment variables:\n${message}\n\nSee .env.example for required variables.\n`
    );
  }

  return parsed.data;
}

/**
 * Validated environment — safe to use throughout the app.
 * Lazily initialized to avoid issues during build time.
 */
let _env: Env | undefined;

export function getEnv(): Env {
  if (!_env) {
    _env = validateEnv();
  }
  return _env;
}
