import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { BRANCH_EVENTS } from "@/lib/data/branch-data";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = BRANCH_EVENTS.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.title} | IEEE SVCE`,
    description: event.abstract,
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = BRANCH_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <PageShell
      title={event.title}
      categoryTag={`// EVENT CHRONICLE: ${event.track.toUpperCase()}`}
      description={event.subtitle}
      breadcrumbLabel="EVENTS"
      provenanceCode={event.provenance}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {/* Key Logistics Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            padding: "2rem",
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div>
            <span className="mono" style={{ fontSize: "0.625rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
              DATE & TIME
            </span>
            <div style={{ fontSize: "1.125rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--color-text-primary)" }}>
              {event.date}
            </div>
            <div className="mono" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
              {event.time}
            </div>
          </div>

          <div>
            <span className="mono" style={{ fontSize: "0.625rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
              VENUE
            </span>
            <div style={{ fontSize: "1.125rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--color-text-primary)" }}>
              {event.venue}
            </div>
            <div className="mono" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
              SVCE Campus, Sriperumbudur
            </div>
          </div>

          <div>
            <span className="mono" style={{ fontSize: "0.625rem", color: "var(--color-text-muted)", fontWeight: 700 }}>
              REGISTRATION STATUS
            </span>
            <div
              style={{
                fontSize: "1.125rem",
                fontWeight: 800,
                marginTop: "0.25rem",
                color: event.registrationOpen ? "var(--color-accent-emerald)" : "var(--color-text-muted)",
              }}
            >
              {event.registrationOpen ? "OPEN & ACCEPTING" : "CONCLUDED"}
            </div>
            {event.registrationOpen && (
              <Link
                href={event.registrationUrl || "/contact"}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  textDecoration: "underline",
                }}
              >
                PROCEED TO REGISTRATION →
              </Link>
            )}
          </div>
        </div>

        {/* Abstract & Theme Description */}
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
            {"// THEME & PROGRAM ABSTRACT"}
          </span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.35rem" }}>Event Description & Scope</h2>
          <p style={{ marginTop: "1rem", fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
            {event.abstract}
          </p>
        </div>

        {/* Keynote Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
                {"// DISTINGUISHED PRESENTERS"}
              </span>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>Keynote & Session Speakers</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {event.speakers.map((spk, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow-subtle)",
                  }}
                >
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800 }}>{spk.name}</h3>
                  <div className="mono" style={{ fontSize: "0.75rem", color: "var(--color-primary)", fontWeight: 700, marginTop: "0.25rem" }}>
                    {spk.designation}
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
                    {spk.organization}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Schedule / Agenda */}
        {event.schedule && event.schedule.length > 0 && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
                {"// TIME SEQUENCE"}
              </span>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>Detailed Agenda & Schedule</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {event.schedule.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    gap: "1.5rem",
                    backgroundColor: "var(--color-surface)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "1.25rem 1.75rem",
                    alignItems: "center",
                  }}
                >
                  <div className="mono" style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-primary)" }}>
                    {item.time}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9375rem", fontWeight: 700 }}>{item.session}</div>
                    <div className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", marginTop: "0.2rem" }}>
                      Venue: {item.venue} {item.speaker && `• Speaker: ${item.speaker}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organizers, Media, Reports & Certificate Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "1.75rem",
            }}
          >
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              ORGANIZING COMMITTEE
            </span>
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
              {event.organizers.map((org, i) => (
                <li key={i}>{org}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <span className="mono" style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}>
              CREDENTIALS & REPORTS
            </span>
            <Link
              href={`/certificates?code=${event.certificateEventCode || ""}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                color: "var(--color-primary)",
                fontWeight: 700,
                textDecoration: "underline",
              }}
            >
              VERIFY PARTICIPANT & WINNER CERTIFICATES →
            </Link>
            <Link
              href="/reports"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                color: "var(--color-text-secondary)",
                textDecoration: "underline",
              }}
            >
              DOWNLOAD PROCEEDINGS & AUDIT REPORT →
            </Link>
            <Link
              href="/media"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                color: "var(--color-text-secondary)",
                textDecoration: "underline",
              }}
            >
              VIEW EVENT PHOTO & VIDEO GALLERY →
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
