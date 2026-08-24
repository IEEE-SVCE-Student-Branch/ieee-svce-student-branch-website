import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ABOUT_BRANCH, BRANCH_STATS } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Institutional charter, history since 1994, vision, mission, constitutional objectives, and student membership benefits of IEEE SVCE (STB 28051).",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About IEEE & IEEE SVCE Student Branch"
      categoryTag="// INSTITUTIONAL BLUEPRINT"
      description="Established in August 1994, IEEE SVCE (STB 28051) operates under IEEE Region 10 and Madras Section as an autonomous engineering incubator for research, student leadership, and humanitarian technology."
      breadcrumbLabel="ABOUT"
      provenanceCode="STB28051-CHARTER-BLUEPRINT"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {/* Core Stats Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            padding: "2rem",
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div>
            <div className="mono" style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-primary)" }}>
              {BRANCH_STATS.establishedYear}
            </div>
            <div className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
              CHARTER FOUNDING YEAR
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-primary)" }}>
              {BRANCH_STATS.branchCode}
            </div>
            <div className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
              IEEE SECTION BRANCH CODE
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-primary)" }}>
              REGION 10
            </div>
            <div className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
              ASIA-PACIFIC GEOGRAPHIC SECTION
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-primary)" }}>
              MADRAS SECTION
            </div>
            <div className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
              PARENT SECTION GOVERNANCE
            </div>
          </div>
        </div>

        {/* Section 1: About IEEE & About IEEE SVCE */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "2.25rem",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// GLOBAL CONTEXT"}
            </span>
            <h2 style={{ fontSize: "1.625rem", fontWeight: 800, marginTop: "0.5rem" }}>About IEEE</h2>
            <p style={{ marginTop: "1rem", color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
              {ABOUT_BRANCH.aboutIeee}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "2.25rem",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// LOCAL INSTITUTION"}
            </span>
            <h2 style={{ fontSize: "1.625rem", fontWeight: 800, marginTop: "0.5rem" }}>About IEEE SVCE Student Branch</h2>
            <p style={{ marginTop: "1rem", color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
              {ABOUT_BRANCH.aboutBranch}
            </p>
          </div>
        </div>

        {/* Section 2: Vision, Mission & Objectives */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "2.25rem",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
                {"// INSTITUTIONAL VISION"}
              </span>
              <h3 style={{ fontSize: "1.375rem", fontWeight: 800, marginTop: "0.35rem" }}>Vision</h3>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6, marginTop: "0.5rem", fontSize: "0.9375rem" }}>
                {ABOUT_BRANCH.vision}
              </p>
            </div>

            <div style={{ paddingTop: "1.25rem", borderTop: "1px solid var(--color-border-subtle)" }}>
              <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
                {"// INSTITUTIONAL MISSION"}
              </span>
              <h3 style={{ fontSize: "1.375rem", fontWeight: 800, marginTop: "0.35rem" }}>Mission</h3>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6, marginTop: "0.5rem", fontSize: "0.9375rem" }}>
                {ABOUT_BRANCH.mission}
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "2.25rem",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// CONSTITUTIONAL AIMS"}
            </span>
            <h3 style={{ fontSize: "1.375rem", fontWeight: 800, marginTop: "0.35rem" }}>Branch Objectives</h3>
            <ul style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem", paddingLeft: "1.25rem" }}>
              {ABOUT_BRANCH.objectives.map((obj, i) => (
                <li key={i} style={{ color: "var(--color-text-secondary)", lineHeight: 1.5, fontSize: "0.875rem" }}>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Student Membership Benefits */}
        <div>
          <div style={{ marginBottom: "1.75rem" }}>
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// MEMBERSHIP ADVANTAGES"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>Student Membership Benefits</h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", marginTop: "0.25rem" }}>
              IEEE SVCE student members gain exclusive access to global engineering ecosystems, funding grants, and technical libraries.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {ABOUT_BRANCH.membershipBenefits.map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--color-surface)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.75rem",
                  boxShadow: "var(--shadow-card)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                <span className="mono" style={{ fontSize: "0.875rem", fontWeight: 800, color: "var(--color-primary)" }}>
                  [ 0{idx + 1} ]
                </span>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>{benefit.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Year-Based Journey & Milestone Timeline */}
        <div>
          <div style={{ marginBottom: "2rem" }}>
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// 1994 – 2026 CHRONOLOGY"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>Year-Based Journey & Milestones</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {ABOUT_BRANCH.milestones.map((m) => (
              <div
                key={m.year}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "1.5rem",
                  backgroundColor: "var(--color-surface)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.5rem 1.75rem",
                  alignItems: "center",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-primary)",
                  }}
                >
                  {m.year}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.0625rem", fontWeight: 700 }}>{m.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
