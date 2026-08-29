import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { BRANCH_PARTNERS } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Partners & Sponsors",
  description:
    "Industrial collaborators, technology hardware sponsors, IEEE Madras Section relationships, and university research partnerships.",
};

export default function PartnersPage() {
  return (
    <PageShell
      title="Partners, Sponsors & IEEE Relationships (Network)"
      categoryTag="// COLLABORATIVE ECOSYSTEM"
      description="The professional and academic network supporting IEEE SVCE through technical co-sponsorships, industrial hardware donations, distinguished lectures, and research funding."
      breadcrumbLabel="PARTNERS"
      provenanceCode="STB28051-PARTNERS-NETWORK"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {/* Partner Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {BRANCH_PARTNERS.map((p) => (
            <div
              key={p.id}
              id={p.id}
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
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    [ {p.type.replace(/_/g, " ")} ]
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: "0.625rem", color: "var(--color-text-muted)" }}
                  >
                    {p.region}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{p.name}</h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "var(--color-text-secondary)",
                    marginTop: "0.75rem",
                  }}
                >
                  {p.engagement}
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
                  ● {p.status.replace(/_/g, " ")}
                </span>
                <Link
                  href={`/contact?subject=Partnership Inquiry: ${p.name}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    textDecoration: "underline",
                  }}
                  data-cursor="INQUIRE"
                >
                  COLLABORATE →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Proposal CTA */}
        <div
          style={{
            backgroundColor: "rgba(0, 98, 155, 0.05)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          <span
            className="mono"
            style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-primary)" }}
          >
            {"// BECOME AN INSTITUTIONAL PARTNER"}
          </span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            Partner with IEEE SVCE for Symposia & R&D
          </h2>
          <p
            style={{
              maxWidth: "600px",
              fontSize: "0.9375rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Collaborate with top undergraduate engineering researchers, sponsor national hardware
            hackathons, and recruit top technical talent.
          </p>
          <Link
            href="/contact?type=sponsorship"
            style={{
              marginTop: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#ffffff",
              backgroundColor: "var(--color-primary)",
              padding: "0.75rem 1.5rem",
              borderRadius: "var(--radius-xs)",
              textDecoration: "none",
            }}
            data-cursor="SPONSOR"
          >
            SUBMIT SPONSORSHIP / PARTNERSHIP ENQUIRY →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
