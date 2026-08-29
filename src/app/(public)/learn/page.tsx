import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { LEARN_RESOURCES } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Learn & Technical Resources",
  description:
    "Open-access courseware, workshop slide decks (PPTs), LaTeX conference templates, study toolkits, and interview preparation guides compiled by IEEE SVCE.",
};

export default function LearnPage() {
  return (
    <PageShell
      title="Learn & Technical Resources (Knowledge Field)"
      categoryTag="// PEDAGOGICAL VAULT"
      description="Peer-curated technical courseware, workshop slide decks (PPTs), conference paper templates, and engineering interview preparation toolkits."
      breadcrumbLabel="LEARN"
      provenanceCode="STB28051-LEARN-FIELD"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {/* Resource Categories Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {LEARN_RESOURCES.map((res) => (
            <div
              key={res.id}
              id={res.id}
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
                    [ {res.category.replace(/_/g, " ")} ]
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 800,
                      backgroundColor: "var(--color-primary-subtle)",
                      color: "var(--color-primary)",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "var(--radius-xs)",
                    }}
                  >
                    {res.format}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{res.title}</h3>
                <div
                  className="mono"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-secondary)",
                    marginTop: "0.25rem",
                  }}
                >
                  Domain: {res.domain} • Curator: {res.curator}
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "var(--color-text-secondary)",
                    marginTop: "0.75rem",
                  }}
                >
                  {res.description}
                </p>
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
                  ● {res.status}
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
                  data-cursor="ACCESS"
                >
                  ACCESS RESOURCE [PPT/PDF] →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* External Roadmaps & IEEE Xplore Links */}
        <div
          style={{
            backgroundColor: "var(--color-surface-muted)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <span
            className="mono"
            style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-primary)" }}
          >
            IEEE XPLORE DIGITAL REPOSITORY & TECHNICAL STANDARDS
          </span>
          <p
            style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}
          >
            SVCE students and faculty can access full-text IEEE journals, conference proceedings,
            and IEEE standards through the campus network IP authentication and IEEE student
            membership portal.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
