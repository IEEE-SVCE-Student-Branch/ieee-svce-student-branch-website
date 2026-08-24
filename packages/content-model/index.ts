/**
 * IEEE SVCE Digital Institution — Content Model
 *
 * Barrel export for database schema and client.
 */
export { db } from "./db";
export type { Database } from "./db";
export { users, accounts, sessions, verificationTokens, roleEnum, schema } from "./schema";
