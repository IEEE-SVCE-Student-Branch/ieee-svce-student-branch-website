import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { COMMUNITY_ACHIEVEMENTS, HALL_OF_FAME, INDUSTRY_CONNECT } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Community & Laurels",
  description:
    "Student achievements, IEEE Section recognitions, Hall of Fame, hackathon championships, and industry partnerships at IEEE SVCE.",
};

export default function CommunityPage() {
  const studentAwards = COMMUNITY_ACHIEVEMENTS.filter((a) => a.category === "STUDENT");
  const branchAwards = COMMUNITY_ACHIEVEMENTS.filter((a) => a.category === "SB_AWARD");
  const hackathons = COMMUNITY_ACHIEVEMENTS.filter((a) => a.category === "HACKATHON");

  return (
    <PageShell
      title="Community, Laurels & Hall of Fame (Proof Wall)"
      categoryTag="// INSTITUTIONAL PROOF"
      description="Documenting student engineering triumphs, IEEE Region 10 accolades, Hackathon championships, and three decades of alumni Hall of Fame."
      breadcrumbLabel="COMMUNITY"
      provenanceCode="STB28051-LAURELS-VAULT"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {/* Section 1: IEEE Section & SB Awards */}
        <div>
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              className="mono"
              style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}
            >
              {"// SECTION & MGA HONORS"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              IEEE & Student Branch Awards
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {branchAwards.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "var(--color-surface)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "2rem",
                  boxShadow: "var(--shadow-card)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.25rem",
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
                        fontSize: "0.875rem",
                        fontWeight: 800,
                        color: "var(--color-primary)",
                      }}
                    >
                      {item.year}
                    </span>
                    <span
                      className="mono"
                      style={{ fontSize: "0.625rem", color: "var(--color-text-muted)" }}
                    >
                      {item.provenance}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{item.title}</h3>
                  <div
                    className="mono"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      marginTop: "0.25rem",
                    }}
                  >
                    Conferred by: {item.awardedBy}
                  </div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                      marginTop: "0.75rem",
                    }}
                  >
                    {item.summary}
                  </p>
                </div>
                <div
                  style={{
                    paddingTop: "0.875rem",
                    borderTop: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
                  >
                    Citation: {item.citation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Student Achievements & Hackathon Championships */}
        <div>
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              className="mono"
              style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}
            >
              {"// STUDENT RESEARCH & HACKATHONS"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Student Achievements & Competitions
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[...studentAwards, ...hackathons].map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "var(--color-surface)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "2rem",
                  boxShadow: "var(--shadow-card)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.25rem",
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
                        fontSize: "0.875rem",
                        fontWeight: 800,
                        color: "var(--color-primary)",
                      }}
                    >
                      {item.year}
                    </span>
                    <span
                      className="mono"
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        background: "var(--color-primary-subtle)",
                        color: "var(--color-primary)",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "var(--radius-xs)",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{item.title}</h3>
                  <div
                    className="mono"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      marginTop: "0.25rem",
                    }}
                  >
                    Awarded by: {item.awardedBy}
                  </div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                      marginTop: "0.75rem",
                    }}
                  >
                    {item.summary}
                  </p>
                </div>
                <div
                  style={{
                    paddingTop: "0.875rem",
                    borderTop: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
                  >
                    Citation: {item.citation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Hall of Fame */}
        <div>
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              className="mono"
              style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}
            >
              {"// PERMANENT RECOGNITION"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Hall of Fame
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {HALL_OF_FAME.map((hof, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--color-surface)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "2rem",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="mono"
                  style={{ fontSize: "0.75rem", color: "var(--color-primary)", fontWeight: 700 }}
                >
                  {hof.tenure} • {hof.role}
                </div>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 800, marginTop: "0.35rem" }}>
                  {hof.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    marginTop: "0.5rem",
                  }}
                >
                  <strong>Affiliation:</strong> {hof.currentAffiliation}
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "var(--color-text-secondary)",
                    marginTop: "0.75rem",
                  }}
                >
                  {hof.citation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Industry Connect */}
        <div>
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              className="mono"
              style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}
            >
              {"// INDUSTRIAL RELATIONS"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Industry Connect
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {INDUSTRY_CONNECT.map((ic, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--color-surface)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.75rem",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    {ic.type.replace("_", " ")}
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
                  >
                    {ic.year}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 800, marginTop: "0.5rem" }}>
                  {ic.title}
                </h3>
                <div
                  className="mono"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-secondary)",
                    marginTop: "0.25rem",
                  }}
                >
                  Partner: {ic.partner}
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    marginTop: "0.5rem",
                    lineHeight: 1.5,
                  }}
                >
                  {ic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
