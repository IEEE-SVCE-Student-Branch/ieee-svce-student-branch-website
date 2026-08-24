import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private OS",
  robots: { index: false, follow: false },
};

/**
 * Private OS layout.
 * This wraps all pages under /os/* routes.
 * Protected by middleware — only authenticated users reach this layout.
 * `robots: noindex` prevents search engines from indexing private pages.
 */
export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Defense in depth — middleware should have caught this,
  // but we verify server-side as well per AGENTS.md rule 4.
  if (!session?.user) {
    redirect("/os/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100dvh" }}>
      <aside
        style={{
          width: "240px",
          borderRight: "1px solid var(--color-border)",
          padding: "1rem",
        }}
        aria-label="Private OS navigation"
      >
        <div style={{ fontWeight: 600, marginBottom: "1rem" }}>IEEE SVCE OS</div>
        <nav>
          {/* Navigation items will be implemented in Phase 2+ */}
          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
            Signed in as {session.user.email}
          </div>
        </nav>
      </aside>
      <main id="main-content" style={{ flex: 1, padding: "1.5rem" }}>
        {children}
      </main>
    </div>
  );
}
