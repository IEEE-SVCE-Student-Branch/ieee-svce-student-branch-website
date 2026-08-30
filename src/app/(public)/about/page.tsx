import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ABOUT_BRANCH, BRANCH_STATS } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "About IEEE & IEEE SVCE Student Branch",
  description:
    "Institutional blueprint of IEEE SVCE Student Branch: Vision, Mission, 7 Core Objectives, Membership Advantages, and Impact Platform.",
};

const BLUEPRINT_SECTIONS = [
  { id: "sec-01", num: "01", title: "IEEE", href: "#sec-01" },
  { id: "sec-02", num: "02", title: "IEEE SVCE", href: "#sec-02" },
  { id: "sec-03", num: "03", title: "Vision", href: "#sec-03" },
  { id: "sec-04", num: "04", title: "Mission", href: "#sec-04" },
  { id: "sec-05", num: "05", title: "Objectives", href: "#sec-05" },
  { id: "sec-06", num: "06", title: "Membership", href: "#sec-06" },
  { id: "sec-07", num: "07", title: "Opportunities", href: "#sec-07" },
  { id: "sec-08", num: "08", title: "Impact", href: "#sec-08" },
];

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
        {/* Blueprint Section Index Navigation */}
        <ScrollReveal>
          <nav
            aria-label="Blueprint Sections Navigation"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 1.5rem",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 800,
                color: "var(--color-primary)",
                letterSpacing: "0.1em",
                marginRight: "0.5rem",
              }}
            >
              BLUEPRINT INDEX:
            </span>
            {BLUEPRINT_SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={sec.href}
                className="mono"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "8px",
                  backgroundColor: "rgba(0, 98, 155, 0.05)",
                  border: "1px solid rgba(0, 98, 155, 0.15)",
                  transition: "all var(--transition-fast)",
                }}
              >
                <span style={{ color: "var(--color-primary)", marginRight: "0.35rem" }}>
                  {sec.num}
                </span>
                {sec.title}
              </a>
            ))}
          </nav>
        </ScrollReveal>

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

        {/* 01 — IEEE & 02 — IEEE SVCE */}
        <ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* 01 — IEEE */}
            <div
              id="sec-01"
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
                01 // GLOBAL TECHNICAL PROFESSIONAL ORGANIZATION
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

            {/* 02 — IEEE SVCE Student Branch */}
            <div
              id="sec-02"
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
                02 // CAMPUS TECHNICAL COMMUNITY
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

        {/* 03 — Vision & 04 — Mission */}
        <ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* 03 — Vision */}
            <div
              id="sec-03"
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
                03 // GLOBAL VISION
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

            {/* 04 — Mission */}
            <div
              id="sec-04"
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
                04 // CORE PURPOSE
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

        {/* 05 — Objectives */}
        <ScrollReveal>
          <div id="sec-05">
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
                05 // CONSTITUTIONAL OBJECTIVES
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

        {/* 06 — Membership Advantages & 07 — Opportunities */}
        <ScrollReveal>
          <div id="sec-06">
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
                06 // WHY IEEE? // STUDENT VALUE PROPOSITION
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
                gap: "1.5rem",
              }}
            >
              {[
                {
                  title: "Technical Exposure",
                  description: "Deepen technical expertise through hands-on workshops, hackathons, and symposia.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  ),
                },
                {
                  title: "Research & Publications",
                  description: "Access state-of-the-art IEEE technical literature and global research journals.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Professional Networking & Global Community",
                  description: "Connect with a worldwide network of student chapters, engineers, and researchers.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  title: "Career & Professional Development",
                  description: "Unlock internships, technical competitions, mentorship, and career paths.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  ),
                },
                {
                  title: "Innovation & Collaboration",
                  description: "Engage in interdisciplinary projects, developing concepts into practical engineering solutions.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  ),
                },
                {
                  title: "Leadership & Volunteering",
                  description: "Build organization, project management, and leadership skills through active committee service.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  ),
                },
                {
                  title: "Awards, Scholarships & Recognition",
                  description: "Compete for global scholarships, travel grants, fellowships, and section honors.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  ),
                },
                {
                  title: "Platform to Lead & Impact",
                  description: "Drive meaningful societal change through technological innovation and branch initiatives.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ),
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "2rem",
                    boxShadow: "var(--shadow-card)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    height: "100%",
                    transition: "transform var(--transition-fast), border-color var(--transition-fast)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(0, 98, 155, 0.06)",
                        border: "1px solid rgba(0, 98, 155, 0.15)",
                      }}
                    >
                      {benefit.icon}
                    </div>
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
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexGrow: 1 }}>
                    <h3
                      style={{
                        fontSize: "1.0625rem",
                        fontWeight: 800,
                        letterSpacing: "-0.01em",
                        minHeight: "2.6rem",
                        display: "flex",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 08 — Impact Platform & High-Conversion CTA */}
        <ScrollReveal>
          <div
            id="sec-08"
            style={{
              padding: "3.25rem 2.5rem",
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
              08 // JOIN THE WORLD&apos;S LARGEST TECHNICAL ECOSYSTEM
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
