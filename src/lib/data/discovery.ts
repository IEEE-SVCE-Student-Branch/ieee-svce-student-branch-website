/**
 * IEEE SVCE — Discovery Data Repository (Surprise Me / Signal Field Engine)
 *
 * Mapped strictly to the Locked Information Architecture destinations:
 * - /events
 * - /innovation
 * - /community
 * - /team
 * - /learn
 * - /media
 * - /reports
 * - /certificates
 * - /about
 * - /partners
 * - /contact
 */

export type DiscoveryCategory =
  | "event"
  | "project"
  | "achievement"
  | "person"
  | "article"
  | "media"
  | "certificate";

export interface DiscoveryItem {
  id: string;
  category: DiscoveryCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  route: string;
  provenance: string;
  badgeText?: string;
  year?: string;
}

export const DISCOVERY_CATALOG: DiscoveryItem[] = [
  {
    id: "disc-event-01",
    category: "event",
    categoryLabel: "Flagship Event",
    title: "IMPULSE '26 — National Technical Symposium",
    summary: "Annual multi-track flagship conference featuring AI robotics hackathon, smart grid challenge, and paper presentations.",
    route: "/events/impulse-2026",
    provenance: "STB28051-EVT-2026-01",
    badgeText: "UPCOMING",
    year: "2026",
  },
  {
    id: "disc-project-01",
    category: "project",
    categoryLabel: "Innovation Lab",
    title: "Autonomous Edge-Vision Substation Monitor",
    summary: "Substation anomaly detection node powered by TinyML edge inference and ultra-low-power LoRa telemetry.",
    route: "/innovation#edge-vision-grid",
    provenance: "STB28051-PRJ-2025-08",
    badgeText: "STUDENT LAB",
    year: "2025",
  },
  {
    id: "disc-achievement-01",
    category: "achievement",
    categoryLabel: "Community Laurel",
    title: "IEEE Madras Section Outstanding Student Branch Chapter",
    summary: "Recognized for exemplary technical activity dissemination, student membership growth, and community outreach.",
    route: "/community#madras-outstanding-branch",
    provenance: "MAS-AWD-2024-SVCE",
    badgeText: "SECTION AWARD",
    year: "2024",
  },
  {
    id: "disc-person-01",
    category: "person",
    categoryLabel: "Branch Leadership",
    title: "Dr. P. Jothilakshmi — Student Branch Counselor",
    summary: "Senior Member IEEE, guiding research working groups, professional ethics, and student technical chapters.",
    route: "/team#tm-counselor-01",
    provenance: "STB28051-BIO-001",
    badgeText: "FACULTY COUNSELOR",
    year: "2026",
  },
  {
    id: "disc-article-01",
    category: "article",
    categoryLabel: "Knowledge Track",
    title: "FreeRTOS & Embedded Firmware Architecture Courseware",
    summary: "Slide deck covering task priority inversion, mutexes, semaphores, and DMA memory transfers on ARM Cortex-M microcontrollers.",
    route: "/learn#lrn-01",
    provenance: "STB28051-LRN-01",
    badgeText: "COURSEWARE",
    year: "2026",
  },
  {
    id: "disc-media-01",
    category: "media",
    categoryLabel: "Media Chronicle",
    title: "National Robotics Championship Arena Finals",
    summary: "48 inter-collegiate hardware teams competing in the arena during TechFest SVCE.",
    route: "/media#med-01",
    provenance: "MED-ARC-2025-01",
    badgeText: "PHOTO CHRONICLE",
    year: "2025",
  },
  {
    id: "disc-cert-01",
    category: "certificate",
    categoryLabel: "Public Credential",
    title: "IMPULSE '26 Robotics Arena Winner Certificate",
    summary: "Cryptographically verifiable credential issued to national competition winners.",
    route: "/certificates?id=IEEE-SVCE-2026-IMP-042",
    provenance: "CERT-STB28051-2026-042",
    badgeText: "VERIFIED CREDENTIAL",
    year: "2026",
  },
];

export function getRandomDiscovery(excludeId?: string): DiscoveryItem {
  const eligible = excludeId
    ? DISCOVERY_CATALOG.filter((item) => item.id !== excludeId)
    : DISCOVERY_CATALOG;
  const index = Math.floor(Math.random() * eligible.length);
  return eligible[index] || DISCOVERY_CATALOG[0];
}
