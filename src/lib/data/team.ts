/**
 * IEEE SVCE — Authoritative Team Data Architecture
 *
 * Single source of truth for the IEEE SVCE Student Branch Team Page.
 * Contains verified details of all 26 team members, preserved designations,
 * division groupings, cleaned LinkedIn URLs, and institutional metadata.
 */

export type TeamDivision =
  | "CORE"
  | "TREASURY"
  | "TECHNICAL"
  | "DESIGN"
  | "CONTENT"
  | "SOCIAL MEDIA & PHOTOGRAPHY"
  | "OUTREACH & EXECUTIVE";

export interface TeamMember {
  id: string;
  name: string;
  year: string;
  department: string;
  designation: string;
  division: TeamDivision;
  image?: string;
  linkedin?: string;
  linkedinUnverified?: string;
  instagram?: string;
  imagePosition?: string;
  imageScale?: number;
  focalPointX?: number;
  focalPointY?: number;
}

export const branchSocials = {
  instagram: "https://www.instagram.com/ieee__svce/",
  branchCode: "STB 28051",
  institution: "Sri Venkateswara College of Engineering",
  section: "IEEE Madras Section (Region 10)",
} as const;

export const TEAM_DIVISIONS: TeamDivision[] = [
  "CORE",
  "TREASURY",
  "TECHNICAL",
  "DESIGN",
  "CONTENT",
  "SOCIAL MEDIA & PHOTOGRAPHY",
  "OUTREACH & EXECUTIVE",
];

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  // CORE (7 members)
  {
    id: "tm-01",
    name: "TR Hemachander",
    year: "IV Year",
    department: "Electrical and Electronics Engineering",
    designation: "Chair",
    division: "CORE",
    image: "/team/hemachander%20t%20r.jpg",
    linkedin: "https://www.linkedin.com/in/hemachander31",
    instagram: branchSocials.instagram,
    imagePosition: "50% 18%",
    imageScale: 1.08,
  },
  {
    id: "tm-02",
    name: "Sai Raksheedha S",
    year: "IV Year",
    department: "Electronics and Communication Engineering",
    designation: "Secretary",
    division: "CORE",
    image: "/team/SAI%20RAKSHEEDHA%20S.JPG",
    linkedin: "https://www.linkedin.com/in/sai-raksheedha-606a87332",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.08,
  },
  {
    id: "tm-03",
    name: "Janelle Rebecca J",
    year: "IV Year",
    department: "Electrical and Electronics Engineering",
    designation: "Secretary",
    division: "CORE",
    image: "/team/Janelle_Rebecca.jpg",
    linkedin: "https://www.linkedin.com/in/janelle-rebecca-j-484018374",
    instagram: branchSocials.instagram,
    imagePosition: "50% 18%",
    imageScale: 1.08,
  },
  {
    id: "tm-04",
    name: "A Aadhithya Narayanan",
    year: "III Year",
    department: "Electronics and Communication Engineering",
    designation: "Vice Chair",
    division: "CORE",
    image: "/team/Aadithya%20Narayanan.jpg",
    linkedin: "https://www.linkedin.com/in/aadhithyanarayanan/",
    instagram: branchSocials.instagram,
    imagePosition: "50% 18%",
    imageScale: 1.08,
  },
  {
    id: "tm-05",
    name: "Vikhashini S",
    year: "III Year",
    department: "Computer Science and Engineering",
    designation: "Joint Secretary",
    division: "CORE",
    image: "/team/vikhashini.jpg",
    linkedin: "https://www.linkedin.com/in/vikhashini-s-2a8295328",
    instagram: branchSocials.instagram,
    imagePosition: "50% 26%",
    imageScale: 1.06,
  },
  {
    id: "tm-06",
    name: "Dimple Kurugunda",
    year: "III Year",
    department: "Electrical and Electronics Engineering",
    designation: "Joint Secretary",
    division: "CORE",
    image: "/team/dimple%20kurugunda.jpg",
    linkedin: "https://www.linkedin.com/in/dimple-kurugunda-bab5b0359",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.08,
  },
  {
    id: "tm-10",
    name: "Lakshan Vidhyuth LB",
    year: "IV Year",
    department: "Electrical and Electronics Engineering",
    designation: "Event Head",
    division: "CORE",
    image: "/team/Lakshan_Vidhyuth_LB.png",
    linkedin: "https://www.linkedin.com/in/lakshan-vidhyuth-lb-5b4551328",
    instagram: branchSocials.instagram,
    imagePosition: "50% 28%",
    imageScale: 1.05,
  },

  // TREASURY (3 members)
  {
    id: "tm-07",
    name: "Harish BN",
    year: "IV Year",
    department: "Electrical and Electronics Engineering",
    designation: "Treasurer",
    division: "TREASURY",
    image: "/team/Harish%20BN.jpg",
    linkedinUnverified: "Harish Balasubramaniam Neelakandan | LinkedIn",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.08,
  },
  {
    id: "tm-08",
    name: "Bharath Kalyan B",
    year: "III Year",
    department: "Electronics and Communication Engineering",
    designation: "Joint Treasurer",
    division: "TREASURY",
    image: "/team/bharath.jpg",
    linkedin: "https://www.linkedin.com/in/bharath-b-b83020294",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.08,
  },
  {
    id: "tm-09",
    name: "Sai Tharun B",
    year: "III Year",
    department: "Electronics and Communication Engineering",
    designation: "Treasury Executive",
    division: "TREASURY",
    image: "/team/Sai%20Tharun.png",
    linkedin: "https://www.linkedin.com/in/sai-tharun-b-01a139364/",
    instagram: branchSocials.instagram,
    imagePosition: "50% 22%",
    imageScale: 1.06,
  },

  // TECHNICAL (3 members)
  {
    id: "tm-11",
    name: "Akshitha K",
    year: "III Year",
    department: "Computer Science and Engineering",
    designation: "Technical Team Head",
    division: "TECHNICAL",
    image: "/team/Akshitha_.jpg",
    linkedin: "https://www.linkedin.com/in/akshitha-k-6311a5328",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.08,
  },
  {
    id: "tm-12",
    name: "Yaathra P",
    year: "II Year",
    department: "Computer Science and Engineering",
    designation: "Technical Executive",
    division: "TECHNICAL",
    image: "/team/YAATHRA%20TECHNICAL%20EXECUTIVE.png",
    linkedin: "https://www.linkedin.com/in/yaathra-p/",
    instagram: branchSocials.instagram,
    imagePosition: "50% 23%",
    imageScale: 1.06,
  },
  {
    id: "tm-13",
    name: "Sethu Madhavan Srinivasan",
    year: "II Year",
    department: "Electronics and Communication Engineering",
    designation: "Technical Executive",
    division: "TECHNICAL",
    image: "/team/sethu%20madhavan%20srinivasan.png",
    linkedin: "https://www.linkedin.com/in/sethu-madhavan-00b595381",
    instagram: branchSocials.instagram,
    imagePosition: "50% 26%",
    imageScale: 1.06,
  },

  // DESIGN (3 members)
  {
    id: "tm-14",
    name: "GVL Apoorva",
    year: "III Year",
    department: "Computer Science and Engineering",
    designation: "Design Team Head",
    division: "DESIGN",
    image: "/team/GVL_Apoorva.JPG",
    linkedin: "https://www.linkedin.com/in/gvl-apoorva-3061ba328/",
    instagram: branchSocials.instagram,
    imagePosition: "50% 18%",
    imageScale: 1.1,
  },
  {
    id: "tm-15",
    name: "Keerthana Janakiraman",
    year: "II Year",
    department: "Artificial Intelligence and Data Science",
    designation: "Design Executive",
    division: "DESIGN",
    image: "/team/Keerthana%20Janakiraman.jpg",
    linkedin: "https://www.linkedin.com/in/keerthana-janakiraman",
    instagram: branchSocials.instagram,
    imagePosition: "50% 23%",
    imageScale: 1.06,
  },
  {
    id: "tm-16",
    name: "Jwala Shiny E",
    year: "II Year",
    department: "Electrical and Electronics Engineering",
    designation: "Design Executive",
    division: "DESIGN",
    image: "/team/Jwala%20Shiny%20E_.jpg",
    linkedin: "https://www.linkedin.com/in/jwala-shiny-e-61b284384",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.08,
  },

  // CONTENT (3 members)
  {
    id: "tm-17",
    name: "S Niharika",
    year: "II Year",
    department: "Electrical and Electronics Engineering",
    designation: "Content Team Head",
    division: "CONTENT",
    image: "/team/Niharika%20S.jpg",
    linkedin: "https://www.linkedin.com/in/niharika-s-172015384",
    instagram: branchSocials.instagram,
    imagePosition: "50% 23%",
    imageScale: 1.06,
  },
  {
    id: "tm-18",
    name: "M.Titiksha",
    year: "II Year",
    department: "Electrical and Electronics Engineering",
    designation: "Content Executive",
    division: "CONTENT",
    image: "/team/Titiksha.jpg",
    linkedin: "https://www.linkedin.com/in/titiksha-muruga-b08955388",
    instagram: branchSocials.instagram,
    imagePosition: "50% 24%",
    imageScale: 1.05,
  },
  {
    id: "tm-19",
    name: "Krishna B",
    year: "II Year",
    department: "Electrical and Electronics Engineering",
    designation: "Content Executive",
    division: "CONTENT",
    image: "/team/Krishna%20B.jpg",
    linkedin: "https://www.linkedin.com/in/krishnabalaji10",
    instagram: branchSocials.instagram,
    imagePosition: "50% 22%",
    imageScale: 1.06,
  },

  // SOCIAL MEDIA & PHOTOGRAPHY (3 members)
  {
    id: "tm-20",
    name: "Harine S",
    year: "II Year",
    department: "Electronics and Communication Engineering",
    designation: "Social Media Executive",
    division: "SOCIAL MEDIA & PHOTOGRAPHY",
    image: "/team/Harine%20S.jpg",
    linkedin: "https://www.linkedin.com/in/harine-s-b204633b1",
    instagram: branchSocials.instagram,
    imagePosition: "50% 26%",
    imageScale: 1.05,
  },
  {
    id: "tm-23",
    name: "E Dharanivel",
    year: "II Year",
    department: "Electrical and Electronics Engineering",
    designation: "Photography Lead",
    division: "SOCIAL MEDIA & PHOTOGRAPHY",
    image: "/team/E%20Dharanivel.jpg",
    linkedin: "https://www.linkedin.com/in/e-dharanivel-7a7796431",
    instagram: branchSocials.instagram,
    imagePosition: "50% 23%",
    imageScale: 1.08,
  },
  {
    id: "tm-24",
    name: "Prabhanjan V A",
    year: "II Year",
    department: "Electronics and Communication Engineering",
    designation: "Photography Executive",
    division: "SOCIAL MEDIA & PHOTOGRAPHY",
    image: "/team/Prabhanjan.JPG",
    linkedin: "https://www.linkedin.com/in/prabhanjan-v-a-a4980137a",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.06,
  },

  // OUTREACH & EXECUTIVE (4 members)
  {
    id: "tm-21",
    name: "Harshitha R",
    year: "II Year",
    department: "Electronics and Communication Engineering",
    designation: "Outreach Executive",
    division: "OUTREACH & EXECUTIVE",
    image: "/team/harshitha%20R.jpg",
    linkedin: "https://www.linkedin.com/in/harshitha-r-ece-a9194b399",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.08,
  },
  {
    id: "tm-22",
    name: "Sathya Shree TR",
    year: "II Year",
    department: "Electrical and Electronics Engineering",
    designation: "Outreach Executive",
    division: "OUTREACH & EXECUTIVE",
    image: "/team/sathya%20sree%20t%20r.jpg",
    linkedin: "https://www.linkedin.com/in/sathya-shree-t-r-a1a818383",
    instagram: branchSocials.instagram,
    imagePosition: "50% 20%",
    imageScale: 1.08,
  },
  {
    id: "tm-25",
    name: "Arulmozhi K",
    year: "III Year",
    department: "Computer Science and Engineering",
    designation: "Executive Member",
    division: "OUTREACH & EXECUTIVE",
    image: "/team/Arulmozhi%20K.jpg",
    linkedin: "https://www.linkedin.com/in/arulmozhi-k-92b498326",
    instagram: branchSocials.instagram,
    imagePosition: "50% 23%",
    imageScale: 1.05,
  },
  {
    id: "tm-26",
    name: "Rogini D",
    year: "II Year",
    department: "Electronics and Communication Engineering",
    designation: "Executive Member",
    division: "OUTREACH & EXECUTIVE",
    image: "/team/Rogini%20D.jpg",
    linkedin: "https://www.linkedin.com/in/imrogini/",
    instagram: branchSocials.instagram,
    imagePosition: "50% 26%",
    imageScale: 1.06,
  },
];

/**
 * Computes dynamic statistics from the team dataset.
 */
export function getTeamStats() {
  const totalMembers = TEAM_MEMBERS_DATA.length;
  const totalDivisions = TEAM_DIVISIONS.length;
  const verifiedLinkedInCount = TEAM_MEMBERS_DATA.filter((m) => Boolean(m.linkedin)).length;

  const departmentCounts = TEAM_MEMBERS_DATA.reduce<Record<string, number>>((acc, member) => {
    acc[member.department] = (acc[member.department] || 0) + 1;
    return acc;
  }, {});

  return {
    totalMembers,
    totalDivisions,
    verifiedLinkedInCount,
    departmentCounts,
    branchCode: branchSocials.branchCode,
  };
}

/**
 * Filter team members by division. Returns all members if division is 'ALL' or empty.
 */
export function getMembersByDivision(division?: TeamDivision | "ALL"): TeamMember[] {
  if (!division || division === "ALL") {
    return TEAM_MEMBERS_DATA;
  }
  return TEAM_MEMBERS_DATA.filter((m) => m.division === division);
}

/**
 * Get dynamic member count by division.
 */
export function getDivisionCounts(): Record<string, number> {
  const counts: Record<string, number> = { ALL: TEAM_MEMBERS_DATA.length };
  TEAM_DIVISIONS.forEach((div) => {
    counts[div] = TEAM_MEMBERS_DATA.filter((m) => m.division === div).length;
  });
  return counts;
}
