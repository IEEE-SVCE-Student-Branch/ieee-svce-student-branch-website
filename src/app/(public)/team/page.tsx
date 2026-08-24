import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { TEAM_MEMBERS, TeamMember } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Team & Executive Committee",
  description:
    "Executive leadership, Branch Counselors, Core Committee officers, Chapter Chairs, and Domain Heads of IEEE SVCE Student Branch.",
};

export default function TeamPage() {
  const counselors = TEAM_MEMBERS.filter((m) => m.tier === "COUNSELOR");
  const coreOfficers = TEAM_MEMBERS.filter((m) => m.tier === "CORE_OFFICER");
  const domainHeads = TEAM_MEMBERS.filter((m) => m.tier === "DOMAIN_HEAD");
  const chapterChairs = TEAM_MEMBERS.filter((m) => m.tier === "CHAPTER_CHAIR");

  const renderMemberCard = (member: TeamMember) => (
    <div
      key={member.id}
      id={member.id}
      style={{
        backgroundColor: "var(--color-surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1.25rem",
        transition: "all var(--transition-fast)",
      }}
    >
      <div>
        {/* Top bar with photo avatar placeholder & status badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 98, 155, 0.12)",
              border: "1.5px solid var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              fontWeight: 800,
              color: "var(--color-primary)",
            }}
          >
            {member.name.charAt(0)}
          </div>
          <span
            className="mono"
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              color: member.status === "VERIFIED" ? "var(--color-accent-emerald)" : "var(--color-accent-amber)",
              background: member.status === "VERIFIED" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
              padding: "0.2rem 0.5rem",
              borderRadius: "var(--radius-xs)",
            }}
          >
            {member.status}
          </span>
        </div>

        <span className="mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)" }}>
          {member.position}
        </span>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem" }}>{member.name}</h3>

        <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginTop: "0.5rem", lineHeight: 1.4 }}>
          {member.department}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "0.875rem",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
          {member.year}
        </span>
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          data-cursor="LINKEDIN"
        >
          <span>LINKEDIN</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );

  return (
    <PageShell
      title="Team & Executive Committee (Constellation)"
      categoryTag="// INSTITUTIONAL STEWARDSHIP"
      description="The elected student officers, domain heads, and faculty branch counselors who maintain administrative continuity, technical excellence, and institutional governance."
      breadcrumbLabel="TEAM"
      provenanceCode="STB28051-EXECOM-2026"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {/* Tier 1: Faculty Branch Counselors */}
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// FACULTY STEWARDSHIP"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>Branch Counselors</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {counselors.map(renderMemberCard)}
          </div>
        </div>

        {/* Tier 2: Core Committee Officers */}
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// EXECUTIVE OFFICERS"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Core Committee (Chair, Vice-Chair, Secretaries & Treasurers)
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {coreOfficers.map(renderMemberCard)}
          </div>
        </div>

        {/* Tier 3: Chapter Chairs */}
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// SOCIETY LEADERSHIP"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Technical Society & Affinity Group Chairs
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {chapterChairs.map(renderMemberCard)}
          </div>
        </div>

        {/* Tier 4: Technical, Design & Content Domain Heads */}
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              {"// OPERATIONAL DOMAINS"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Technical, Editorial & Creative Domain Heads
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {domainHeads.map(renderMemberCard)}
          </div>
        </div>

        {/* Governance & Handover Note */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "rgba(0, 98, 155, 0.05)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div className="mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)" }}>
              GOVERNANCE CONTINUITY // CONSTITUTIONAL MANDATE
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
              Annual elections and handover protocols are audited under IEEE Madras Section vTools compliance rules.
            </p>
          </div>
          <Link
            href="/reports"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "var(--color-primary)",
              textDecoration: "underline",
            }}
          >
            INSPECT AUDIT DOSSIERS →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
