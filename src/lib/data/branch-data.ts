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
  photo?: string;
  position: string;
  tier: "COUNSELOR" | "CORE_OFFICER" | "DOMAIN_HEAD" | "CHAPTER_CHAIR" | "FUNCTIONAL_LEAD";
  team: string; // e.g., "Counselors", "Core Committee", "Technical Wing", "Design & Media", "Editorial & Content", "Outreach & External Affairs", "Treasury Wing", "Photography & Media", "Chapter Leadership"
  session: string; // e.g., "2026–2027"
  department: string;
  year: string;
  linkedinUrl: string;
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
  theme?: string;
  date: string;
  time: string;
  venue: string;
  status: "UPCOMING" | "ACTIVE" | "PAST";
  isFeaturedNow?: boolean;
  abstract: string;
  description: string;
  speakers: EventSpeaker[];
  schedule: EventScheduleItem[];
  organizers: string[];
  tags: string[];
  registrationUrl?: string;
  registrationOpen: boolean;
  winners?: { position: string; team: string; institution: string; project: string }[];
  photos?: { caption: string; credit: string }[];
  reportUrl?: string;
  certificateEventCode?: string;
  provenance: string;
}

export interface AnnouncementItem {
  id: string;
  date: string;
  title: string;
  category: "CONGRESS" | "WORKSHOP" | "CALL_FOR_PAPERS" | "MEMBERSHIP" | "GOVERNANCE";
  summary: string;
  link?: string;
  priority: "HIGH" | "ROUTINE";
  provenance: string;
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  category:
    | "STUDENT"
    | "SB_AWARD"
    | "PROJECT"
    | "HACKATHON"
    | "COMPETITION"
    | "CERTIFICATION"
    | "RECOGNITION";
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
  category:
    | "EVENTS"
    | "WORKSHOPS"
    | "HACKATHONS"
    | "GUEST_LECTURES"
    | "TEAM_ACTIVITIES"
    | "BEHIND_THE_SCENES";
  date: string;
  event: string;
  description: string;
  itemsCount: number;
  mediaType: "PHOTO_SET" | "VIDEO_ARCHIVE";
  photographerCredit: string;
  provenance: string;
}

export interface InnovationProject {
  id: string;
  slug: string;
  title: string;
  domain: string;
  track: string;
  year: string;
  team: string[];
  problem: string;
  solution: string;
  technologies: string[];
  results: string;
  githubUrl?: string;
  demoUrl?: string;
  media?: { type: "SCHEMATIC" | "PROTOTYPE" | "BENCHMARK"; caption: string }[];
  status: "FIELD_TEST" | "ACTIVE_LAB" | "PUBLISHED";
  provenance: string;
}

export interface LearnResource {
  id: string;
  title: string;
  category:
    | "WORKSHOP_SLIDES"
    | "STUDY_RESOURCE"
    | "TECHNICAL_ARTICLE"
    | "PROJECT_DOC"
    | "INTERVIEW_PREP"
    | "ENGINEERING_RESOURCE";
  domain: string;
  format: "PPT" | "PDF" | "CODE_REPO" | "GUIDE";
  curator: string;
  description: string;
  downloadUrl?: string;
  status: "VERIFIED" | "CONTENT PENDING VERIFICATION";
  provenance: string;
}

export interface PartnerRecord {
  id: string;
  name: string;
  type: "IEEE_RELATIONSHIP" | "INDUSTRY" | "COLLABORATOR" | "SPONSOR";
  engagement: string;
  region: string;
  status: "ACTIVE_PARTNERSHIP" | "CONTENT PENDING VERIFICATION";
  provenance: string;
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
  provenance: string;
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

/* ==========================================================
 * DATA CONSTANTS
 * ========================================================== */

export const BRANCH_STATS = {
  establishedYear: "1994",
  branchCode: "STB 28051",
  activeChapters: 4,
  affinityGroups: 1,
  currentSession: "2026–2027",
  verifiedMembers: "180+",
  annualEvents: "35+",
  coordinates: "12.9863° N, 79.9723° E",
  location: "Pennalur, Sriperumbudur, Tamil Nadu 602117",
  officialEmail: "ieee.svce.branch@svce.ac.in",
  parentSection: "IEEE Madras Section (Region 10)",
};

/* --- 1. ANNOUNCEMENTS --- */
export const BRANCH_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-01",
    date: "AUGUST 2026",
    title: "Call for Papers: IMPULSE '26 National Technical Symposium",
    category: "CALL_FOR_PAPERS",
    summary:
      "Submissions open for student research tracks in Autonomous Edge AI, Smart Grid Protection, and Bio-Signal Processing. Authors of accepted papers will receive IEEE certificate credentials.",
    link: "/events/impulse-2026",
    priority: "HIGH",
    provenance: "ANN-2026-IMP-CFP",
  },
  {
    id: "ann-02",
    date: "AUGUST 2026",
    title: "IEEE SVCE Annual Activity Report (2025–26) Published",
    category: "GOVERNANCE",
    summary:
      "The 64-page audited institutional dossier documenting 42 technical sessions, financial audits, and vTools compliance has been archived in the repository.",
    link: "/reports",
    priority: "ROUTINE",
    provenance: "ANN-2026-REP-DIGEST",
  },
  {
    id: "ann-03",
    date: "JULY 2026",
    title: "IEEE Student Membership Drive 2026–27 Now Active",
    category: "MEMBERSHIP",
    summary:
      "New engineering student inductees can access IEEE Xplore digital library privileges, society chapter affiliations, and student travel grant eligibility.",
    link: "/about#benefits",
    priority: "HIGH",
    provenance: "ANN-2026-MEM-DRIVE",
  },
];

/* --- 2. ABOUT DATA --- */
export const ABOUT_BRANCH = {
  aboutIeee:
    "The Institute of Electrical and Electronics Engineers (IEEE) is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. IEEE brings together students, engineers, researchers, educators, and industry professionals from around the world to foster technological innovation, knowledge sharing, collaboration, and professional development. Through its global network of members, societies, conferences, publications, and educational initiatives, IEEE contributes to the advancement of technology and the development of the next generation of technical professionals.",
  aboutBranch:
    "The IEEE Student Branch of Sri Venkateswara College of Engineering (SVCE) is a student-driven technical community that connects the SVCE campus with the global IEEE network. Our Student Branch provides students with opportunities to explore technology beyond the classroom through technical events, workshops, hackathons, competitions, project-based learning, professional development activities, and outreach initiatives. We aim to create an environment where students can learn, innovate, collaborate, and lead. By connecting students with technical communities, industry professionals, researchers, and fellow innovators, IEEE SVCE Student Branch encourages members to develop both their technical expertise and professional skills. Through our activities, we strive to inspire students to become capable engineers, innovative problem-solvers, and responsible future leaders who use technology to create a meaningful impact on society.",
  history:
    "The IEEE Student Branch of Sri Venkateswara College of Engineering was established to connect SVCE students with the global IEEE technical community. Over the years, the branch has grown to become an active institutional nucleus for student leadership, technical events, applied learning, and community outreach.",
  vision:
    "IEEE will be essential to the global technical community and to technical professionals everywhere, and be universally recognized for the contributions of technology and of technical professionals in improving global conditions.",
  mission:
    "IEEE's core purpose is to foster technological innovation and excellence for the benefit of humanity.",
  objectives: [
    {
      number: "01",
      title: "Promote Technical Excellence",
      description:
        "To encourage students to deepen their knowledge of engineering, computing, electronics, and emerging technologies through technical activities and continuous learning.",
    },
    {
      number: "02",
      title: "Encourage Innovation",
      description:
        "To provide students with opportunities to explore ideas, develop innovative solutions, and transform concepts into practical applications.",
    },
    {
      number: "03",
      title: "Foster Research and Learning",
      description:
        "To expose students to current technological developments, research trends, technical publications, conferences, and expert perspectives.",
    },
    {
      number: "04",
      title: "Develop Professional Skills",
      description:
        "To strengthen communication, teamwork, leadership, problem-solving, networking, and other skills essential for professional growth.",
    },
    {
      number: "05",
      title: "Create Industry and Professional Connections",
      description:
        "To connect students with engineers, researchers, academics, industry professionals, and the wider IEEE community.",
    },
    {
      number: "06",
      title: "Encourage Collaboration",
      description:
        "To promote interdisciplinary collaboration and knowledge sharing among students, technical societies, faculty members, and external IEEE communities.",
    },
    {
      number: "07",
      title: "Provide Global Exposure",
      description:
        "To give students opportunities to participate in international competitions, IEEE programs, conferences, scholarships, awards, and other professional activities.",
    },
  ],
  membershipBenefits: [
    {
      title: "Technical Exposure",
      description:
        "Gain practical knowledge beyond the classroom through workshops, technical talks, projects, competitions, conferences, and hands-on activities conducted by IEEE and its Student Branches.",
    },
    {
      title: "IEEE Learning & Knowledge Resources",
      description:
        "Explore IEEE's extensive technical resources, including research publications, journals, magazines, educational content, webinars, tutorials, and other learning resources. Members can access resources according to the benefits included with their membership.",
    },
    {
      title: "Research & Technical Publications",
      description:
        "Discover the latest developments in engineering and technology through IEEE publications, research communities, conferences, and technical societies. IEEE Xplore provides access to a vast collection of technical literature, with the exact access level depending on the student's membership and institutional subscriptions.",
    },
    {
      title: "Professional Networking",
      description:
        "Connect with students, engineers, researchers, academics, and industry professionals through IEEE events, conferences, technical societies, communities, and professional networking opportunities.",
    },
    {
      title: "Career & Professional Development",
      description:
        "Explore opportunities for internships, industry interaction, conferences, mentoring, career development, technical competitions, and professional activities that can help students prepare for their future careers.",
    },
    {
      title: "Leadership & Volunteering",
      description:
        "Build leadership, teamwork, communication, project management, and organizational skills by volunteering in IEEE activities, organizing events, managing teams, and taking up leadership responsibilities.",
    },
    {
      title: "Innovation & Collaboration",
      description:
        "Collaborate with students and professionals from different engineering disciplines, exchange ideas, participate in technical projects, and transform concepts into practical solutions.",
    },
    {
      title: "Global Community",
      description:
        "Become part of a worldwide technical community and connect with IEEE members, student branches, societies, and professional communities beyond your college and country.",
    },
    {
      title: "Conferences & Technical Events",
      description:
        "Gain opportunities to participate in IEEE conferences, workshops, seminars, competitions, and other technical events that provide exposure to emerging technologies and industry trends.",
    },
    {
      title: "Technical Societies & Communities",
      description:
        "Join IEEE Technical Societies and Communities aligned with your interests, such as power and energy, electronics, communications, robotics, computing, aerospace, and many other fields.",
    },
    {
      title: "Awards, Scholarships & Recognition",
      description:
        "Explore IEEE-sponsored awards, scholarships, fellowships, student competitions, and recognition programs available through IEEE and its various societies and communities. Eligibility and availability vary by program.",
    },
    {
      title: "Standards & Industry Knowledge",
      description:
        "Gain exposure to internationally recognized IEEE standards and the technologies and practices that shape modern engineering and industry.",
    },
    {
      title: "A Platform to Lead and Make an Impact",
      description:
        "IEEE provides students with a platform to learn, contribute, lead, and create. Through technical activities, volunteering, research, and collaboration, members can develop the skills and experience needed to become future engineers and technology leaders.",
    },
  ],
  milestones: [
    {
      year: "1994",
      title: "Charter Establishment",
      description:
        "IEEE Student Branch established at Sri Venkateswara College of Engineering under IEEE Region 10 and Madras Section.",
    },
    {
      year: "2026",
      title: "Current Session",
      description:
        "Active student branch continuing the tradition of technical excellence, events, and community engagement.",
    },
  ],
};

/* --- 3. TEAM DATA --- */
export const TEAM_MEMBERS: TeamMember[] = [
  // Core Executive Committee — supplied roster
  {
    id: "tm-chair",
    name: "TR Hemachander",
    position: "Chair",
    tier: "CORE_OFFICER",
    team: "Core Executive Committee",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "IV Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-secretary-01",
    name: "Sai Rakshesha S",
    photo: "/team/SAI%20RAKSHEEDHA%20S.JPG",
    position: "Secretary",
    tier: "CORE_OFFICER",
    team: "Core Executive Committee",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "IV Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-secretary-02",
    name: "Janelle Rebecca J",
    photo: "/team/Janelle_Rebecca.jpg",
    position: "Secretary",
    tier: "CORE_OFFICER",
    team: "Core Executive Committee",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "IV Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-vice-chair",
    name: "A Aadhithya Narayanan",
    position: "Vice Chair",
    tier: "CORE_OFFICER",
    team: "Core Executive Committee",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "III Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-joint-secretary-01",
    name: "Vikhashini S",
    photo: "/team/vikhashini.jpg",
    position: "Joint Secretary",
    tier: "CORE_OFFICER",
    team: "Core Executive Committee",
    session: "2026–2027",
    department: "Department of Computer Science and Engineering",
    year: "III Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-joint-secretary-02",
    name: "Dimple Kurugunda",
    position: "Joint Secretary",
    tier: "CORE_OFFICER",
    team: "Core Executive Committee",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "III Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Treasury
  {
    id: "tm-treasurer",
    name: "Harish BN",
    position: "Treasurer",
    tier: "CORE_OFFICER",
    team: "Treasury",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "IV Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-joint-treasurer",
    name: "Bharath Kalyan B",
    position: "Joint Treasurer",
    tier: "CORE_OFFICER",
    team: "Treasury",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "III Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-treasury-exec",
    name: "Sai Tharun B",
    photo: "/team/Sai%20Tharun.png",
    position: "Treasury Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Treasury",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Event Head
  {
    id: "tm-event-head",
    name: "Lakshan Vidhyuth LB",
    photo: "/team/Lakshan_Vidhyuth_LB.png",
    position: "Event Head",
    tier: "DOMAIN_HEAD",
    team: "Core Executive Committee",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "IV Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Technical Team
  {
    id: "tm-tech-head",
    name: "Akshitha K",
    photo: "/team/Akshitha_.jpg",
    position: "Technical Team Head",
    tier: "DOMAIN_HEAD",
    team: "Technical Team",
    session: "2026–2027",
    department: "Department of Computer Science and Engineering",
    year: "III Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-tech-exec-01",
    name: "Yaathra P",
    photo: "/team/YAATHRA%20TECHNICAL%20EXECUTIVE.png",
    position: "Technical Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Technical Team",
    session: "2026–2027",
    department: "Department of Computer Science and Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-tech-exec-02",
    name: "Sethu Madhavan Srinivasan",
    photo: "/team/sethu%20madhavan%20srinivasan.png",
    position: "Technical Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Technical Team",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Design Team
  {
    id: "tm-design-head",
    name: "GVL Apoorva",
    photo: "/team/GVL_Apoorva.JPG",
    position: "Design Team Head",
    tier: "DOMAIN_HEAD",
    team: "Design Team",
    session: "2026–2027",
    department: "Department of Computer Science and Engineering",
    year: "III Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-design-exec-01",
    name: "Keerthana Janakiraman",
    photo: "/team/Keerthana%20Janakiraman.jpg",
    position: "Design Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Design Team",
    session: "2026–2027",
    department: "Department of Artificial Intelligence and Data Science",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-design-exec-02",
    name: "Jwala Shiny E",
    photo: "/team/Jwala%20Shiny%20E_.jpg",
    position: "Design Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Design Team",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Content Team
  {
    id: "tm-content-head",
    name: "S Niharika",
    photo: "/team/Niharika%20S.jpg",
    position: "Content Team Head",
    tier: "DOMAIN_HEAD",
    team: "Content Team",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-content-exec-01",
    name: "M.Titiksha",
    photo: "/team/Titiksha.jpg",
    position: "Content Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Content Team",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-content-exec-02",
    name: "Krishna B",
    photo: "/team/Krishna%20B.jpg",
    position: "Content Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Content Team",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Social Media
  {
    id: "tm-social-media",
    name: "Harine S",
    photo: "/team/Harine%20S.jpg",
    position: "Social Media Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Social Media",
    session: "2026–2027",
    department: "Department of Electrical and Electronics Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Outreach
  {
    id: "tm-outreach-exec-01",
    name: "Harshitha R",
    position: "Outreach Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Outreach",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-outreach-exec-02",
    name: "Sathya Shree TR",
    position: "Outreach Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Outreach",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Photography
  {
    id: "tm-photo-lead",
    name: "E Dhranavivel",
    photo: "/team/E%20Dharanivel.jpg",
    position: "Photography Lead",
    tier: "DOMAIN_HEAD",
    team: "Photography",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-photo-exec",
    name: "Prabhanjan V A",
    photo: "/team/Prabhanjan.JPG",
    position: "Photography Executive",
    tier: "FUNCTIONAL_LEAD",
    team: "Photography",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Executive Members
  {
    id: "tm-exec-member-01",
    name: "Arulmozhi K",
    photo: "/team/Arulmozhi%20K.jpg",
    position: "Executive Member",
    tier: "FUNCTIONAL_LEAD",
    team: "Executive Members",
    session: "2026–2027",
    department: "Department of Computer Science and Engineering",
    year: "III Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  {
    id: "tm-exec-member-02",
    name: "Rogini D",
    photo: "/team/Rogini%20D.jpg",
    position: "Executive Member",
    tier: "FUNCTIONAL_LEAD",
    team: "Executive Members",
    session: "2026–2027",
    department: "Department of Electronics and Communication Engineering",
    year: "II Year",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "VERIFIED",
  },
  // Faculty counselors — CONTENT PENDING VERIFICATION
  {
    id: "tm-counselor-01",
    name: "CONTENT PENDING VERIFICATION",
    position: "Student Branch Counselor",
    tier: "COUNSELOR",
    team: "Faculty Counselors",
    session: "2026–2027",
    department: "CONTENT PENDING VERIFICATION",
    year: "Faculty",
    linkedinUrl: "https://www.linkedin.com/school/svcechennai/",
    status: "CONTENT PENDING VERIFICATION",
  },
  // Chapter chairs — CONTENT PENDING VERIFICATION
  {
    id: "tm-chair-cs",
    name: "CONTENT PENDING VERIFICATION",
    position: "CS Chapter Chair",
    tier: "CHAPTER_CHAIR",
    team: "Chapter Leadership",
    session: "2026–2027",
    department: "CONTENT PENDING VERIFICATION",
    year: "CONTENT PENDING VERIFICATION",
    linkedinUrl: "https://www.linkedin.com/company/ieee-svce/",
    status: "CONTENT PENDING VERIFICATION",
  },
];

/* --- 4. EVENTS DATA --- */
export const FEATURED_NOW_EVENT: EventRecord = {
  id: "evt-01",
  slug: "doomsday-tech-edition",
  title: "Doomsday: Tech Edition",
  subtitle: "Immersive Technical Challenge & Rapid Problem Solving",
  track: "Flagship Technical Challenge",
  theme: "Adaptive Engineering & High-Pressure Innovation",
  date: "UPCOMING // CONTENT PENDING VERIFICATION",
  time: "SCHEDULE PENDING VERIFICATION",
  venue: "SVCE Campus // CONTENT PENDING VERIFICATION",
  status: "UPCOMING",
  isFeaturedNow: true,
  abstract:
    "An immersive technical challenge designed to test how well participants can think, adapt, and innovate when faced with unexpected problems. With technology at the center of every challenge, participants will be pushed beyond conventional problem-solving and forced to make quick decisions, develop creative solutions, and work effectively as a team.",
  description:
    "Doomsday: Tech Edition is an immersive technical challenge designed to test how well participants can think, adapt, and innovate when faced with unexpected problems. With technology at the center of every challenge, participants will be pushed beyond conventional problem-solving and forced to make quick decisions, develop creative solutions, and work effectively as a team. From technical puzzles and real-world scenarios to challenges that demand logic, engineering skills, and out-of-the-box thinking, every round brings a new obstacle to overcome. The pressure builds as participants race against time, where one wrong move could change everything.",
  speakers: [],
  schedule: [],
  organizers: ["IEEE SVCE Executive Committee"],
  tags: ["Flagship", "Technical Challenge", "Logic", "Engineering", "Teamwork"],
  registrationOpen: true,
  registrationUrl: "/contact?subject=Doomsday Tech Edition Registration",
  certificateEventCode: "IEEE-SVCE-DOOMSDAY",
  provenance: "STB28051-EVT-DOOMSDAY-VERIFIED",
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
    id: "evt-quizverse",
    slug: "ieee-quizverse",
    title: "IEEE QuizVerse",
    subtitle: "Online Technical Quiz Across Engineering, Science & Tech",
    track: "Online Technical Quiz",
    theme: "Engineering, Science & General Technical Knowledge",
    date: "UPCOMING // CONTENT PENDING VERIFICATION",
    time: "ONLINE // SCHEDULE PENDING VERIFICATION",
    venue: "Online Platform // Virtual",
    status: "UPCOMING",
    abstract:
      "An online technical quiz designed to challenge participants across a wide range of concepts, from technology and engineering to innovation, science, and general technical knowledge. Put your knowledge to the test and climb higher on the leaderboard.",
    description:
      "IEEE QuizVerse is an online technical quiz designed to challenge participants across a wide range of concepts, from technology and engineering to innovation, science, and general technical knowledge. With questions that test more than just memory, participants will need to think critically, connect concepts, and make quick decisions to stay ahead. Compete from wherever you are, put your knowledge to the test, and take on questions that range from fundamental concepts to unexpected twists. Every question is an opportunity to learn something new, prove your expertise, and climb higher on the leaderboard.",
    speakers: [],
    schedule: [],
    organizers: ["IEEE SVCE Executive Committee"],
    tags: ["Quiz", "Online", "Engineering", "Science", "Innovation"],
    registrationOpen: true,
    registrationUrl: "/contact?subject=IEEE QuizVerse Registration",
    certificateEventCode: "IEEE-SVCE-QUIZVERSE",
    provenance: "STB28051-EVT-QUIZVERSE-VERIFIED",
  },
  {
    id: "evt-decode-deploy",
    slug: "decode-and-deploy-2",
    title: "Decode and Deploy 2.0",
    subtitle: "Dual Software & Hardware Domain Challenge with Scenario Enactment",
    track: "Software & Hardware Challenge",
    theme: "Linux, CSS & Domain Hardware Problem-Solving",
    date: "UPCOMING // CONTENT PENDING VERIFICATION",
    time: "SCHEDULE PENDING VERIFICATION",
    venue: "SVCE Campus // CONTENT PENDING VERIFICATION",
    status: "UPCOMING",
    abstract:
      "A technical challenge that tests participants across both software and hardware domains, combining Linux/CSS challenges, domain-specific hardware question papers, and interactive scenario wheel problem enactment.",
    description:
      "Decode and Deploy 2.0 is a technical challenge that tests participants across both software and hardware domains. The first round puts software participants through Linux or CSS-based challenges, while hardware participants tackle a domain-specific technical question paper. The second round takes a creative turn, where participants spin a scenario wheel, receive a random real-world situation, and must solve it by acting out their solution as a scene.",
    speakers: [],
    schedule: [],
    organizers: ["IEEE SVCE Technical & Executive Team"],
    tags: ["Software", "Hardware", "Linux", "CSS", "Scenario Challenge"],
    registrationOpen: true,
    registrationUrl: "/contact?subject=Decode and Deploy 2.0 Registration",
    certificateEventCode: "IEEE-SVCE-DECODE-DEPLOY",
    provenance: "STB28051-EVT-DECODE-DEPLOY-VERIFIED",
  },
  {
    id: "evt-impulse-2026",
    slug: "impulse-2026",
    title: "IMPULSE '26 — National Technical Symposium",
    subtitle: "Flagship Inter-Collegiate Engineering Congress & 24H Hackathon",
    track: "Multi-Society Convergence",
    theme: "Autonomous Cyber-Physical Systems & Resilient Energy",
    date: "OCTOBER 14–15, 2026",
    time: "09:00 IST – 17:30 IST",
    venue: "SVCE Central Auditorium & Engineering Research Labs",
    status: "UPCOMING",
    abstract:
      "The 28th edition of IEEE SVCE's flagship national symposium brings together 40+ engineering colleges across India. Tracks include Autonomous Edge AI, TinyML embedded inference, Smart Grid Protection, and the 24-Hour Hardware Hackathon.",
    description:
      "IMPULSE '26 represents the apex technical gathering of the IEEE SVCE calendar. Featuring peer-reviewed paper presentations across IEEE Computer Society and Power & Energy Society domains, a competitive 24-hour hardware hackathon, robotics maze solvers, and distinguished keynote lectures by IEEE Fellows.",
    speakers: [
      {
        name: "Dr. S. Ramaswamy",
        designation: "Fellow, IEEE",
        organization: "IEEE Madras Section",
      },
      {
        name: "Priya Natarajan",
        designation: "Principal AI Architect",
        organization: "Robotics Research Labs",
      },
    ],
    schedule: [
      {
        time: "09:00 - 10:00",
        session: "Inaugural Ceremony & Presidential Address",
        venue: "Central Auditorium",
      },
      {
        time: "10:15 - 11:30",
        session: "Keynote: Edge Intelligence in Cyber-Physical Grids",
        speaker: "Dr. S. Ramaswamy",
        venue: "Central Auditorium",
      },
      {
        time: "11:45 - 16:30",
        session: "Parallel Tracks: AI Paper Presentations & Hardware Arena",
        venue: "ECE & CSE Labs",
      },
      {
        time: "16:45 - 17:30",
        session: "Valedictory Ceremony & Award Conferment",
        venue: "Central Auditorium",
      },
    ],
    organizers: ["IEEE SVCE Executive Committee", "Computer Society Chapter", "PES Chapter"],
    tags: ["Flagship", "Symposium", "Hackathon", "Robotics", "Clean Energy", "Paper Track"],
    registrationOpen: true,
    registrationUrl: "/contact?subject=IMPULSE 2026 Registration Inquiry",
    photos: [
      { caption: "IMPULSE Main Arena Keynote Hall", credit: "IEEE Media Wing" },
      { caption: "Hardware Hackathon Workbenches", credit: "IEEE Media Wing" },
    ],
    certificateEventCode: "IEEE-SVCE-2026-IMP",
    provenance: "STB28051-EVT-2026-01-VERIFIED",
  },
  {
    id: "evt-02",
    slug: "edge-ai-workshop",
    title: "Hands-on Micro-ML & Embedded Intelligence Workshop",
    subtitle: "Hardware-accelerated neural networks on ARM Cortex-M microcontrollers",
    track: "Computer Society (CS) Chapter",
    theme: "Applied Edge Intelligence",
    date: "NOVEMBER 04, 2026",
    time: "10:00 IST – 16:00 IST",
    venue: "ECE Embedded Systems Research Lab",
    status: "UPCOMING",
    abstract:
      "A rigorous laboratory workshop covering model quantization, CMSIS-NN kernels, and deployment of real-time gesture & vibration anomaly models on ARM microcontrollers.",
    description:
      "Participants will develop, flash, and benchmark custom TensorFlow Lite Micro models directly onto STM32 32-bit microcontrollers, capturing live IMU sensor data.",
    speakers: [
      {
        name: "K. Vignesh",
        designation: "Embedded Systems Architect",
        organization: "Silicon Embedded Tech",
      },
    ],
    schedule: [
      {
        time: "10:00 - 11:30",
        session: "TinyML Foundations & Quantization Techniques",
        venue: "Embedded Lab",
      },
      {
        time: "11:45 - 13:00",
        session: "Lab: Flashing CMSIS-NN Kernels to STM32 Boards",
        venue: "Embedded Lab",
      },
      {
        time: "14:00 - 16:00",
        session: "Real-time Accelerometer Anomaly Detection Demo",
        venue: "Embedded Lab",
      },
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
    theme: "Diversity & Excellence in Deep Tech",
    date: "NOVEMBER 22, 2026",
    time: "14:00 IST – 18:00 IST",
    venue: "SVCE Video Conference Hall",
    status: "UPCOMING",
    abstract:
      "Panel sessions and research showcases led by distinguished women researchers in quantum computing, power electronics, and biomedical engineering.",
    description:
      "The annual WIE Horizon Summit gathers senior IEEE women researchers and student engineers to discuss breakthroughs in deep tech, patent publication, and graduate research fellowships.",
    speakers: [
      {
        name: "Dr. Meenakshi Sundaram",
        designation: "Professor",
        organization: "Department of ECE",
      },
      {
        name: "Ananya Deshmukh",
        designation: "Quantum Research Fellow",
        organization: "Centre for Quantum Tech",
      },
    ],
    schedule: [
      {
        time: "14:00 - 15:30",
        session: "Panel: Breaking Frontiers in Deep-Tech Research",
        venue: "Conference Hall",
      },
      {
        time: "15:45 - 17:30",
        session: "Research Showcase & Mentorship Breakouts",
        venue: "Conference Hall",
      },
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
    theme: "Grid Modernization & Decentralized Storage",
    date: "DECEMBER 08, 2026",
    time: "09:30 IST – 15:30 IST",
    venue: "EEE Department Seminar Complex",
    status: "UPCOMING",
    abstract:
      "Technical deep-dive on grid synchronization algorithms, IEEE 1547 standards compliance, and real-world microgrid telemetry implementations.",
    description:
      "Co-organized with IEEE PES Madras Chapter, this colloquium explores decentralized grid synchronization, phase-locked loop (PLL) architectures, and battery energy storage controls.",
    speakers: [
      {
        name: "Prof. G. Chandrasekhar",
        designation: "Distinguished Lecturer",
        organization: "IEEE PES Madras Chapter",
      },
    ],
    schedule: [
      {
        time: "09:30 - 11:30",
        session: "IEEE 1547 Standards & Inverter Synchronization",
        venue: "Seminar Complex",
      },
      {
        time: "12:00 - 15:30",
        session: "Case Studies in Islanded Microgrid Protection",
        venue: "Seminar Complex",
      },
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
    theme: "Applied Robotics & Sustainable Power",
    date: "OCTOBER 18–19, 2025",
    time: "Concluded",
    venue: "SVCE Campus",
    status: "PAST",
    abstract:
      "Over 600 student participants from 48 colleges competed across 12 technical events, paper tracks, and autonomous robotics arenas.",
    description:
      "The 27th edition was concluded with award conferrals in the autonomous robotics arena and TinyML paper presentations. Full proceedings archived in the institutional dossier.",
    speakers: [
      {
        name: "Dr. K. Elangovan",
        designation: "Section Chair",
        organization: "IEEE Madras Section",
      },
    ],
    schedule: [],
    organizers: ["IEEE SVCE ExeCom 2024/25"],
    tags: ["Symposium", "Robotics", "Hackathon"],
    registrationOpen: false,
    winners: [
      {
        position: "1st Place (Robotics Arena)",
        team: "Team CyberRover",
        institution: "College of Engineering Guindy",
        project: "Autonomous LiDAR Maze Solver",
      },
      {
        position: "1st Place (Paper Track - AI)",
        team: "NeuralGrid Research",
        institution: "SVCE",
        project: "TinyML Substation Telemetry",
      },
    ],
    reportUrl: "/reports#rep-01",
    certificateEventCode: "IEEE-SVCE-2025-IMP",
    provenance: "STB28051-EVT-2025-01",
  },
];

/* --- 5. COMMUNITY & ACHIEVEMENTS DATA --- */
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
  {
    id: "ach-05",
    year: "2024",
    title: "National Clean Energy Innovation Contest — 2nd Prize",
    category: "COMPETITION",
    awardedBy: "Consortium of Renewable Energy Engineers",
    summary:
      "Prototype Substation Monitoring Mesh recognized for energy autonomy and low-cost embedded inference.",
    citation: "National Energy Tech Expo 2024.",
    provenance: "AWD-CREE-2024-02",
  },
];

export const HALL_OF_FAME: HallOfFameMember[] = [
  {
    name: "Dr. K. R. Santha",
    tenure: "1994–Present",
    role: "Founding Branch Counselor",
    currentAffiliation: "Professor & Senior Member IEEE, SVCE",
    citation:
      "Guiding three decades of student engineers and establishing the institutional charter in 1994.",
  },
  {
    name: "Alumni ExeCom Leaders (1994–2025)",
    tenure: "Three Decades of Stewardship",
    role: "Past Branch Chairs & Chapter Officers",
    currentAffiliation: "Distinguished Alumni in Global Tech, R&D, and Academia",
    citation:
      "Building the permanent repository of technical events and preserving committee handover continuity.",
  },
];

export const INDUSTRY_CONNECT: IndustryConnectItem[] = [
  {
    partner: "Schneider Electric & Microgrid Systems",
    type: "TECHNICAL_WEBINAR",
    title: "Industrial Microgrid Integration and IEEE 1547 Compliance",
    year: "2025",
    description:
      "Industry architects presented smart inverter telemetry and grid synchronization standards to 140+ students.",
  },
  {
    partner: "Texas Instruments University Program",
    type: "INDUSTRIAL_VISIT",
    title: "Embedded Processing and MSPM0 Microcontroller Hands-on Series",
    year: "2025",
    description:
      "Donation of hardware evaluation kits and joint workshop series on low-power ARM architectures.",
  },
  {
    partner: "IEEE Madras Section Industry Relations Committee",
    type: "MENTORSHIP",
    title: "Student-to-Professional Career Transition Mentorship",
    year: "2026",
    description:
      "Senior IEEE Industry Fellows mentoring final-year students on technical research paper publication and patents.",
  },
];

/* --- 6. MEDIA COLLECTIONS --- */
export const MEDIA_COLLECTIONS: MediaCollection[] = [
  {
    id: "med-01",
    title: "IMPULSE '25 National Robotics Arena & Grand Finale",
    category: "EVENTS",
    date: "OCTOBER 2025",
    event: "IMPULSE '25",
    description:
      "48 collegiate teams testing autonomous line-follower and maze-solving rovers on the custom precision arena.",
    itemsCount: 24,
    mediaType: "PHOTO_SET",
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-01",
  },
  {
    id: "med-02",
    title: "Hands-on Micro-ML Embedded Hardware Lab Series",
    category: "WORKSHOPS",
    date: "SEPTEMBER 2025",
    event: "TechSpring Lab",
    description:
      "Students flashing compiled neural network weights onto STM32 evaluation boards in the Embedded Systems Laboratory.",
    itemsCount: 16,
    mediaType: "PHOTO_SET",
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-04",
  },
  {
    id: "med-03",
    title: "24-Hour IoT & Smart Cities Hardware Hackathon",
    category: "HACKATHONS",
    date: "JULY 2025",
    event: "HackSVCE Hardware Edition",
    description:
      "Continuous 24-hour sprint prototyping LoRa mesh sensors and emergency telemetry nodes.",
    itemsCount: 32,
    mediaType: "PHOTO_SET",
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-06",
  },
  {
    id: "med-04",
    title: "Distinguished Guest Lecture Series on Quantum Sensors",
    category: "GUEST_LECTURES",
    date: "MARCH 2025",
    event: "Distinguished Colloquium",
    description:
      "Invited lecture on nitrogen-vacancy diamond magnetometers delivered to faculty and IEEE student researchers.",
    itemsCount: 14,
    mediaType: "PHOTO_SET",
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-07",
  },
  {
    id: "med-05",
    title: "Executive Committee Handover & Pinning Ceremony",
    category: "TEAM_ACTIVITIES",
    date: "DECEMBER 2025",
    event: "Annual General Body Meeting",
    description:
      "The formal transfer of institutional seal and vTools administrative stewardship to incoming officers.",
    itemsCount: 12,
    mediaType: "PHOTO_SET",
    photographerCredit: "IEEE SVCE Media Wing",
    provenance: "MED-ARC-2025-08",
  },
  {
    id: "med-06",
    title: "Behind-the-Scenes: Arena Circuit Routing & Soldering",
    category: "BEHIND_THE_SCENES",
    date: "OCTOBER 2025",
    event: "Symposium Prep",
    description:
      "Student technical heads fabricating arena timing gates, optical tripwires, and power distribution boards.",
    itemsCount: 18,
    mediaType: "PHOTO_SET",
    photographerCredit: "IEEE SVCE Technical Team",
    provenance: "MED-ARC-2025-09",
  },
];

/* --- 7. INNOVATION PROJECTS --- */
export const BRANCH_PROJECTS: InnovationProject[] = [
  {
    id: "prj-01",
    slug: "edge-vision-grid",
    title: "Autonomous Edge-Vision Substation Monitor",
    domain: "Embedded AI & Smart Grid",
    track: "TinyML / Power Systems",
    year: "2025–2026",
    team: ["Embedded Intelligence Working Group", "Dept of EEE & CSE"],
    problem:
      "High-voltage electrical substations experience catastrophic insulator flashovers and thermal runaways that traditional static sensors fail to localize in real-time.",
    solution:
      "A solar-harvesting edge device combining thermal computer vision inference (TensorFlow Lite Micro on STM32H7) and acoustic vibration analysis with long-range LoRaWAN telemetry.",
    technologies: ["C++", "TensorFlow Lite Micro", "STM32H7", "LoRaWAN", "ChirpStack", "KiCad"],
    results:
      "Achieved 96.4% fault localization accuracy in pilot bench tests with < 85mW average active power consumption.",
    githubUrl: "https://github.com/ieee-svce",
    demoUrl: "/innovation#edge-vision-grid",
    media: [
      {
        type: "PROTOTYPE",
        caption: "Custom 4-layer STM32H7 evaluation board with thermal camera module",
      },
      {
        type: "BENCHMARK",
        caption: "Power draw vs inference latency profile under continuous telemetry",
      },
    ],
    status: "FIELD_TEST",
    provenance: "STB28051-PRJ-2025-08",
  },
  {
    id: "prj-02",
    slug: "sub-ghz-mesh",
    title: "Sub-GHz Decentralized Mesh Node for Disaster Telemetry",
    domain: "Ad-Hoc Wireless Communications",
    track: "Communications / Sensor Networks",
    year: "2025",
    team: ["ComSoc Student Special Interest Group"],
    problem:
      "During severe cyclone events in coastal Tamil Nadu, cellular cell towers collapse, severing communication for first responders and campus safety teams.",
    solution:
      "Self-healing mesh radio nodes operating on 868 MHz ISM bands, establishing an ad-hoc packet-forwarding backbone over 15km line-of-sight without external network infrastructure.",
    technologies: ["ESP32-S3", "SX1262 LoRa", "Meshtastic Protocol", "Solar Harvester", "C++"],
    results:
      "Validated 14.2 km packet relay between SVCE campus and Sriperumbudur emergency coordination center.",
    githubUrl: "https://github.com/ieee-svce",
    demoUrl: "/innovation#sub-ghz-mesh",
    media: [
      {
        type: "PROTOTYPE",
        caption: "Weatherproof IP67 solar node enclosure with 868MHz omni antenna",
      },
    ],
    status: "ACTIVE_LAB",
    provenance: "STB28051-PRJ-2025-04",
  },
  {
    id: "prj-03",
    slug: "eeg-signal-shield",
    title: "Open-Source 4-Channel EEG Biosignal Front-End Shield",
    domain: "Biomedical Signal Processing",
    track: "Biomedical Engineering",
    year: "2024",
    team: ["EMBS Affinity Cluster"],
    problem:
      "Commercial brainwave monitoring equipment is prohibitively expensive for undergraduate research labs exploring brain-computer interfaces.",
    solution:
      "An ultra-low-noise 4-channel analog front-end shield utilizing Texas Instruments ADS1299 with galvanic isolation, 50Hz notch filters, and active dry electrode support.",
    technologies: ["KiCad", "ADS1299", "Active Electrodes", "Python Brainflow", "STM32"],
    results:
      "Successfully captured Alpha and Beta wave rhythms with SNR > 82dB verified against laboratory oscilloscopes.",
    githubUrl: "https://github.com/ieee-svce",
    demoUrl: "/innovation#eeg-signal-shield",
    media: [
      {
        type: "SCHEMATIC",
        caption: "Differential front-end analog filtering with driven-right-leg (DRL) circuit",
      },
    ],
    status: "PUBLISHED",
    provenance: "STB28051-PRJ-2024-02",
  },
];

/* --- 8. LEARN RESOURCES --- */
export const LEARN_RESOURCES: LearnResource[] = [
  {
    id: "lrn-01",
    title: "FreeRTOS & Embedded Firmware Architecture Courseware",
    category: "WORKSHOP_SLIDES",
    domain: "Embedded Hardware",
    format: "PPT",
    curator: "Technical Affairs Wing",
    description:
      "Slide deck covering task priority inversion, mutexes, semaphores, and DMA memory transfers on ARM Cortex-M microcontrollers.",
    status: "VERIFIED",
    provenance: "LRN-2026-PPT-01",
  },
  {
    id: "lrn-02",
    title: "Applied Machine Learning for Sensor Time-Series Data",
    category: "STUDY_RESOURCE",
    domain: "Artificial Intelligence",
    format: "GUIDE",
    curator: "IEEE Computer Society Chapter",
    description:
      "Jupyter notebooks and guide on FFT feature extraction, data windowing, and int8 neural network quantization.",
    status: "VERIFIED",
    provenance: "LRN-2026-GDE-02",
  },
  {
    id: "lrn-03",
    title: "IEEE Conference Paper Writing & LaTeX Publishing Pipeline",
    category: "TECHNICAL_ARTICLE",
    domain: "Research & Writing",
    format: "PDF",
    curator: "Branch Editorial Board",
    description:
      "Comprehensive template and guide on experimental rigor, bibliography management, and IEEE conference formatting.",
    status: "VERIFIED",
    provenance: "LRN-2025-ART-03",
  },
  {
    id: "lrn-04",
    title: "Core Electronics & Hardware Engineering Interview Toolkit",
    category: "INTERVIEW_PREP",
    domain: "Career Preparation",
    format: "GUIDE",
    curator: "IEEE SVCE Alumni Mentors",
    description:
      "Curated problem sets on digital logic, Verilog HDL synthesis, PCB routing rules, and semiconductor device physics.",
    status: "VERIFIED",
    provenance: "LRN-2026-INT-04",
  },
  {
    id: "lrn-05",
    title: "Substation Automation & IEEE 1547 Standards Digest",
    category: "ENGINEERING_RESOURCE",
    domain: "Power & Energy",
    format: "PDF",
    curator: "IEEE PES Chapter",
    description:
      "Technical reference summary of grid interconnect standards, islanding detection methods, and inverter power factor curves.",
    status: "VERIFIED",
    provenance: "LRN-2025-ENG-05",
  },
];

/* --- 9. PARTNERS DATA --- */
export const BRANCH_PARTNERS: PartnerRecord[] = [
  {
    id: "prt-01",
    name: "IEEE Madras Section",
    type: "IEEE_RELATIONSHIP",
    engagement:
      "Parent Section governance, annual student activity grants, awards, and conference endorsements.",
    region: "Region 10 (India)",
    status: "ACTIVE_PARTNERSHIP",
    provenance: "PRT-MAS-SEC-01",
  },
  {
    id: "prt-02",
    name: "IEEE Region 10 (Asia-Pacific)",
    type: "IEEE_RELATIONSHIP",
    engagement:
      "Regional student activity congresses, humanitarian project competitions, and leadership summits.",
    region: "Asia-Pacific",
    status: "ACTIVE_PARTNERSHIP",
    provenance: "PRT-R10-ORG-02",
  },
  {
    id: "prt-03",
    name: "IEEE Computer Society (Madras Chapter)",
    type: "COLLABORATOR",
    engagement:
      "Joint technical tracks, distinguished lecturer tours, and AI hackathon mentorship.",
    region: "Chennai",
    status: "ACTIVE_PARTNERSHIP",
    provenance: "PRT-CS-MAS-03",
  },
  {
    id: "prt-04",
    name: "IEEE Power & Energy Society (Madras Chapter)",
    type: "COLLABORATOR",
    engagement: "Microgrid technical symposium co-sponsorship and industrial visits.",
    region: "Chennai",
    status: "ACTIVE_PARTNERSHIP",
    provenance: "PRT-PES-MAS-04",
  },
  {
    id: "prt-05",
    name: "Technical Industry Sponsors & Hardware Allies",
    type: "SPONSOR",
    engagement:
      "Hardware development kit donations, symposium prize sponsorships, and judging panels.",
    region: "National",
    status: "ACTIVE_PARTNERSHIP",
    provenance: "PRT-IND-SPN-05",
  },
];

/* --- 10. INSTITUTIONAL REPORTS --- */
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
    provenance: "REP-2026-ANN-01",
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
    provenance: "REP-2025-VTL-02",
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
    provenance: "REP-2025-EVT-03",
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
    provenance: "REP-2025-HND-04",
  },
];

/* --- 11. VERIFIED CERTIFICATES (Lookup Registry) --- */
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

/* --- 12. ARCHIVE RECORDS --- */
export const ARCHIVE_RECORDS: ArchiveRecord[] = [
  {
    id: "arc-01",
    year: "1994",
    category: "FOUNDING CHARTER",
    title: "Official IEEE Section Charter of Student Branch STB 28051",
    summary:
      "The formal foundation charter signed by IEEE Region 10 and Madras Section establishing the SVCE Student Branch.",
    provenance: "ARC-1994-CHARTER-001",
  },
  {
    id: "arc-02",
    year: "1998",
    category: "SYMPOSIUM PROCEEDINGS",
    title: "IMPULSE '98 Inaugural Conference Proceedings",
    summary:
      "First edition of the annual national technical symposium proceedings cataloging student paper submissions.",
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
