import { describe, it, expect } from "vitest";
import { Role, hasMinRole } from "../../lib/roles";

describe("RBAC: hasMinRole", () => {
  it("should return false if user role is null/undefined", () => {
    expect(hasMinRole(null, Role.MEMBER)).toBe(false);
    expect(hasMinRole(undefined, Role.MEMBER)).toBe(false);
  });

  it("should allow MEMBER access to MEMBER", () => {
    expect(hasMinRole(Role.MEMBER, Role.MEMBER)).toBe(true);
  });

  it("should deny MEMBER access to COMMITTEE", () => {
    expect(hasMinRole(Role.MEMBER, Role.COMMITTEE)).toBe(false);
  });

  it("should allow COMMITTEE access to MEMBER", () => {
    expect(hasMinRole(Role.COMMITTEE, Role.MEMBER)).toBe(true);
  });

  it("should deny COMMITTEE access to ADMIN", () => {
    expect(hasMinRole(Role.COMMITTEE, Role.ADMIN)).toBe(false);
  });

  it("should allow ADMIN access to everything", () => {
    expect(hasMinRole(Role.ADMIN, Role.MEMBER)).toBe(true);
    expect(hasMinRole(Role.ADMIN, Role.COMMITTEE)).toBe(true);
    expect(hasMinRole(Role.ADMIN, Role.ADMIN)).toBe(true);
  });
});
