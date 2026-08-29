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
  "event" | "project" | "achievement" | "person" | "article" | "media" | "certificate";

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
    title: "Doomsday: Tech Edition",
    summary:
      "Immersive technical challenge pushing participants beyond conventional problem-solving with quick decisions and creative team engineering.",
    route: "/events/doomsday-tech-edition",
    provenance: "STB28051-EVT-DOOMSDAY",
    badgeText: "UPCOMING",
    year: "2026",
  },
  {
    id: "disc-event-02",
    category: "event",
    categoryLabel: "Online Quiz",
    title: "IEEE QuizVerse",
    summary:
      "Online technical quiz challenging participants across technology, engineering, innovation, science, and general technical knowledge.",
    route: "/events/ieee-quizverse",
    provenance: "STB28051-EVT-QUIZVERSE",
    badgeText: "UPCOMING",
    year: "2026",
  },
  {
    id: "disc-event-03",
    category: "event",
    categoryLabel: "Technical Challenge",
    title: "Decode and Deploy 2.0",
    summary:
      "Dual software and hardware challenge featuring Linux/CSS tracks, hardware exams, and interactive scenario enactment.",
    route: "/events/decode-and-deploy-2",
    provenance: "STB28051-EVT-DECODE-DEPLOY",
    badgeText: "UPCOMING",
    year: "2026",
  },
  {
    id: "disc-person-01",
    category: "person",
    categoryLabel: "Branch Leadership",
    title: "TR Hemachander — Student Branch Chair",
    summary:
      "Final year EEE leading branch operations, executive committee governance, and IEEE regional community initiatives.",
    route: "/team#tm-chair",
    provenance: "STB28051-ROSTER-2026",
    badgeText: "BRANCH CHAIR",
    year: "2026",
  },
  {
    id: "disc-project-01",
    category: "project",
    categoryLabel: "Innovation Lab",
    title: "Autonomous Edge-Vision Substation Monitor",
    summary:
      "Substation anomaly detection node powered by TinyML edge inference and ultra-low-power LoRa telemetry.",
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
    summary:
      "Recognized for exemplary technical activity dissemination, student membership growth, and community outreach.",
    route: "/community#madras-outstanding-branch",
    provenance: "MAS-AWD-2024-SVCE",
    badgeText: "SECTION AWARD",
    year: "2024",
  },
  {
    id: "disc-media-01",
    category: "media",
    categoryLabel: "Media Chronicle",
    title: "Technical Workshops & Hands-on Lab Sessions",
    summary:
      "Student engineers collaborating in workshops, lab workbenches, and technical project building.",
    route: "/media#med-01",
    provenance: "MED-ARC-2025-01",
    badgeText: "PHOTO CHRONICLE",
    year: "2025",
  },
  {
    id: "disc-article-01",
    category: "article",
    categoryLabel: "Knowledge Track",
    title: "Embedded Microcontroller & Power Systems Engineering Courseware",
    summary:
      "Technical slide decks, lab resources, and study materials curated for student engineers across IEEE society chapters.",
    route: "/learn",
    provenance: "STB28051-LRN-01",
    badgeText: "STUDY RESOURCE",
    year: "2026",
  },
  {
    id: "disc-cert-01",
    category: "certificate",
    categoryLabel: "Public Credential",
    title: "Verified Student Participation & Winner Credential",
    summary:
      "Institutional credential verification for student participants, organizers, and competition winners.",
    route: "/certificates",
    provenance: "CERT-STB28051-2026",
    badgeText: "CREDENTIAL VERIFIER",
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
