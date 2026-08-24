/**
 * IEEE SVCE Digital Institution — Content Model (Drizzle ORM Schema)
 *
 * Phase 1 entities only: users, accounts, sessions, verification_tokens.
 * This schema is the single source of truth for the database.
 *
 * IMPORTANT: All schema changes MUST go through Drizzle migrations.
 * See docs/DATA-MODEL.md for design rationale.
 */
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  pgEnum,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";

/**
 * Role hierarchy:
 * GUEST       — unauthenticated (not stored, implicit)
 * MEMBER      — authenticated, read access + RSVP
 * COMMITTEE   — write access to specific domains
 * ADMIN       — full access, handover actions
 */
export const roleEnum = pgEnum("user_role", ["MEMBER", "COMMITTEE", "ADMIN"]);

// ----- Users -----
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  hashedPassword: text("hashed_password"),
  role: roleEnum("role").notNull().default("MEMBER"),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ----- Accounts (OAuth / external providers, future-proofing) -----
export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => [primaryKey({ columns: [account.provider, account.providerAccountId] })]
);

// ----- Sessions (database-backed for revocation support) -----
export const sessions = pgTable("sessions", {
  sessionToken: varchar("session_token", { length: 255 }).notNull().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ----- Verification Tokens (email verification, magic links) -----
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// Export all tables for use in queries
export const schema = {
  users,
  accounts,
  sessions,
  verificationTokens,
};
