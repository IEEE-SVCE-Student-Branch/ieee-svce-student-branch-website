import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { TeamCard } from "@/components/TeamCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TEAM_MEMBERS } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Team & Executive Committee",
  description:
    "Official organizational directory of IEEE SVCE Student Branch: Core Executive Committee, Treasury, Technical, Design, Content, Social Media, Outreach, Photography, and Executive Members.",
};

export default function TeamPage() {
  // Group members strictly according to the verified roster
  const coreCommittee = TEAM_MEMBERS.filter((m) => m.team === "Core Executive Committee");
  const treasuryTeam = TEAM_MEMBERS.filter((m) => m.team === "Treasury");
  const technicalTeam = TEAM_MEMBERS.filter((m) => m.team === "Technical Team");
  const designTeam = TEAM_MEMBERS.filter((m) => m.team === "Design Team");
  const contentTeam = TEAM_MEMBERS.filter((m) => m.team === "Content Team");
  const socialMediaTeam = TEAM_MEMBERS.filter((m) => m.team === "Social Media");
  const outreachTeam = TEAM_MEMBERS.filter((m) => m.team === "Outreach");
  const photographyTeam = TEAM_MEMBERS.filter((m) => m.team === "Photography");
  const executiveMembers = TEAM_MEMBERS.filter((m) => m.team === "Executive Members");
  const facultyCounselors = TEAM_MEMBERS.filter((m) => m.tier === "COUNSELOR");

  return (
    <PageShell
      title="Organizational Directory & Executive Committee"
      categoryTag="// INSTITUTIONAL STEWARDSHIP"
      description="The elected student officers, domain heads, and executive teams maintaining operational continuity, technical excellence, and institutional governance at IEEE SVCE."
      breadcrumbLabel="TEAM"
      provenanceCode="STB28051-ROSTER-2026"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
        {/* GROUP 01: Core Executive Committee */}
        <ScrollReveal>
          <div>
            <div style={{ marginBottom: "1.75rem" }}>
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// GROUP 01"}
              </span>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
                Core Executive Committee
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Branch Chairperson, Secretaries, Vice Chairperson, Joint Secretaries, and Event
                Head.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {coreCommittee.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* GROUP 02: Treasury */}
        <ScrollReveal>
          <div>
            <div style={{ marginBottom: "1.75rem" }}>
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// GROUP 02"}
              </span>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
                Treasury
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Treasurer, Joint Treasurer, and Treasury Executive managing branch accounts and
                institutional auditing.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {treasuryTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* GROUP 03: Technical Team */}
        <ScrollReveal>
          <div>
            <div style={{ marginBottom: "1.75rem" }}>
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// GROUP 03"}
              </span>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
                Technical Team
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Technical Team Head and Technical Executives leading engineering workshops, coding
                events, and lab R&D.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {technicalTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* GROUP 04: Design Team */}
        <ScrollReveal>
          <div>
            <div style={{ marginBottom: "1.75rem" }}>
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// GROUP 04"}
              </span>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
                Design Team
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Design Team Head and Design Executives crafting institutional visual identity,
                symposium media, and UI design.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {designTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* GROUP 05: Content Team */}
        <ScrollReveal>
          <div>
            <div style={{ marginBottom: "1.75rem" }}>
              <span
                className="mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                {"// GROUP 05"}
              </span>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
                Content Team
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Content Team Head and Content Executives authoring technical digests, event
                chronicles, and editorial communication.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {contentTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* GROUP 06 & 07: Social Media & Outreach */}
        <ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem",
            }}
          >
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  className="mono"
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--color-primary)",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                  }}
                >
                  {"// GROUP 06"}
                </span>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
                  Social Media
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {socialMediaTeam.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>

            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  className="mono"
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--color-primary)",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                  }}
                >
                  {"// GROUP 07"}
                </span>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
                  Outreach
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {outreachTeam.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* GROUP 08 & 09: Photography & Executive Members */}
        <ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem",
            }}
          >
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  className="mono"
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--color-primary)",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                  }}
                >
                  {"// GROUP 08"}
                </span>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
                  Photography
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {photographyTeam.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>

            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  className="mono"
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--color-primary)",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                  }}
                >
                  {"// GROUP 09"}
                </span>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
                  Executive Members
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {executiveMembers.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Faculty Stewardship — Verified Placeholder */}
        <ScrollReveal>
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span
                className="mono"
                style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", fontWeight: 700 }}
              >
                {"// FACULTY ADVISORY"}
              </span>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
                Faculty Branch Counselors
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {facultyCounselors.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Institutional Handover & vTools Compliance Banner */}
        <ScrollReveal>
          <div
            style={{
              padding: "2rem",
              backgroundColor: "rgba(0, 98, 155, 0.05)",
              border: "1px solid var(--color-border)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.25rem",
            }}
          >
            <div>
              <div
                className="mono"
                style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--color-primary)" }}
              >
                GOVERNANCE & HANDOVER CONTINUITY
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.35rem",
                  maxWidth: "680px",
                }}
              >
                Elections and annual officer reporting are conducted in strict compliance with IEEE
                Madras Section and IEEE vTools officer reporting guidelines.
              </p>
            </div>
            <Link
              href="/about"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "var(--color-primary)",
                textDecoration: "underline",
              }}
              data-cursor="ABOUT"
            >
              INSPECT BRANCH CONSTITUTION →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </PageShell>
  );
}
