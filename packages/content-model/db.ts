/**
 * IEEE SVCE Digital Institution — Database Client
 *
 * Singleton database connection using the postgres driver.
 * Works with both local Docker Postgres and Neon/Supabase in production.
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Validate DATABASE_URL is present (env.ts handles full validation,
// but this provides a clear error if the db module is imported without env setup)
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env.local and configure your database."
  );
}

// Create postgres client
// max: 1 for serverless environments (Vercel), adjust for long-running servers
const client = postgres(connectionString, {
  max: process.env.NODE_ENV === "production" ? 1 : 10,
});

// Create and export the drizzle instance with schema for relational queries
export const db = drizzle(client, { schema });

export type Database = typeof db;
