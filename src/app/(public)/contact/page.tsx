import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { BRANCH_STATS } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Contact & Institutional Coordinates",
  description:
    "Direct communication channels, physical coordinates, Google Maps, collaboration enquiries, and sponsorship desks for IEEE SVCE.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact & Coordinates (Institutional Desk)"
      categoryTag="// COMMUNICATION CHANNELS"
      description="Direct channels for collaboration proposals, corporate sponsorships, technical workshop inquiries, and student membership assistance."
      breadcrumbLabel="CONTACT"
      provenanceCode="STB28051-COMM-DESK"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3.5rem",
        }}
      >
        {/* Left Column: Coordinates, Socials & Map */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(14px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "2.25rem",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
            }}
          >
            <div>
              <span
                className="mono"
                style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-primary)" }}
              >
                OFFICIAL INSTITUTIONAL EMAIL
              </span>
              <div style={{ fontSize: "1.125rem", fontWeight: 700, marginTop: "0.35rem" }}>
                <a
                  href={`mailto:${BRANCH_STATS.officialEmail}`}
                  style={{ color: "var(--color-primary)" }}
                >
                  {BRANCH_STATS.officialEmail}
                </a>
              </div>
            </div>

            <div>
              <span
                className="mono"
                style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-primary)" }}
              >
                CAMPUS LOCATION & POSTAL ADDRESS
              </span>
              <p
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                  marginTop: "0.35rem",
                }}
              >
                IEEE Student Branch (STB 28051)
                <br />
                Sri Venkateswara College of Engineering
                <br />
                Post Bag No.1, Pennalur Village,
                <br />
                Chennai - Bengaluru High Road,
                <br />
                Sriperumbudur Tk, Tamil Nadu 602117
              </p>
              <div
                className="mono"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  marginTop: "0.5rem",
                }}
              >
                {BRANCH_STATS.coordinates}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span
                className="mono"
                style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-primary)" }}
              >
                OFFICIAL SOCIAL & CODE REPOSITORIES
              </span>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}
              >
                <a
                  href="https://www.linkedin.com/company/ieee-svce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.35rem 0.75rem",
                    backgroundColor: "var(--color-surface-muted)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-xs)",
                    color: "var(--color-text-primary)",
                  }}
                  data-cursor="LINKEDIN"
                >
                  LINKEDIN ↗
                </a>
                <a
                  href="https://www.instagram.com/ieee__svce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.35rem 0.75rem",
                    backgroundColor: "var(--color-surface-muted)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-xs)",
                    color: "var(--color-text-primary)",
                  }}
                  data-cursor="INSTA"
                >
                  INSTAGRAM ↗
                </a>
                <a
                  href="https://github.com/ieee-svce"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.35rem 0.75rem",
                    backgroundColor: "var(--color-surface-muted)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-xs)",
                    color: "var(--color-text-primary)",
                  }}
                  data-cursor="GITHUB"
                >
                  GITHUB ↗
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps Embed Frame */}
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(14px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "1.25rem",
              boxShadow: "var(--shadow-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <span
              className="mono"
              style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-primary)" }}
            >
              GEOGRAPHIC COORDINATE POSITION
            </span>
            <div
              style={{
                width: "100%",
                height: "220px",
                borderRadius: "var(--radius-xs)",
                overflow: "hidden",
                border: "1px solid var(--color-border-subtle)",
                position: "relative",
              }}
            >
              <iframe
                title="SVCE Google Maps Location"
                src="https://maps.google.com/maps?q=Sri+Venkateswara+College+of+Engineering+Sriperumbudur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
