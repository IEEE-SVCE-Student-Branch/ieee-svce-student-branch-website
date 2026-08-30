/**
 * IEEE SVCE Digital Institution — Auth.js Configuration
 *
 * Phase 1: Credentials provider only (email + password).
 * Magic links and OAuth are deferred until notification infrastructure exists.
 *
 * Session strategy: JWT with short TTL.
 * Role is embedded in the session token for middleware RBAC checks.
 */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../packages/content-model/db";
import { users } from "../../packages/content-model/schema";
import { loginSchema } from "../../packages/validation/schemas";
import { createLogger } from "./logger";
import { authConfig } from "./auth.config";

const log = createLogger("auth");

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          log.warn("Login attempt with invalid input");
          return null;
        }

        const { email, password } = parsed.data;

        // Find user
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user || !user.hashedPassword) {
          log.warn({ email }, "Login attempt for non-existent user or user without password");
          return null;
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) {
          log.warn({ email }, "Login attempt with invalid password");
          return null;
        }

        log.info({ userId: user.id, email }, "User logged in");
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
