import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PastEventDetail } from "@/components/Events/PastEventDetail";
import { PAST_EVENTS, getPastEventBySlug } from "@/lib/data/events-showcase";

interface ArchiveEventPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PAST_EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: ArchiveEventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getPastEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.title} | IEEE SVCE Events Archive`,
    description: event.shortDescription,
  };
}

export default async function ArchiveEventPage({ params }: ArchiveEventPageProps) {
  const { slug } = await params;
  const event = getPastEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <PageShell
      title={event.title}
      categoryTag={`// EVENT ARCHIVE: ${event.category.toUpperCase()}`}
      description={event.shortDescription}
      breadcrumbLabel="EVENTS"
      provenanceCode={`STB28051-ARCHIVE-${event.year}`}
    >
      <PastEventDetail event={event} />
    </PageShell>
  );
}