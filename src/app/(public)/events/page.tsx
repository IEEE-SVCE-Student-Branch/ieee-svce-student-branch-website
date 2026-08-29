import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { BRANCH_EVENTS, EventRecord } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Technical Events",
  description:
    "National engineering symposia, IEEE technical society workshops, hardware hackathons, and guest lectures hosted by IEEE SVCE.",
};

export default function EventsPage() {
  const upcomingEvents = BRANCH_EVENTS.filter(
    (e) => e.status === "UPCOMING" || e.status === "ACTIVE"
  );
  const pastEvents = BRANCH_EVENTS.filter((e) => e.status === "PAST");

  const renderEventCard = (evt: EventRecord) => (
    <div
      key={evt.id}
      id={evt.slug}
      style={{
        backgroundColor: "var(--color-surface)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        padding: "2.25rem",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1.75rem",
        transition: "all var(--transition-normal)",
      }}
    >
      <div>
        {/* Top Metadata */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: "0.6875rem",
              fontWeight: 800,
              color: evt.status !== "PAST" ? "var(--color-primary)" : "var(--color-text-muted)",
              background:
                evt.status !== "PAST"
                  ? "var(--color-primary-subtle)"
                  : "var(--color-surface-muted)",
              padding: "0.2rem 0.55rem",
              borderRadius: "var(--radius-xs)",
            }}
          >
            {evt.status === "ACTIVE"
              ? "● LIVE NOW"
              : evt.status === "UPCOMING"
                ? "● UPCOMING EVENT"
                : "CONCLUDED EVENT"}
          </span>
          <span
            className="mono"
            style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
          >
            {evt.provenance}
          </span>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <span
            className="mono"
            style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)" }}
          >
            [ {evt.track} ]
          </span>
          <h2
            style={{ fontSize: "1.5rem", fontWeight: 900, marginTop: "0.35rem", lineHeight: 1.25 }}
          >
            <Link href={`/events/${evt.slug}`} style={{ color: "inherit" }}>
              {evt.title}
            </Link>
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              marginTop: "0.25rem",
            }}
          >
            {evt.subtitle}
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "var(--color-text-secondary)",
              marginTop: "0.75rem",
            }}
          >
            {evt.abstract}
          </p>
        </div>

        {/* Date, Time & Venue */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginTop: "1.25rem",
            padding: "1rem 1.25rem",
            backgroundColor: "var(--color-surface-muted)",
            borderRadius: "var(--radius-xs)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <div>
            <div
              className="mono"
              style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-text-muted)" }}
            >
              DATE & TIME
            </div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, marginTop: "0.15rem" }}>
              {evt.date} • {evt.time}
            </div>
          </div>
          <div>
            <div
              className="mono"
              style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-text-muted)" }}
            >
              VENUE
            </div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, marginTop: "0.15rem" }}>
              {evt.venue}
            </div>
          </div>
        </div>

        {/* Winners if concluded */}
        {evt.winners && evt.winners.length > 0 && (
          <div
            style={{
              marginTop: "1.25rem",
              padding: "1rem",
              border: "1px dashed var(--color-primary)",
              borderRadius: "var(--radius-xs)",
              backgroundColor: "rgba(0,98,155,0.03)",
            }}
          >
            <div
              className="mono"
              style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-primary)" }}
            >
              CONTEST WINNERS & RESULTS
            </div>
            <div
              style={{
                marginTop: "0.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              {evt.winners.map((w, idx) => (
                <div
                  key={idx}
                  style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}
                >
                  <strong>{w.position}:</strong> {w.team} ({w.institution}) — <em>{w.project}</em>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {evt.tags.map((tag) => (
            <span
              key={tag}
              className="mono"
              style={{
                fontSize: "0.625rem",
                color: "var(--color-text-muted)",
                background: "var(--color-surface-muted)",
                padding: "0.15rem 0.45rem",
                borderRadius: "var(--radius-xs)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link
            href={`/events/${evt.slug}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "var(--color-primary)",
              textDecoration: "underline",
            }}
            data-cursor="DOSSIER"
          >
            FULL EVENT DOSSIER →
          </Link>

          {evt.registrationOpen && evt.registrationUrl && (
            <Link
              href={evt.registrationUrl}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                borderRadius: "var(--radius-xs)",
              }}
              data-cursor="REGISTER"
            >
              REGISTER
            </Link>
          )}

          {evt.certificateEventCode && (
            <Link
              href={`/certificates?code=${evt.certificateEventCode}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--color-text-secondary)",
              }}
              data-cursor="CERT"
            >
              CERTIFICATES ↗
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <PageShell
      title="Technical Events & Symposia (Event Field)"
      categoryTag="// TECHNICAL CALENDAR"
      description="Active conferences, 24-hour hardware hackathons, and IEEE society workshops structured with schedules, speaker dossiers, and verified certificates."
      breadcrumbLabel="EVENTS"
      provenanceCode="STB28051-CALENDAR-2026"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {/* Section 1: Upcoming Programs */}
        <div>
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              className="mono"
              style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}
            >
              {"// ACTIVE SCHEDULE"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Upcoming Technical Events
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {upcomingEvents.map(renderEventCard)}
          </div>
        </div>

        {/* Section 2: Concluded / Historical Events */}
        <div>
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              className="mono"
              style={{ fontSize: "0.6875rem", color: "var(--color-primary)", fontWeight: 700 }}
            >
              {"// EVENT REPOSITORIES & RESULTS"}
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Past Events & Chronicles
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {pastEvents.map(renderEventCard)}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
