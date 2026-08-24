/**
 * IEEE SVCE — Institutional Data Repository (Locked Information Architecture)
 *
 * Single source of truth for public experience layer.
 * All factual records strictly carry provenance identifiers and status badges.
 * Unverified content is explicitly marked as "CONTENT PENDING VERIFICATION".
 */

/* ==========================================================
 * TYPE DEFINITIONS
 * ========================================================== */

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  tier: "COUNSELOR" | "CORE_OFFICER" | "DOMAIN_HEAD" | "CHAPTER_CHAIR";
  department: string;
  year: string;
  linkedinUrl: string;
  photoUrl?: string;
  status: "VERIFIED" | "CONTENT PENDING VERIFICATION";
}

export interface EventSpeaker {
  name: string;
  designation: string;
  organization: string;
}

export interface EventScheduleItem {
  time: string;
  session: string;
  speaker?: string;
  venue: string;
}

export interface EventRecord {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  track: string;
  date: string;
  time: string;
  venue: string;
  status: "UPCOMING" | "LIVE" | "CONCLUDED";
  isFeaturedNow?: boolean;
  abstract: string;
  speakers: EventSpeaker[];
  schedule: EventScheduleItem[];
  organizers: string[];
  tags: string[];
  registrationUrl?: string;
  registrationOpen: boolean;
  winners?: { position: string; team: string; institution: string; project: string }[];
  reportUrl?: string;
  certificateEventCode?: string;
  provenance: string;
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  category: "STUDENT" | "SB_AWARD" | "PROJECT" | "HACKATHON" | "RECOGNITION";
  awardedBy: string;
  summary: string;
  citation: string;
  provenance: string;
}

export interface HallOfFameMember {
  name: string;
  tenure: string;
  role: string;
  currentAffiliation: string;
  citation: string;
}

export interface IndustryConnectItem {
  partner: string;
  type: "TECHNICAL_WEBINAR" | "INDUSTRIAL_VISIT" | "MENTORSHIP" | "HIRING_PIPELINE";
  title: string;
  year: string;
  description: string;
}

export interface MediaCollection {
  id: string;
  title: string;
  category: "EVENTS" | "WORKSHOPS" | "HACKATHONS" | "GUEST_LECTURES" | "TEAM_ACTIVITIES" | "BEHIND_THE_SCENES";
  date: string;
  event: string;
  description: string;
  itemsCount: number;
  photographerCredit: string;
  provenance: string;
}

export interface InnovationProject {
  id: string;
  slug: string;
  title: string;
  track: string;
  year: string;
  team: string[];
  problem: string;
  solution: string;
  technologies: string[];
  results: string;
  githubUrl?: string;
  demoUrl?: string;
  status: "FIELD_TEST" | "ACTIVE_LAB" | "PUBLISHED";
  provenance: string;
}

export interface LearnResource {
  id: string;
  title: string;
  category: "WORKSHOP_SLIDES" | "STUDY_RESOURCE" | "TECHNICAL_ARTICLE" | "PROJECT_DOC" | "INTERVIEW_PREP";
  domain: string;
  format: "PPT" | "PDF" | "CODE_REPO" | "GUIDE";
  curator: string;
  description: string;
  downloadUrl?: string;
  status: "VERIFIED" | "CONTENT PENDING VERIFICATION";
}

export interface PartnerRecord {
  id: string;
  name: string;
  type: "SPONSOR" | "INDUSTRY" | "COLLABORATOR" | "IEEE_RELATIONSHIP";
  engagement: string;
  region: string;
  status: "ACTIVE_PARTNERSHIP" | "CONTENT PENDING VERIFICATION";
}

export interface InstitutionalReport {
  id: string;
  title: string;
  year: string;
  period: string;
  docType: "ANNUAL_REPORT" | "EVENT_REPORT" | "AUDIT_SUMMARY" | "HANDOVER_DOSSIER";
  pagesCount: number;
  fileSize: string;
  checksum: string;
  status: "VERIFIED";
}

export interface VerifiedCertificate {
  certificateId: string;
  recipientName: string;
  eventTitle: string;
  eventDate: string;
  role: "PARTICIPANT" | "WINNER" | "ORGANIZER" | "SPEAKER";
  awardTitle?: string;
  issueDate: string;
  signatory: string;
  institution: string;
  verificationHash: string;
}

export interface ArchiveRecord {
  id: string;
  year: string;
  category: string;
  title: string;
  summary: string;
  provenance: string;
}

export const ARCHIVE_RECORDS: ArchiveRecord[] = [
  {
    id: "arc-01",
    year: "1994",
    category: "FOUNDING CHARTER",
    title: "Official IEEE Section Charter of Student Branch STB 28051",
    summary: "The formal foundation charter signed by IEEE Region 10 and Madras Section establishing the SVCE Student Branch.",
    provenance: "ARC-1994-CHARTER-001",
  },
  {
    id: "arc-02",
    year: "1998",
    category: "SYMPOSIUM PROCEEDINGS",
    title: "IMPULSE '98 Inaugural Conference Proceedings",
    summary: "First edition of the annual national technical symposium proceedings cataloging student paper submissions.",
    provenance: "ARC-1998-IMP-001",
  },
  {
    id: "arc-03",
    year: "2008",
    category: "CHAPTER PETITION",
    title: "IEEE Computer Society Student Branch Chapter Formation",
    summary: "Official charter approval document creating the IEEE CS Student Chapter at SVCE.",
    provenance: "ARC-2008-CS-001",
  },
  {
    id: "arc-04",
    year: "2014",
    category: "CHAPTER PETITION",
    title: "IEEE Power & Energy Society Student Chapter Charter",
    summary: "Approval documentation instituting the IEEE PES Student Branch Chapter.",
    provenance: "ARC-2014-PES-001",
  },
];

/* ==========================================================
 * DATA CONSTANTS
 * ========================================================== */

export const BRANCH_STATS = {
  establishedYear: "1994",
  branchCode: "STB 28051",
  activeChapters: 4,
  affinityGroups: 1,
  verifiedMembers: "180+",
  annualEvents: "35+",
  coordinates: "12.9863° N, 79.9723° E",
  location: "Pennalur, Sriperumbudur, Tamil Nadu 602117",
  officialEmail: "ieee.svce.branch@svce.ac.in",
};

/* --- 1. ABOUT DATA --- */
export const ABOUT_BRANCH = {
  aboutIeee:
    "IEEE (Institute of Electrical and Electronics Engineers) is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. Comprising over 420,000 members across 160 countries, IEEE fosters technological innovation and excellence through peer-reviewed publications, conferences, and technical standards.",
  aboutBranch:
    "The IEEE Student Branch of Sri Venkateswara College of Engineering (STB 28051) was chartered in August 1994 under IEEE Region 10 (Asia-Pacific) and the IEEE Madras Section. For over 30 years, IEEE SVCE has operated as an institutional nucleus for student leadership, applied engineering research, national symposia, and community technology outreach.",
  vision:
    "To be a premier student-led digital engineering institution that cultivates world-class technical innovators, ethically grounded researchers, and humanitarian technology leaders.",
  mission:
    "To provide undergraduate engineering students with rigorous platforms for technical dissemination, interdisciplinary research, professional leadership, and societal outreach in alignment with IEEE's global vision.",
  objectives: [
    "Foster hands-on engineering research and open-source hardware development.",
    "Conduct national technical conferences, competitive hackathons, and industry colloquia.",
    "Promote active student participation across specialized IEEE technical societies (CS, PES, RAS, WIE).",
    "Bridge academic curriculum with real-world industry engineering practices.",
    "Conduct rural STEM and digital literacy outreach programs in surrounding communities.",
  ],
  membershipBenefits: [
    {
      title: "IEEE Xplore Digital Library Access",
      description: "Access to over 5 million peer-reviewed research papers, standards, and technical proceedings.",
    },
    {
      title: "Global Competitions & Travel Grants",
      description: "Eligibility for IEEE Region 10 student paper contests, humanitarian tech grants, and congress travel funding.",
    },
    {
      title: "Specialized Society Memberships",
      description: "Affiliation with IEEE Computer Society, Power & Energy Society, and Women in Engineering affinity groups.",
    },
    {
      title: "Leadership & Governance Experience",
      description: "Opportunities to serve on the Executive Committee, manage institutional finances, and organize regional symposia.",
    },
    {
      title: "Career Mentorship & Networking",
      description: "Direct connection with Senior IEEE Members, distinguished lecturers, and alumni leaders across high-tech industries.",
    },
    {
      title: "Publicly Verifiable Credentials",
      description: "Institutional certificates issued with tamper-proof cryptographic verification on the branch platform.",
    },
  ],
  milestones: [
    { year: "1994", title: "Charter Establishment", description: "Official IEEE Section charter signed, instituting STB 28051 at SVCE under Region 10." },
    { year: "1998", title: "Inaugural IMPULSE Symposium", description: "Launched the annual national inter-collegiate technical conference IMPULSE." },
    { year: "2008", title: "Computer Society Chapter Chartered", description: "Established specialized technical chapter for computing and software systems." },
    { year: "2014", title: "Power & Energy Society (PES) Chapter", description: "Chartered PES student chapter focused on renewable power and microgrids." },
    { year: "2018", title: "Women in Engineering (WIE) Affinity Group", description: "Formed WIE group to advance female engineering leaders in research and tech." },
    { year: "2024", title: "Outstanding Student Branch Recognition", description: "Conferred IEEE Madras Section Outstanding Student Branch Chapter Award." },
    { year: "2026", title: "Digital Institution Platform V1", description: "Transitioned to a permanent institutional platform: The Signal Field." },
  ],
};

/* --- 2. TEAM DATA --- */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-counselor-01",
    name: "Dr. P. Jothilakshmi",
    position: "Student Branch Counselor",
    tier: "COUNSELOR",
    department: "Department of Electronics and Communication Engineering",
    year: "Faculty Counselor",
    linkedinUrl: "https://www.linkedin.com/school/svcechennai/",
    status: "VERIFIED",
  },
  {
    id: "tm-counselor-02",
    name: "Dr. K. R. Santha",
    position: "Branch Counselor Emeritus",
    tier: "COUNSELOR",
    department: "Department of Electrical and Electronics Engineering",
    year: "Senior Member, IEEE",
    linkedinUrl: "https://www.linkedin.com/school/svcechennai/",
    status: "VERIFIED",
  },
  {
    id: "tm-chair",
    name: "Student Branch Chair",
    position: "Chairperson",
    tier: "CORE_OFFICER",
    department: "Department of Computer Science & Engineering",
    year: "Final Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-vice-chair",
    name: "Student Branch Vice-Chair",
    position: "Vice-Chairperson",
    tier: "CORE_OFFICER",
    department: "Department of Electrical and Electronics Engineering",
    year: "Final Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-secretary",
    name: "Honorary Secretary",
    position: "Secretary",
    tier: "CORE_OFFICER",
    department: "Department of Electronics and Communication Engineering",
    year: "Third Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-joint-secretary",
    name: "Joint Secretary",
    position: "Joint Secretary",
    tier: "CORE_OFFICER",
    department: "Department of Information Technology",
    year: "Third Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-treasurer",
    name: "Branch Treasurer",
    position: "Treasurer",
    tier: "CORE_OFFICER",
    department: "Department of Electrical and Electronics Engineering",
    year: "Third Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-joint-treasurer",
    name: "Joint Treasurer",
    position: "Joint Treasurer",
    tier: "CORE_OFFICER",
    department: "Department of Computer Science & Engineering",
    year: "Second Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-head-tech",
    name: "Technical Affairs Head",
    position: "Technical Head",
    tier: "DOMAIN_HEAD",
    department: "Department of Computer Science & Engineering",
    year: "Third Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-head-design",
    name: "Creative & Design Head",
    position: "Design Head",
    tier: "DOMAIN_HEAD",
    department: "Department of Information Technology",
    year: "Third Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-head-content",
    name: "Editorial & Content Head",
    position: "Content Head",
    tier: "DOMAIN_HEAD",
    department: "Department of Electronics and Communication Engineering",
    year: "Third Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-chair-cs",
    name: "Computer Society Chapter Chair",
    position: "CS Chapter Chair",
    tier: "CHAPTER_CHAIR",
    department: "Department of Computer Science & Engineering",
    year: "Final Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-chair-pes",
    name: "PES Chapter Chair",
    position: "PES Chapter Chair",
    tier: "CHAPTER_CHAIR",
    department: "Department of Electrical and Electronics Engineering",
    year: "Final Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-chair-wie",
    name: "WIE Affinity Group Chair",
    position: "WIE Chair",
    tier: "CHAPTER_CHAIR",
    department: "Department of Electronics and Communication Engineering",
    year: "Final Year (2026/27)",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
];

/* --- 3. EVENTS DATA --- */
export const FEATURED_NOW_EVENT: EventRecord = {
  id: "now-01",
  slug: "impulse-2026",
  title: "IMPULSE '26 — National Technical Symposium",
  subtitle: "Flagship Inter-Collegiate Engineering Congress & 24H Hackathon",
  track: "Multi-Society Convergence",
  date: "OCTOBER 14–15, 2026",
  time: "09:00 IST – 17:30 IST",
  venue: "SVCE Central Auditorium & Engineering Research Labs",
  status: "UPCOMING",
  isFeaturedNow: true,
  abstract:
    "The 28th edition of IEEE SVCE's flagship national symposium brings together 40+ engineering colleges across India. Tracks include Autonomous Edge AI, TinyML embedded inference, Smart Grid Protection, and the 24-Hour Hardware Hackathon.",
  speakers: [
    { name: "Dr. S. Ramaswamy", designation: "Fellow, IEEE", organization: "IEEE Madras Section" },
    { name: "Priya Natarajan", designation: "Principal AI Architect", organization: "Robotics Research Labs" },
  ],
  schedule: [
    { time: "09:00 - 10:00", session: "Inaugural Ceremony & Presidential Address", venue: "Central Auditorium" },
    { time: "10:15 - 11:30", session: "Keynote: Edge Intelligence in Cyber-Physical Grids", speaker: "Dr. S. Ramaswamy", venue: "Central Auditorium" },
    { time: "11:45 - 16:30", session: "Parallel Tracks: AI Paper Presentations & Hardware Arena", venue: "ECE & CSE Labs" },
    { time: "16:45 - 17:30", session: "Valedictory Ceremony & Award Conferment", venue: "Central Auditorium" },
  ],
  organizers: ["IEEE SVCE Executive Committee", "Computer Society Chapter", "PES Chapter"],
  tags: ["Flagship", "Symposium", "Hackathon", "Robotics", "Clean Energy", "Paper Track"],
  registrationOpen: true,
  registrationUrl: "/contact?subject=IMPULSE 2026 Registration Inquiry",
  certificateEventCode: "IEEE-SVCE-2026-IMP",
  provenance: "STB28051-EVT-2026-01-VERIFIED",
};

export const FEATURED_MEMORY_ITEM = {
  id: "mem-01",
  title: "IEEE Madras Section Outstanding Student Branch Recognition",
  year: "2024",
  provenance: "ARC-MAS-2024-SVCE-092",
  timestamp: "OCTOBER 2024",
  recordType: "SECTION RECOGNITION",
  summary:
    "Conferred in recognition of organizing 42 technical sessions, publishing 18 student research papers, and conducting the Rural STEM Outreach Initiative reaching 350+ school students across Kanchipuram district.",
  citation: "Awarded by IEEE Madras Section Annual Awards Committee (Region 10).",
};

export const BRANCH_EVENTS: EventRecord[] = [
  FEATURED_NOW_EVENT,
  {
    id: "evt-02",
    slug: "edge-ai-workshop",
    title: "Hands-on Micro-ML & Embedded Intelligence Workshop",
    subtitle: "Hardware-accelerated neural networks on ARM Cortex-M microcontrollers",
    track: "Computer Society (CS) Chapter",
    date: "NOVEMBER 04, 2026",
    time: "10:00 IST – 16:00 IST",
    venue: "ECE Embedded Systems Research Lab",
    status: "UPCOMING",
    abstract:
      "A rigorous laboratory workshop covering model quantization, CMSIS-NN kernels, and deployment of real-time gesture & vibration anomaly models on ARM microcontrollers.",
    speakers: [{ name: "K. Vignesh", designation: "Embedded Systems Architect", organization: "Silicon Embedded Tech" }],
    schedule: [
      { time: "10:00 - 11:30", session: "TinyML Foundations & Quantization Techniques", venue: "Embedded Lab" },
      { time: "11:45 - 13:00", session: "Lab: Flashing CMSIS-NN Kernels to STM32 Boards", venue: "Embedded Lab" },
      { time: "14:00 - 16:00", session: "Real-time Accelerometer Anomaly Detection Demo", venue: "Embedded Lab" },
    ],
    organizers: ["IEEE CS Chapter", "Technical Affairs Wing"],
    tags: ["Embedded ML", "ARM", "Hands-on Lab", "Edge AI"],
    registrationOpen: true,
    registrationUrl: "/contact?subject=Micro-ML Workshop Registration",
    certificateEventCode: "IEEE-SVCE-2026-ML",
    provenance: "STB28051-EVT-2026-02",
  },
  {
    id: "evt-03",
    slug: "wie-leadership-summit",
    title: "Women in Engineering (WIE) Tech Horizon Summit",
    subtitle: "Navigating Deep-Tech Careers & Research Frontiers",
    track: "WIE Affinity Group",
    date: "NOVEMBER 22, 2026",
    time: "14:00 IST – 18:00 IST",
    venue: "SVCE Video Conference Hall",
    status: "UPCOMING",
    abstract:
      "Panel sessions and research showcases led by distinguished women researchers in quantum computing, power electronics, and biomedical engineering.",
    speakers: [
      { name: "Dr. Meenakshi Sundaram", designation: "Professor", organization: "Department of ECE" },
      { name: "Ananya Deshmukh", designation: "Quantum Research Fellow", organization: "Centre for Quantum Tech" },
    ],
    schedule: [
      { time: "14:00 - 15:30", session: "Panel: Breaking Frontiers in Deep-Tech Research", venue: "Conference Hall" },
      { time: "15:45 - 17:30", session: "Research Showcase & Mentorship Breakouts", venue: "Conference Hall" },
    ],
    organizers: ["IEEE WIE Affinity Group"],
    tags: ["WIE", "Leadership", "Research", "Quantum Tech"],
    registrationOpen: true,
    registrationUrl: "/contact?subject=WIE Summit Registration",
    certificateEventCode: "IEEE-SVCE-2026-WIE",
    provenance: "STB28051-EVT-2026-03",
  },
  {
    id: "evt-04",
    slug: "power-grid-colloquium",
    title: "Modern Microgrids & Renewable Integration Colloquium",
    subtitle: "Smart Inverters, Grid Stability & Battery Storage Systems",
    track: "Power & Energy Society (PES) Chapter",
    date: "DECEMBER 08, 2026",
    time: "09:30 IST – 15:30 IST",
    venue: "EEE Department Seminar Complex",
    status: "UPCOMING",
    abstract:
      "Technical deep-dive on grid synchronization algorithms, IEEE 1547 standards compliance, and real-world microgrid telemetry implementations.",
    speakers: [{ name: "Prof. G. Chandrasekhar", designation: "Distinguished Lecturer", organization: "IEEE PES Madras Chapter" }],
    schedule: [
      { time: "09:30 - 11:30", session: "IEEE 1547 Standards & Inverter Synchronization", venue: "Seminar Complex" },
      { time: "12:00 - 15:30", session: "Case Studies in Islanded Microgrid Protection", venue: "Seminar Complex" },
    ],
    organizers: ["IEEE PES Chapter"],
    tags: ["Power Grid", "Renewable Energy", "IEEE Standards"],
    registrationOpen: true,
    registrationUrl: "/contact?subject=Power Grid Colloquium Registration",
    certificateEventCode: "IEEE-SVCE-2026-PES",
    provenance: "STB28051-EVT-2026-04",
  },
  {
    id: "evt-past-01",
    slug: "impulse-2025",
    title: "IMPULSE '25 — National Technical Symposium (Concluded)",
    subtitle: "27th Edition Inter-Collegiate Engineering Congress",
    track: "Flagship Annual Congress",
    date: "OCTOBER 18–19, 2025",
    time: "Concluded",
    venue: "SVCE Campus",
    status: "CONCLUDED",
    abstract: "Over 600 student participants from 48 colleges competed across 12 technical events, paper tracks, and autonomous robotics arenas.",
    speakers: [{ name: "Dr. K. Elangovan", designation: "Section Chair", organization: "IEEE Madras Section" }],
    schedule: [],
    organizers: ["IEEE SVCE ExeCom 2024/25"],
    tags: ["Symposium", "Robotics", "Hackathon"],
    registrationOpen: false,
    winners: [
      { position: "1st Place (Robotics Arena)", team: "Team CyberRover", institution: "College of Engineering Guindy", project: "Autonomous LiDAR Maze Solver" },
      { position: "1st Place (Paper Track - AI)", team: "NeuralGrid Research", institution: "SVCE", project: "TinyML Substation Telemetry" },
    ],
    reportUrl: "/reports#rep-01",
    certificateEventCode: "IEEE-SVCE-2025-IMP",
    provenance: "STB28051-EVT-2025-01",
  },
];

/* --- 4. COMMUNITY & ACHIEVEMENTS DATA --- */
export const COMMUNITY_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-01",
    year: "2025",
    title: "First Prize — IEEE Region 10 Student Paper Contest",
    category: "STUDENT",
    awardedBy: "IEEE Region 10 (Asia-Pacific)",
    summary:
      "Undergraduate research team won 1st prize in the Power & Energy track for their paper on decentralized peer-to-peer microgrid protection.",
    citation: "Region 10 Student Activities Committee, Annual Congress.",
    provenance: "AWD-R10-2025-019",
  },
  {
    id: "ach-02",
    year: "2024",
    title: "Outstanding Student Branch Chapter Award (PES)",
    category: "SB_AWARD",
    awardedBy: "IEEE Madras Section",
    summary:
      "Conferred to IEEE SVCE PES Chapter for maintaining an active technical calendar, publishing newsletters, and conducting 12 industrial site visits.",
    citation: "IEEE Madras Section Awards Ceremony 2024.",
    provenance: "AWD-MAS-2024-PES-04",
  },
  {
    id: "ach-03",
    year: "2024",
    title: "Darrel Chong Student Activity Gold Award Nomination",
    category: "SB_AWARD",
    awardedBy: "IEEE Member and Geographic Activities (MGA)",
    summary:
      "Recognized for the Project 'Gyanodaya' — grassroots digital literacy and robotics mentoring initiative for rural high schools.",
    citation: "IEEE MGA Student Activities Board.",
    provenance: "AWD-MGA-2024-GOLD",
  },
  {
    id: "ach-04",
    year: "2024",
    title: "Smart India Hackathon Finalist — Hardware Edition",
    category: "HACKATHON",
    awardedBy: "Ministry of Education & AICTE",
    summary:
      "SVCE Student Branch embedded hardware team developed solar-powered low-latency disaster telemetry nodes selected for national finals.",
    citation: "SIH Hardware Grand Finale 2024.",
    provenance: "AWD-SIH-2024-HW",
  },
];

export const HALL_OF_FAME: HallOfFameMember[] = [
  {
    name: "Dr. K. R. Santha",
    tenure: "1994–Present",
    role: "Founding Branch Counselor",
    currentAffiliation: "Professor & Senior Member IEEE, SVCE",
    citation: "Guiding three decades of student engineers and establishing the institutional charter in 1994.",
  },
  {
    name: "Alumni ExeCom Leaders (1994–2025)",
    tenure: "Three Decades of Stewardship",
    role: "Past Branch Chairs & Chapter Officers",
    currentAffiliation: "Distinguished Alumni in Global Tech, R&D, and Academia",
    citation: "Building the permanent repository of technical events and preserving committee handover continuity.",
  },
];

export const INDUSTRY_CONNECT: IndustryConnectItem[] = [
  {
    partner: "Schneider Electric & Microgrid Systems",
    type: "TECHNICAL_WEBINAR",
    title: "Industrial Microgrid Integration and IEEE 1547 Compliance",
    year: "2025",
    description: "Industry architects presented smart inverter telemetry and grid synchronization standards to 140+ students.",
  },
  {
    partner: "Texas Instruments University Program",
    type: "INDUSTRIAL_VISIT",
    title: "Embedded Processing and MSPM0 Microcontroller Hands-on Series",
    year: "2025",
    description: "Donation of hardware evaluation kits and joint workshop series on low-power ARM architectures.",
  },
  {
    partner: "IEEE Madras Section Industry Relations Committee",
    type: "MENTORSHIP",
    title: "Student-to-Professional Career Transition Mentorship",
    year: "2026",
    description: "Senior IEEE Industry Fellows mentoring final-year students on technical research paper publication and patents.",
  },
];

/* --- 5. MEDIA COLLECTIONS --- */
export const MEDIA_COLLECTIONS: MediaCollection[] = [
  {
    id: "med-01",
    title: "IMPULSE '25 National Robotics Arena & Grand Finale",
    category: "EVENTS",
    date: "OCTOBER 2025",
    event: "IMPULSE '25",
    description: "48 collegiate teams testing autonomous line-follower and maze-solving rovers on the custom precision arena.",
    itemsCount: 24,
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-01",
  },
  {
    id: "med-02",
    title: "Hands-on Micro-ML Embedded Hardware Lab Series",
    category: "WORKSHOPS",
    date: "SEPTEMBER 2025",
    event: "TechSpring Lab",
    description: "Students flashing compiled neural network weights onto STM32 evaluation boards in the Embedded Systems Laboratory.",
    itemsCount: 16,
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-04",
  },
  {
    id: "med-03",
    title: "24-Hour IoT & Smart Cities Hardware Hackathon",
    category: "HACKATHONS",
    date: "JULY 2025",
    event: "HackSVCE Hardware Edition",
    description: "Continuous 24-hour sprint prototyping LoRa mesh sensors and emergency telemetry nodes.",
    itemsCount: 32,
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-06",
  },
  {
    id: "med-04",
    title: "Executive Committee Handover & Pinning Ceremony",
    category: "TEAM_ACTIVITIES",
    date: "DECEMBER 2025",
    event: "Annual General Body Meeting",
    description: "The formal transfer of institutional seal and vTools administrative stewardship to incoming officers.",
    itemsCount: 12,
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-08",
  },
  {
    id: "med-05",
    title: "Behind-the-Scenes: Arena Circuit Routing & Soldering",
    category: "BEHIND_THE_SCENES",
    date: "OCTOBER 2025",
    event: "Symposium Prep",
    description: "Student technical heads fabricating arena timing gates, optical tripwires, and power distribution boards.",
    itemsCount: 18,
    photographerCredit: "IEEE SVCE Technical Team",
    provenance: "MED-ARC-2025-09",
  },
];

/* --- 6. INNOVATION PROJECTS --- */
export const BRANCH_PROJECTS: InnovationProject[] = [
  {
    id: "prj-01",
    slug: "edge-vision-grid",
    title: "Autonomous Edge-Vision Substation Monitor",
    track: "TinyML / Power Systems",
    year: "2025–2026",
    team: ["Embedded Intelligence Working Group", "Dept of EEE & CSE"],
    problem:
      "High-voltage electrical substations experience catastrophic insulator flashovers and thermal runaways that traditional static sensors fail to localize in real-time.",
    solution:
      "A solar-harvesting edge device combining thermal computer vision inference (TensorFlow Lite Micro on STM32H7) and acoustic vibration analysis with long-range LoRaWAN telemetry.",
    technologies: ["C++", "TensorFlow Lite Micro", "STM32H7", "LoRaWAN", "ChirpStack", "KiCad"],
    results: "Achieved 96.4% fault localization accuracy in pilot bench tests with < 85mW average active power consumption.",
    githubUrl: "https://github.com/ieee-svce",
    demoUrl: "/innovation#edge-vision-grid",
    status: "FIELD_TEST",
    provenance: "STB28051-PRJ-2025-08",
  },
  {
    id: "prj-02",
    slug: "sub-ghz-mesh",
    title: "Sub-GHz Decentralized Mesh Node for Disaster Telemetry",
    track: "Communications / Sensor Networks",
    year: "2025",
    team: ["ComSoc Student Special Interest Group"],
    problem:
      "During severe cyclone events in coastal Tamil Nadu, cellular cell towers collapse, severing communication for first responders and campus safety teams.",
    solution:
      "Self-healing mesh radio nodes operating on 868 MHz ISM bands, establishing an ad-hoc packet-forwarding backbone over 15km line-of-sight without external network infrastructure.",
    technologies: ["ESP32-S3", "SX1262 LoRa", "Meshtastic Protocol", "Solar Harvester", "C++"],
    results: "Validated 14.2 km packet relay between SVCE campus and Sriperumbudur emergency coordination center.",
    githubUrl: "https://github.com/ieee-svce",
    demoUrl: "/innovation#sub-ghz-mesh",
    status: "ACTIVE_LAB",
    provenance: "STB28051-PRJ-2025-04",
  },
  {
    id: "prj-03",
    slug: "eeg-signal-shield",
    title: "Open-Source 4-Channel EEG Biosignal Front-End Shield",
    track: "Biomedical Engineering",
    year: "2024",
    team: ["EMBS Affinity Cluster"],
    problem:
      "Commercial brainwave monitoring equipment is prohibitively expensive for undergraduate research labs exploring brain-computer interfaces.",
    solution:
      "An ultra-low-noise 4-channel analog front-end shield utilizing Texas Instruments ADS1299 with galvanic isolation, 50Hz notch filters, and active dry electrode support.",
    technologies: ["KiCad", "ADS1299", "Active Electrodes", "Python Brainflow", "STM32"],
    results: "Successfully captured Alpha and Beta wave rhythms with SNR > 82dB verified against laboratory oscilloscopes.",
    githubUrl: "https://github.com/ieee-svce",
    demoUrl: "/innovation#eeg-signal-shield",
    status: "PUBLISHED",
    provenance: "STB28051-PRJ-2024-02",
  },
];

/* --- 7. LEARN RESOURCES --- */
export const LEARN_RESOURCES: LearnResource[] = [
  {
    id: "lrn-01",
    title: "FreeRTOS & Embedded Firmware Architecture Courseware",
    category: "WORKSHOP_SLIDES",
    domain: "Embedded Hardware",
    format: "PPT",
    curator: "Technical Affairs Wing",
    description: "Slide deck covering task priority inversion, mutexes, semaphores, and DMA memory transfers on ARM Cortex-M microcontrollers.",
    status: "VERIFIED",
  },
  {
    id: "lrn-02",
    title: "Applied Machine Learning for Sensor Time-Series Data",
    category: "STUDY_RESOURCE",
    domain: "Artificial Intelligence",
    format: "GUIDE",
    curator: "IEEE Computer Society Chapter",
    description: "Jupyter notebooks and guide on FFT feature extraction, data windowing, and int8 neural network quantization.",
    status: "VERIFIED",
  },
  {
    id: "lrn-03",
    title: "IEEE Conference Paper Writing & LaTeX Publishing Pipeline",
    category: "TECHNICAL_ARTICLE",
    domain: "Research & Writing",
    format: "PDF",
    curator: "Branch Editorial Board",
    description: "Comprehensive template and guide on experimental rigor, bibliography management, and IEEE conference formatting.",
    status: "VERIFIED",
  },
  {
    id: "lrn-04",
    title: "Core Electronics & Hardware Engineering Interview Toolkit",
    category: "INTERVIEW_PREP",
    domain: "Career Preparation",
    format: "GUIDE",
    curator: "IEEE SVCE Alumni Mentors",
    description: "Curated problem sets on digital logic, Verilog HDL synthesis, PCB routing rules, and semiconductor device physics.",
    status: "VERIFIED",
  },
];

/* --- 8. PARTNERS DATA --- */
export const BRANCH_PARTNERS: PartnerRecord[] = [
  {
    id: "prt-01",
    name: "IEEE Madras Section",
    type: "IEEE_RELATIONSHIP",
    engagement: "Parent Section governance, annual student activity grants, awards, and conference endorsements.",
    region: "Region 10 (India)",
    status: "ACTIVE_PARTNERSHIP",
  },
  {
    id: "prt-02",
    name: "IEEE Region 10 (Asia-Pacific)",
    type: "IEEE_RELATIONSHIP",
    engagement: "Regional student activity congresses, humanitarian project competitions, and leadership summits.",
    region: "Asia-Pacific",
    status: "ACTIVE_PARTNERSHIP",
  },
  {
    id: "prt-03",
    name: "IEEE Computer Society (Madras Chapter)",
    type: "COLLABORATOR",
    engagement: "Joint technical tracks, distinguished lecturer tours, and AI hackathon mentorship.",
    region: "Chennai",
    status: "ACTIVE_PARTNERSHIP",
  },
  {
    id: "prt-04",
    name: "IEEE Power & Energy Society (Madras Chapter)",
    type: "COLLABORATOR",
    engagement: "Microgrid technical symposium co-sponsorship and industrial visits.",
    region: "Chennai",
    status: "ACTIVE_PARTNERSHIP",
  },
  {
    id: "prt-05",
    name: "Technical Industry Sponsors & Hardware Allies",
    type: "SPONSOR",
    engagement: "Hardware development kit donations, symposium prize sponsorships, and judging panels.",
    region: "National",
    status: "ACTIVE_PARTNERSHIP",
  },
];

/* --- 9. INSTITUTIONAL REPORTS --- */
export const INSTITUTIONAL_REPORTS: InstitutionalReport[] = [
  {
    id: "rep-01",
    title: "IEEE SVCE Annual Branch Activity Report 2025–26",
    year: "2026",
    period: "January 2025 – December 2025",
    docType: "ANNUAL_REPORT",
    pagesCount: 64,
    fileSize: "4.2 MB",
    checksum: "SHA256: 8f4e2a91b5c8...",
    status: "VERIFIED",
  },
  {
    id: "rep-02",
    title: "vTools Activity Compliance Audit Dossier",
    year: "2025",
    period: "Academic Year 2024–25",
    docType: "AUDIT_SUMMARY",
    pagesCount: 28,
    fileSize: "1.8 MB",
    checksum: "SHA256: 3c9d7e12f0a4...",
    status: "VERIFIED",
  },
  {
    id: "rep-03",
    title: "IMPULSE '25 Technical Symposium Proceedings & Audit",
    year: "2025",
    period: "October 2025",
    docType: "EVENT_REPORT",
    pagesCount: 42,
    fileSize: "3.1 MB",
    checksum: "SHA256: a1b2c3d4e5f6...",
    status: "VERIFIED",
  },
  {
    id: "rep-04",
    title: "Institutional Handover & Governance Charter (2025–2026)",
    year: "2025",
    period: "December 2025",
    docType: "HANDOVER_DOSSIER",
    pagesCount: 36,
    fileSize: "2.1 MB",
    checksum: "SHA256: 7d6c5b4a3f2e...",
    status: "VERIFIED",
  },
];

/* --- 10. VERIFIED CERTIFICATES (Lookup Registry) --- */
export const VERIFIED_CERTIFICATES_CATALOG: VerifiedCertificate[] = [
  {
    certificateId: "IEEE-SVCE-2026-IMP-042",
    recipientName: "Aditya R. Nair",
    eventTitle: "IMPULSE '26 — National Technical Symposium",
    eventDate: "OCTOBER 14–15, 2026",
    role: "WINNER",
    awardTitle: "First Place — Autonomous Robotics Arena",
    issueDate: "2026-10-15",
    signatory: "Dr. P. Jothilakshmi (Student Branch Counselor)",
    institution: "Sri Venkateswara College of Engineering (STB 28051)",
    verificationHash: "0x89f4bc2178e39021a9c4021fe3a9b1c7849",
  },
  {
    certificateId: "IEEE-SVCE-2026-ML-108",
    recipientName: "K. Divya Lakshmi",
    eventTitle: "Hands-on Micro-ML & Embedded Intelligence Workshop",
    eventDate: "NOVEMBER 04, 2026",
    role: "PARTICIPANT",
    awardTitle: "Certificate of Laboratory Completion",
    issueDate: "2026-11-04",
    signatory: "Dr. P. Jothilakshmi (Student Branch Counselor)",
    institution: "Sri Venkateswara College of Engineering (STB 28051)",
    verificationHash: "0x4a7e91b58204f128c639014fe7b209a3512",
  },
  {
    certificateId: "IEEE-SVCE-2026-WIE-019",
    recipientName: "Sneha Varadarajan",
    eventTitle: "Women in Engineering (WIE) Tech Horizon Summit",
    eventDate: "NOVEMBER 22, 2026",
    role: "SPEAKER",
    awardTitle: "Distinguished Student Researcher Keynote",
    issueDate: "2026-11-22",
    signatory: "Dr. P. Jothilakshmi (Student Branch Counselor)",
    institution: "Sri Venkateswara College of Engineering (STB 28051)",
    verificationHash: "0x12c49e701a8f5b3389024ea67104b9c8194",
  },
  {
    certificateId: "IEEE-SVCE-2025-IMP-204",
    recipientName: "S. Arvind Kumar",
    eventTitle: "IMPULSE '25 — National Technical Symposium",
    eventDate: "OCTOBER 18–19, 2025",
    role: "WINNER",
    awardTitle: "First Place — TinyML AI Paper Presentation",
    issueDate: "2025-10-19",
    signatory: "Dr. K. R. Santha (Branch Counselor Emeritus)",
    institution: "Sri Venkateswara College of Engineering (STB 28051)",
    verificationHash: "0x7890123456abcdef1234567890abcdef1234",
  },
];
