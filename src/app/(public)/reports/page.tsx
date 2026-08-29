import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { INSTITUTIONAL_REPORTS } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Institutional Reports",
  description:
    "Annual branch activity dossiers, vTools compliance audits, and year-based PDF event proceedings of IEEE SVCE.",
};

export default function ReportsPage() {
  return (
    <PageShell
      title="Institutional Reports & Dossiers"
      categoryTag="// GOVERNANCE & AUDITS"
      description="Permanent public activity digests, annual branch reports, financial audits, and vTools synchronization logs submitted to IEEE Madras Section."
      breadcrumbLabel="REPORTS"
      provenanceCode="STB28051-AUDIT-DOSSIER"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {/* Reports Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {INSTITUTIONAL_REPORTS.map((rep) => (
            <div
              key={rep.id}
              id={rep.id}
              style={{
                backgroundColor: "var(--color-surface)",
                backdropFilter: "blur(14px)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "2rem",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    [ {rep.docType.replace(/_/g, " ")} ]
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
                  >
                    {rep.year}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{rep.title}</h3>
                <div
                  className="mono"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-secondary)",
                    marginTop: "0.25rem",
                  }}
                >
                  Period: {rep.period}
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "var(--color-surface-muted)",
                    borderRadius: "var(--radius-xs)",
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <span>
                    {rep.pagesCount} Pages • {rep.fileSize}
                  </span>
                  <span>{rep.checksum}</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.875rem",
                  borderTop: "1px solid var(--color-border-subtle)",
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "0.625rem", color: "var(--color-accent-emerald)" }}
                >
                  ● VERIFIED AUDIT RECORD
                </span>
                <button
                  type="button"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    color: "var(--color-primary)",
                    textDecoration: "underline",
                  }}
                  data-cursor="DOWNLOAD"
                >
                  DOWNLOAD PDF RECORD ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
