import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { MEDIA_COLLECTIONS, MediaCollection } from "@/lib/data/branch-data";

export const metadata: Metadata = {
  title: "Media Chronicles",
  description:
    "Curated visual chronicle of IEEE SVCE technical symposia, laboratory workshops, 24-hour hackathons, guest lectures, and team activities.",
};

export default function MediaPage() {
  const categories: MediaCollection["category"][] = [
    "EVENTS",
    "WORKSHOPS",
    "HACKATHONS",
    "GUEST_LECTURES",
    "TEAM_ACTIVITIES",
    "BEHIND_THE_SCENES",
  ];

  return (
    <PageShell
      title="Media Chronicles (Light Table)"
      categoryTag="// VISUAL PROVENANCE"
      description="Photographic and documentary records capturing live robotic arenas, hardware debugging sessions, distinguished lectures, and institutional milestones."
      breadcrumbLabel="MEDIA"
      provenanceCode="STB28051-MEDIA-ARCHIVE"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {/* Category Filter Pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <span
              key={cat}
              className="mono"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                padding: "0.35rem 0.75rem",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                color: "var(--color-text-secondary)",
              }}
            >
              {cat.replace(/_/g, " ")}
            </span>
          ))}
        </div>

        {/* Media Collections Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {MEDIA_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              id={col.id}
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
                gap: "1.5rem",
              }}
            >
              <div>
                {/* Visual Canvas Representation */}
                <div
                  style={{
                    height: "180px",
                    borderRadius: "var(--radius-xs)",
                    background:
                      "radial-gradient(circle at center, rgba(0,98,155,0.15) 0%, rgba(240,244,249,0.9) 100%)",
                    border: "1px solid var(--color-border-subtle)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    className="mono"
                    style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--color-primary)" }}
                  >
                    [ {col.category.replace(/_/g, " ")} ]
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--color-text-muted)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {col.itemsCount} CURATED CAPTURES
                  </div>
                </div>

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
                    {col.event}
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
                  >
                    {col.date}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.5rem" }}>
                  {col.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    marginTop: "0.5rem",
                    lineHeight: 1.6,
                  }}
                >
                  {col.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.875rem",
                  borderTop: "1px solid var(--color-border-subtle)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <span>Credit: {col.photographerCredit}</span>
                <span>{col.provenance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
