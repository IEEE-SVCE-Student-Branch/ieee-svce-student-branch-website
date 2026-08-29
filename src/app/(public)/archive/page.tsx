import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ARCHIVE_RECORDS, ArchiveRecord } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Archive & Historical Vault",
  description:
    "Permanent institutional repository of IEEE SVCE charters, historical records, ExeCom registers, and catalogs since 1994.",
};

export default function ArchivePage() {
  return (
    <PageShell
      title="Institutional Archive & Historical Vault (Time Machine)"
      categoryTag="// IMMUTABLE RECORD"
      description="The definitive historical repository of IEEE SVCE. All charters, committee ledgers, annual event proceedings, and section communications are permanently preserved."
      breadcrumbLabel="ARCHIVE"
      provenanceCode="ARC-ROOT-VAULT-1994"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Table / Ledger View */}
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(14px)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            overflowX: "auto",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-secondary)",
                  backgroundColor: "var(--color-surface-muted)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <th style={{ padding: "1rem 1.25rem" }}>Record ID / Provenance</th>
                <th style={{ padding: "1rem 1.25rem" }}>Year</th>
                <th style={{ padding: "1rem 1.25rem" }}>Document Title & Summary</th>
                <th style={{ padding: "1rem 1.25rem" }}>Classification</th>
              </tr>
            </thead>
            <tbody>
              {ARCHIVE_RECORDS.map((record: ArchiveRecord) => (
                <tr
                  key={record.id}
                  id={record.id}
                  style={{
                    borderBottom: "1px solid var(--color-border-subtle)",
                    fontSize: "0.875rem",
                  }}
                >
                  <td
                    className="mono"
                    style={{
                      padding: "1.25rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {record.provenance}
                  </td>
                  <td
                    className="mono"
                    style={{ padding: "1.25rem", whiteSpace: "nowrap", fontWeight: 700 }}
                  >
                    {record.year}
                  </td>
                  <td style={{ padding: "1.25rem", minWidth: "280px" }}>
                    <div style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>
                      {record.title}
                    </div>
                    <div
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "0.8125rem",
                        marginTop: "0.25rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {record.summary}
                    </div>
                  </td>
                  <td style={{ padding: "1.25rem", whiteSpace: "nowrap" }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: "0.625rem",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "var(--radius-xs)",
                        border: "1px solid var(--color-border)",
                        backgroundColor: "var(--color-surface-muted)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {record.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
