import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { EventsPageClient } from "@/components/Events/EventsPageClient";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events organized by IEEE SVCE Student Branch, including symposia, workshops, hackathons, and technical seminars.",
};

export default function EventsPage() {
  return (
    <PageShell
      title="Creating Experiences That Shape Tomorrow"
      categoryTag="// EVENTS & PROGRAMS"
      description="This page showcases the technical events, workshops, competitions, and seminars organized by IEEE SVCE Student Branch — from what's coming up next to a complete archive of past programs."
      breadcrumbLabel="EVENTS"
      provenanceCode="STB28051-EVENTS-2026"
    >
      <EventsPageClient />
    </PageShell>
  );
}