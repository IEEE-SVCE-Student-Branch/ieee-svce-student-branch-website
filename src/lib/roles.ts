/**
 * IEEE SVCE Digital Institution — Role Definitions
 *
 * Canonical role constants used across the application.
 * See docs/SECURITY-MODEL.md for the role hierarchy.
 *
 * GUEST is not stored — it is the implicit state of an unauthenticated user.
 */

export const Role = {
  MEMBER: "MEMBER",
  COMMITTEE: "COMMITTEE",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof Role)[keyof typeof Role];

/** All roles ordered by privilege level (lowest first) */
const ROLE_HIERARCHY: readonly UserRole[] = [Role.MEMBER, Role.COMMITTEE, Role.ADMIN];

/**
 * Check if a user's role meets or exceeds the required role.
 *
 * @example
 * hasMinRole("COMMITTEE", "MEMBER")  // true
 * hasMinRole("MEMBER", "ADMIN")      // false
 */
export function hasMinRole(userRole: UserRole | undefined | null, requiredRole: UserRole): boolean {
  if (!userRole) return false;
  const userLevel = ROLE_HIERARCHY.indexOf(userRole);
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole);
  return userLevel >= requiredLevel;
}
