import { auth } from "@/lib/auth";

/**
 * Private OS — Dashboard
 *
 * Phase 1: Minimal placeholder showing session info.
 * Full dashboard is Phase 2 of the implementation roadmap.
 */
export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>
        Welcome, {session?.user?.name ?? session?.user?.email ?? "User"}.
      </p>
      <p
        style={{ color: "var(--color-text-secondary)", marginTop: "0.25rem", fontSize: "0.875rem" }}
      >
        Role: {session?.user?.role ?? "Unknown"}
      </p>
    </div>
  );
}
