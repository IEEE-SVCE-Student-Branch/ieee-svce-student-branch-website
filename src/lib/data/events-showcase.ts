/**
 * IEEE SVCE — Events Showcase Data Model
 *
 * Dedicated data source for the public Events page (upcoming + past events,
 * featured event, and the past-event archive detail view).
 *
 * This is intentionally separate from `branch-data.ts` (which powers the
 * homepage "Now" / "Happening" widgets) so that redesigning the Events page
 * never touches unrelated sections of the site.
 *
 * Replace the dummy values below with verified event information. Every
 * field is documented so content can be swapped in safely.
 */

export type EventCategory = "Technical" | "Workshop" | "Competition" | "Seminar" | "Hackathon";

export interface EventScheduleItem {
  time: string;
  session: string;
  activity: string;
}

export interface EventPerson {
  name: string;
  designation: string;
  organization: string;
  /** Optional headshot path, e.g. "/events/speakers/jane-doe.jpg" */
  photo?: string;
}

export interface EventWinner {
  position: "First Prize" | "Runner-Up" | "Third Prize";
  name: string;
  institution?: string;
  /** Optional winner/team photo path */
  photo?: string;
}

export interface EventGalleryImage {
  /** Optional image path, e.g. "/events/gallery/symposium-01.jpg" */
  src?: string;
  caption: string;
}

export interface EventReport {
  available: boolean;
  /** Replace with the real report/PDF URL when available */
  url?: string;
}

export interface EventCertificates {
  available: boolean;
  /** Replace with the real certificate portal/URL when available */
  url?: string;
}

export interface EventShowcaseRecord {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  status: "UPCOMING" | "PAST";
  /** Marks the single nearest upcoming event to be shown in the featured slot */
  featured?: boolean;
  year: string;
  date: string;
  time?: string;
  venue: string;
  /** One or two line summary used on cards */
  shortDescription: string;
  /** Longer description used on expanded cards / detail pages */
  description: string;
  theme?: string;
  objective?: string;
  image?: string;
  registrationLink?: string;
  schedule?: EventScheduleItem[];
  speakers?: EventPerson[];
  judgingPanel?: EventPerson[];
  winners?: EventWinner[];
  gallery?: EventGalleryImage[];
  report?: EventReport;
  certificates?: EventCertificates;
  organizers?: string[];
}

export const EVENT_CATEGORIES: EventCategory[] = [
  "Technical",
  "Workshop",
  "Competition",
  "Seminar",
  "Hackathon",
];

export const UPCOMING_EVENTS: EventShowcaseRecord[] = [
  {
    id: "evt-up-01",
    slug: "ieee-svce-inauguration-2026-2027",
    title: "IEEE SVCE Student Branch Inauguration (2026–2027) & Guest Lecture",
    category: "Seminar",
    status: "UPCOMING",
    featured: true,
    year: "2026",
    date: "31 August 2026",
    time: "9:00 AM – 12:00 PM",
    venue: "Library Seminar Hall",
    shortDescription:
      "IEEE SVCE Student Branch Inauguration for 2026–2027 followed by a guest lecture on the impact of AI in the IT industry and the development of multicloud microservices.",
    description:
      "The IEEE SVCE Student Branch inaugurates its 2026–2027 activities with a guest lecture on the impact of AI in the IT industry and the development of multicloud microservices. The session will feature Mr. Ravikumar Gopal, Development Director at Genesys Telecommunications India Pvt. Ltd.",
    image: "/events/upcoming/ieee-svce-inauguration-2026-2027.jpeg",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLScd2K82v14Cb2La_86G-XIxqRCTLegnAD2gZiUpCR_daWft9A/viewform?usp=publish-editor",
    speakers: [
      {
        name: "Mr. Ravikumar Gopal",
        designation: "Development Director",
        organization: "Genesys Telecommunications India Pvt. Ltd.",
      },
    ],
    organizers: [
      "IEEE SVCE Student Branch",
      "Dr. Sudhakar K Bharatan — IEEE SVCE Student Branch Counselor",
      "Dr. S. S. Sethuraman — Faculty Coordinator, EEE",
      "Dr. T. Annamalai — Faculty Coordinator, EEE",
      "Mr. Venkatesh K — Faculty Coordinator, ECE",
    ],
  },

  {
    id: "evt-up-02",
    slug: "doomsday-tech-edition",
    title: "Doomsday: Tech Edition",
    category: "Technical",
    status: "UPCOMING",
    featured: false,
    year: "2026",
    date: "To be announced",
    time: "To be announced",
    venue: "To be announced",
    shortDescription:
      "An immersive technical challenge designed to test adaptability, problem-solving, innovation, and teamwork through unexpected technical challenges.",
    description:
      "Doomsday: Tech Edition is an immersive technical challenge designed to test how well participants can think, adapt, and innovate when faced with unexpected problems. With technology at the center of every challenge, participants will be pushed beyond conventional problem-solving and forced to make quick decisions, develop creative solutions, and work effectively as a team. From technical puzzles and real-world scenarios to challenges that demand logic, engineering skills, and out-of-the-box thinking, every round brings a new obstacle to overcome. The pressure builds as participants race against time, where one wrong move could change everything.",
    image: "",
    registrationLink: "",
  },

  {
    id: "evt-up-03",
    slug: "ieee-quizverse",
    title: "IEEE QuizVerse",
    category: "Technical",
    status: "UPCOMING",
    featured: false,
    year: "2026",
    date: "To be announced",
    time: "To be announced",
    venue: "Online",
    shortDescription:
      "An online technical quiz designed to challenge participants across technology, engineering, innovation, science, and general technical knowledge.",
    description:
      "IEEE QuizVerse is an online technical quiz designed to challenge participants across a wide range of concepts, from technology and engineering to innovation, science, and general technical knowledge. With questions that test more than just memory, participants will need to think critically, connect concepts, and make quick decisions to stay ahead. Compete from wherever you are, put your knowledge to the test, and take on questions that range from fundamental concepts to unexpected twists. Every question is an opportunity to learn something new, prove your expertise, and climb higher on the leaderboard.",
    image: "",
    registrationLink: "",
  },

  {
    id: "evt-up-04",
    slug: "decode-and-deploy-2-0",
    title: "Decode and Deploy 2.0",
    category: "Technical",
    status: "UPCOMING",
    featured: false,
    year: "2026",
    date: "To be announced",
    time: "To be announced",
    venue: "To be announced",
    shortDescription:
      "A technical challenge spanning software and hardware domains, combining technical problem-solving with creative real-world scenario challenges.",
    description:
      "Decode and Deploy 2.0 is a technical challenge that tests participants across both software and hardware domains. The first round puts software participants through Linux or CSS-based challenges, while hardware participants tackle a domain-specific technical question paper. The second round takes a creative turn, where participants spin a scenario wheel, receive a random real-world situation, and must solve it by acting out their solution as a scene.",
    image: "",
    registrationLink: "",
  },
];

export function getPastEventBySlug(slug: string): EventShowcaseRecord | undefined {
  return PAST_EVENTS.find((e) => e.slug === slug);
}

export const PAST_EVENTS: EventShowcaseRecord[] = [
  {
    id: "evt-past-01",
    slug: "ieee-svce-inauguration-2025",
    title: "IEEE SVCE Student Branch Inauguration",
    category: "Seminar",
    status: "PAST",
    year: "2025",
    date: "12 August 2025",
    venue: "SVCE Campus",
    shortDescription:
      "The inauguration of the IEEE SVCE Student Branch for the Academic Year 2025–2026, followed by an industry-oriented guest lecture.",
    description:
      "The IEEE SVCE Student Branch inaugurated its activities for the Academic Year 2025–2026 with enthusiastic participation from students, office bearers, and faculty coordinators. The programme included the formal inauguration ceremony, induction of newly elected office bearers, badge presentation, and an industry-oriented guest lecture by Mr. Adithyan Manikandan, Manager at Hyundai Motors Ltd. The guest lecture provided students with insights into Electric Vehicles and Advanced Driver Assistance Systems, connecting academic learning with contemporary automotive technologies.",
    objective:
      "To formally inaugurate the IEEE SVCE Student Branch for the Academic Year 2025–2026 and provide students with exposure to industry practices, emerging automotive technologies, and professional development.",
    image: "/events/past/images/inauguration-2025.jpg",
    speakers: [
      {
        name: "Mr. Adithyan Manikandan",
        designation: "Manager",
        organization: "Hyundai Motors Ltd.",
      },
    ],
    gallery: [
      { caption: "IEEE SVCE Student Branch inauguration ceremony" },
      { caption: "Chief Guest addressing the gathering" },
      { caption: "Honorary badge presentation to IEEE office bearers" },
      { caption: "Keynote presentation on emerging automotive technologies" },
      { caption: "Memento presentation to the Chief Guest" },
      { caption: "Group photograph of the inauguration ceremony" },
    ],
     report: {
      available: true,
      url: "/events/inauguration-2025.pdf",
    },
  },

  {
    id: "evt-past-02",
    slug: "business-reboot-2-0-2025",
    title: "Business Reboot 2.0",
    category: "Competition",
    status: "PAST",
    year: "2025",
    date: "25 September 2025",
    venue: "Library Seminar Hall & Conference Hall",
    shortDescription:
      "A business proposal competition that challenged students to analyse real-world problems and develop innovative, scalable business solutions.",
    description:
      "Business Reboot 2.0 provided students with a platform to analyse real-world business challenges, develop innovative solutions, and present scalable business models. Thirteen teams presented their proposals before a panel of three judges. The event encouraged entrepreneurship, strategic thinking, collaborative learning, and practical problem-solving.",
    objective:
      "To develop entrepreneurial thinking, strategic problem-solving, collaboration, and the ability to transform real-world challenges into viable business solutions.",
    judgingPanel: [
      {
        name: "Dr. S. Kumaravel",
        designation: "Associate Professor, Department of Electrical and Electronics Engineering",
        organization: "SVCE",
      },
      {
        name: "Dr. G. Janakasudha",
        designation: "Associate Professor, Department of Computer Science Engineering",
        organization: "SVCE",
      },
      {
        name: "Ms. L. Anju",
        designation: "Assistant Professor, Department of Electronics and Communication Engineering",
        organization: "SVCE",
      },
    ],
    winners: [
      {
        position: "First Prize",
        name: "Team Tesla",
        institution: "III EEE / III AIDS",
      },
      {
        position: "Runner-Up",
        name: "Team GenZ",
        institution: "II ECE B",
      },
      {
        position: "Third Prize",
        name: "Team Dynamic Duo",
        institution: "III CSE B",
      },
    ],
    image: "/events/past/images/business-reboot-2-0-2025.jpg",
    gallery: [
      { caption: "Teams presenting their business proposals to the jury" },
      { caption: "Team Tesla explaining their proposal" },
      { caption: "Team GenZ presenting their framework" },
      { caption: "Team Dynamic Duo presenting their concept" },
      { caption: "Prize distribution ceremony" },
    ],
        report: {
      available: true,
      url: "/events/business-reboot-2-0-2025.pdf",
    },
  },

  {
    id: "evt-past-03",
    slug: "computer-aided-electromagnetic-field-analysis-2026",
    title: "Computer-Aided Electromagnetic Field Analysis",
    category: "Workshop",
    status: "PAST",
    year: "2026",
    date: "4–5 February 2026",
    venue: "Software Laboratory, Department of EEE",
    shortDescription:
      "A two-day hands-on workshop introducing students to computational tools, CAD, electromagnetic analysis, simulation, and practical engineering applications.",
    description:
      "The IEEE SVCE Student Branch conducted a two-day workshop on Computer-Aided Electromagnetic Field Analysis for students from the Electrical and Electronics Engineering and Electronics and Communication Engineering departments. The programme combined technical lectures, CAD concepts, computational simulation, demonstrations, and hands-on practice. Thirty students participated and gained practical exposure to software-based analysis using Magnet and other computational tools.",
    objective:
      "To enhance students' understanding of electromagnetic field concepts and introduce computational tools and simulation techniques used in modern engineering practice.",

    image: "/events/past/images/caefa-2026.jpg",
    gallery: [
      { caption: "Technical session during the CAEFA workshop" },
      { caption: "Guest lecturer addressing the participants" },
      { caption: "CAD technical session" },
      { caption: "Participants engaged in practical implementation" },
      { caption: "Single-phase transformer modelling demonstration" },
      { caption: "Electrostatic field analysis using MATLAB PDE Tool" },
      { caption: "Mentors guiding participants during the hands-on session" },
      { caption: "Valedictory ceremony and certificate presentation" },
    ],
        report: {
      available: true,
      url: "/events/caefa-2026.pdf",
    },
  },

  {
    id: "evt-past-04",
    slug: "ai-unleashed-2026",
    title: "AI Unleashed – Industrial Trends, Skills and Opportunities",
    category: "Seminar",
    status: "PAST",
    year: "2026",
    date: "17 February 2026",
    time: "6:30 PM",
    venue: "Online",
    shortDescription:
      "An industry-focused webinar exploring emerging AI trends, essential skills, research opportunities, and career prospects in AI-driven domains.",
    description:
      "The IEEE SVCE Student Branch organised the webinar AI Unleashed – Industrial Trends, Skills and Opportunities to create awareness about the rapidly evolving field of Artificial Intelligence. The session covered industrial trends, essential technical skills, emerging career opportunities, research possibilities, and practical applications of AI across multiple sectors. Around 120 students and faculty members participated in the session.",
    objective:
      "To help students understand current industrial expectations, emerging AI technologies, career opportunities, and the importance of continuous learning and skill development.",
    speakers: [
      {
        name: "Dr. Santhosh Krishna B V",
        designation:
          "Professor and Head, Department of Computer Science and Engineering (Data Science)",
        organization: "Bangalore Technological Institute, Bengaluru",
      },
    ],

    image: "/events/past/images/ai-unleashed-2026.jpg",
    gallery: [
      { caption: "AI Unleashed webinar session" },
      { caption: "Guest speaker addressing the participants" },
      { caption: "Discussion on AI industry trends and opportunities" },
      { caption: "Interactive discussion with participants" },
    ],
        report: {
      available: true,
      url: "/events/ai-unleashed-2026.pdf",
    },
  },

  {
    id: "evt-past-05",
    slug: "decode-and-deploy-2026",
    title: "Decode and Deploy",
    category: "Competition",
    status: "PAST",
    year: "2026",
    date: "25 February 2026",
    venue: "Library Function Hall",
    shortDescription:
      "A technical competition challenging students with hardware and software problems that tested analytical thinking, technical knowledge, teamwork, and problem-solving.",
    description:
      "Decode and Deploy was conducted as a technical competition involving challenges across both hardware and software domains. Teams analysed assigned scenarios, identified root causes, developed technically feasible solutions, and presented their approaches through structured demonstrations and technical justification. The evaluation focused on technical knowledge, analytical thinking, problem-solving ability, teamwork, and effective communication.",
    objective:
      "To promote analytical thinking, technical competence, innovation, collaborative learning, and practical problem-solving through hardware and software challenges.",
    winners: [
      {
        position: "First Prize",
        name: "Team Name",
      },
      {
        position: "Runner-Up",
        name: "Four the Plot",
      },
      {
        position: "Third Prize",
        name: "TechTitans",
      },
    ],

    image: "/events/past/images/decode-and-deploy-2026.jpg",
    gallery: [
      { caption: "Teams working on technical problem scenarios" },
      { caption: "Hardware evaluation round" },
      { caption: "Software evaluation round" },
      { caption: "Teams presenting their technical solutions" },
      { caption: "Four the Plot receiving the second prize" },
      { caption: "TechTitans receiving the third prize" },
      { caption: "Special recognition for outstanding participating teams" },
      { caption: "Vote of Thanks by Mr. Abrar" },
    ],
        report: {
      available: true,
      url: "/events/decode-and-deploy-2026.pdf",
    },
  },

  {
    id: "evt-past-06",
    slug: "valedictory-ceremony-2026",
    title: "Valedictory Ceremony 2025–2026",
    category: "Seminar",
    status: "PAST",
    year: "2026",
    date: "8 May 2026",
    time: "10:00 AM – 11:30 AM",
    venue: "Library Seminar Hall",
    shortDescription:
      "The concluding ceremony of AY 2025–2026 celebrating the achievements, contributions, and journey of the IEEE SVCE Student Branch.",
    description:
      "The Valedictory Ceremony marked the successful completion of the IEEE SVCE Student Branch's Academic Year 2025–2026. The programme reflected on the branch's workshops, technical competitions, webinars, guest lectures, and professional development initiatives conducted throughout the year. The ceremony also included the annual report presentation, certificate presentation to faculty coordinators and office bearers, a group photograph, and a formal Vote of Thanks.",
    objective:
      "To commemorate the successful completion of the academic year and recognise the dedication, leadership, teamwork, and contributions of faculty coordinators, office bearers, student volunteers, and members of the IEEE SVCE Student Branch.",

    image: "/events/past/images/valedictory-2026.jpg",
  gallery: [
      { caption: "Welcome Address during the Valedictory Ceremony" },
      { caption: "Annual Report presentation by Mr. Jai Kishore" },
      { caption: "Certificate presentation to faculty coordinators" },
      { caption: "Office bearers receiving certificates" },
      { caption: "IEEE SVCE Student Branch group photograph" },
      { caption: "Vote of Thanks by Mr. Sanjay Kumar V" },
    ],
        report: {
      available: true,
      url: "/events/valedictory-2026.pdf",
    },
  },
];
