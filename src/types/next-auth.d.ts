/**
 * IEEE SVCE Digital Institution — Auth.js Type Extensions
 *
 * Extends the default Auth.js types to include our custom role field.
 */
import type { UserRole } from "./lib/roles";

declare module "next-auth" {
  interface User {
    role?: UserRole;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
