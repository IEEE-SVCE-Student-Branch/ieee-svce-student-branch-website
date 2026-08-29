import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { BRANCH_PROJECTS } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Innovation & Living Labs",
  description:
    "Student-engineered hardware prototypes, TinyML embedded firmware, LoRa mesh telemetry nodes, and open-source IEEE SVCE research repositories.",
};

export default function InnovationPage() {
  return (
    <PageShell
      title="Innovation & Living Labs (Applied R&D)"
      categoryTag="// STUDENT ENGINEERING VAULT"
      description="Applied engineering prototypes built by IEEE SVCE student working groups — documented from core problem statement through circuit schematics, firmware algorithms, and field deployment results."
      breadcrumbLabel="INNOVATION"
      provenanceCode="STB28051-INNOVATION-LAB"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {BRANCH_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            id={proj.slug}
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "2.5rem",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Header / Project Identity */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                paddingBottom: "1.25rem",
                borderBottom: "1px solid var(--color-border-subtle)",
              }}
            >
              <div>
                <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-primary)" }}>
                  [ {proj.domain.toUpperCase()} ] • {proj.track.toUpperCase()} • YEAR {proj.year}
                </span>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 900, marginTop: "0.25rem" }}>{proj.title}</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  className="mono"
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "var(--color-accent-emerald)",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "var(--radius-xs)",
                  }}
                >
                  ● {proj.status.replace("_", " ")}
                </span>
                <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
                  {proj.provenance}
                </span>
              </div>
            </div>

            {/* Problem & Solution Architecture */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              <div style={{ backgroundColor: "var(--color-surface-muted)", padding: "1.5rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--color-border-subtle)" }}>
                <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-text-muted)" }}>
                  {"// PROBLEM STATEMENT"}
                </span>
                <p style={{ marginTop: "0.5rem", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--color-text-primary)" }}>
                  {proj.problem}
                </p>
              </div>

              <div style={{ backgroundColor: "rgba(0, 98, 155, 0.04)", padding: "1.5rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--color-border-accent)" }}>
                <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-primary)" }}>
                  {"// SOLUTION ARCHITECTURE"}
                </span>
                <p style={{ marginTop: "0.5rem", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--color-text-primary)" }}>
                  {proj.solution}
                </p>
              </div>
            </div>

            {/* Field Test Results & Metrics */}
            <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--color-surface-muted)", borderRadius: "var(--radius-xs)", border: "1px solid var(--color-border-subtle)" }}>
              <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-accent-emerald)" }}>
                VERIFIED EXPERIMENTAL RESULTS
              </span>
              <p style={{ marginTop: "0.25rem", fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                {proj.results}
              </p>
            </div>

            {/* Media Schematics & Prototype Artifacts */}
            {proj.media && proj.media.length > 0 && (
              <div style={{ padding: "1.25rem 1.5rem", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-xs)", border: "1px solid var(--color-border)" }}>
                <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-primary)" }}>
                  TECHNICAL ARTIFACTS & MEDIA CAPTIONS
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {proj.media.map((med, i) => (
                    <div key={i} style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                      <strong className="mono" style={{ color: "var(--color-primary)" }}>[{med.type}]:</strong> {med.caption}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team & Technologies */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--color-border-subtle)" }}>
              <div>
                <span className="mono" style={{ fontSize: "0.625rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
                  STUDENT TEAM / WORKING GROUP
                </span>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, marginTop: "0.2rem" }}>
                  {proj.team.join(" • ")}
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {proj.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="mono"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      backgroundColor: "var(--color-primary-subtle)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "var(--radius-xs)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GitHub / Demo Link */}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    backgroundColor: "var(--color-primary)",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-xs)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  data-cursor="GITHUB"
                >
                  <span>GITHUB REPO</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
