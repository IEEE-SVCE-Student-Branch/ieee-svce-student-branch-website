import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ABOUT_BRANCH, BRANCH_STATS } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "About IEEE & IEEE SVCE",
  description:
    "Institutional blueprint of IEEE SVCE Student Branch: Vision, Mission, 7 Core Objectives, and What Students Gain from IEEE Membership.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About IEEE & IEEE SVCE Student Branch"
      categoryTag="// INSTITUTIONAL BLUEPRINT"
      description="The IEEE Student Branch of Sri Venkateswara College of Engineering is a student-driven technical community connecting the SVCE campus with the global IEEE network."
      breadcrumbLabel="ABOUT"
      provenanceCode="STB28051-CHARTER-BLUEPRINT"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
        {/* Core Stats Bar */}
        <ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              padding: "2rem 2.25rem",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid var(--color-border)",
              borderRadius: "20px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div>
              <div
                className="mono"
                style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary)" }}
              >
                {BRANCH_STATS.establishedYear}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                  letterSpacing: "0.06em",
                }}
              >
                CHARTER FOUNDING YEAR
              </div>
            </div>
            <div>
              <div
                className="mono"
                style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary)" }}
              >
                {BRANCH_STATS.branchCode}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                  letterSpacing: "0.06em",
                }}
              >
                SECTION BRANCH CODE
              </div>
            </div>
            <div>
              <div
                className="mono"
                style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary)" }}
              >
                REGION 10
              </div>
              <div
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                  letterSpacing: "0.06em",
                }}
              >
                ASIA-PACIFIC GEOGRAPHIC REGION
              </div>
            </div>
            <div>
              <div
                className="mono"
                style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary)" }}
              >
                MADRAS SECTION
              </div>
              <div
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                  letterSpacing: "0.06em",
                }}
              >
                PARENT SECTION GOVERNANCE
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 1: About IEEE & About IEEE SVCE */}
        <ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                backdropFilter: "blur(14px)",
                border: "1px solid var(--color-border)",
                borderRadius: "20px",
                padding: "2.25rem",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// GLOBAL TECHNICAL PROFESSIONAL ORGANIZATION"}
              </span>
              <h2 style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                About IEEE
              </h2>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                  fontSize: "0.9375rem",
                }}
              >
                {ABOUT_BRANCH.aboutIeee}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--color-surface)",
                backdropFilter: "blur(14px)",
                border: "1px solid var(--color-border)",
                borderRadius: "20px",
                padding: "2.25rem",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// CAMPUS TECHNICAL COMMUNITY"}
              </span>
              <h2 style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                About IEEE SVCE Student Branch
              </h2>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                  fontSize: "0.9375rem",
                }}
              >
                {ABOUT_BRANCH.aboutBranch}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: Vision & Mission */}
        <ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(2, 132, 199, 0.05)",
                border: "1.5px solid rgba(2, 132, 199, 0.25)",
                borderRadius: "20px",
                padding: "2rem 2.25rem",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// GLOBAL VISION"}
              </span>
              <h3
                style={{
                  fontSize: "1.375rem",
                  fontWeight: 800,
                  marginTop: "0.35rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Vision
              </h3>
              <p
                style={{
                  color: "var(--color-text-primary)",
                  lineHeight: 1.65,
                  marginTop: "0.75rem",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                }}
              >
                &ldquo;{ABOUT_BRANCH.vision}&rdquo;
              </p>
            </div>

            <div
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.05)",
                border: "1.5px solid rgba(99, 102, 241, 0.25)",
                borderRadius: "20px",
                padding: "2rem 2.25rem",
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-accent-violet)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// CORE PURPOSE"}
              </span>
              <h3
                style={{
                  fontSize: "1.375rem",
                  fontWeight: 800,
                  marginTop: "0.35rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Mission
              </h3>
              <p
                style={{
                  color: "var(--color-text-primary)",
                  lineHeight: 1.65,
                  marginTop: "0.75rem",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                }}
              >
                &ldquo;{ABOUT_BRANCH.mission}&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 3: Objectives — Sophisticated Vertical Numbered Progression */}
        <ScrollReveal>
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// CONSTITUTIONAL OBJECTIVES"}
              </span>
              <h2
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 900,
                  marginTop: "0.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Institutional Objectives
              </h2>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.9375rem",
                  marginTop: "0.25rem",
                  maxWidth: "700px",
                }}
              >
                Seven guiding pillars established to cultivate technical excellence, engineering
                innovation, and ethical leadership across the SVCE student body.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {ABOUT_BRANCH.objectives.map((obj) => (
                <div
                  key={obj.number}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr",
                    gap: "1.5rem",
                    alignItems: "center",
                    backgroundColor: "var(--color-surface)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "16px",
                    padding: "1.5rem 2rem",
                    boxShadow: "var(--shadow-subtle)",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      color: "var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(0, 98, 155, 0.08)",
                      border: "1px solid rgba(0, 98, 155, 0.2)",
                    }}
                  >
                    {obj.number}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.1875rem",
                        fontWeight: 800,
                        color: "var(--color-text-primary)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {obj.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                        marginTop: "0.35rem",
                      }}
                    >
                      {obj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Section 4: What Students Gain from IEEE Membership (Why IEEE?) */}
        <ScrollReveal>
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// WHY IEEE? // STUDENT VALUE PROPOSITION"}
              </span>
              <h2
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 900,
                  marginTop: "0.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                What Students Gain from IEEE Membership
              </h2>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.9375rem",
                  marginTop: "0.25rem",
                  maxWidth: "720px",
                }}
              >
                Becoming an IEEE member gives students access to a global technical ecosystem that
                supports learning, innovation, professional growth, and leadership.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {ABOUT_BRANCH.membershipBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "18px",
                    padding: "1.75rem",
                    boxShadow: "var(--shadow-card)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "var(--color-primary)",
                      }}
                    >
                      [ {String(idx + 1).padStart(2, "0")} ]
                    </span>
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-primary)",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                      marginTop: "0.25rem",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Section 5: High-Conversion "JOIN IEEE" CTA */}
        <ScrollReveal>
          <div
            style={{
              padding: "3rem 2.5rem",
              background: "linear-gradient(135deg, #004d7a 0%, #00629b 50%, #0284c7 100%)",
              borderRadius: "24px",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "1.5rem",
              boxShadow: "0 20px 48px -8px rgba(0, 98, 155, 0.4)",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7dd3fc",
                background: "rgba(255, 255, 255, 0.12)",
                padding: "0.35rem 0.875rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              JOIN THE WORLD&apos;S LARGEST TECHNICAL ECOSYSTEM
            </span>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                maxWidth: "680px",
                color: "#ffffff",
              }}
            >
              Ready to Expand Your Engineering Journey with IEEE?
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(240, 249, 255, 0.9)",
                maxWidth: "600px",
                lineHeight: 1.6,
              }}
            >
              Unlock research papers, global student travel grants, specialized society chapters,
              and direct networking with industry leaders worldwide.
            </p>
            <a
              href="https://www.ieee.org/membership/join/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.875rem 2rem",
                backgroundColor: "#ffffff",
                color: "#00629b",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                fontWeight: 900,
                letterSpacing: "0.08em",
                borderRadius: "var(--radius-full)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                transition: "transform var(--transition-fast)",
                marginTop: "0.5rem",
              }}
              data-cursor="JOIN"
            >
              <span>JOIN IEEE</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </PageShell>
  );
}
