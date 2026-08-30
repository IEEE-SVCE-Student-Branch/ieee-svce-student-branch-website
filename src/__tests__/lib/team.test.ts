import { describe, it, expect } from "vitest";
import {
  TEAM_MEMBERS_DATA,
  TEAM_DIVISIONS,
  getTeamStats,
  getMembersByDivision,
  getDivisionCounts,
  branchSocials,
} from "@/lib/data/team";

describe("IEEE SVCE Team Data Architecture", () => {
  it("should contain exactly 26 team members as per official roster", () => {
    expect(TEAM_MEMBERS_DATA).toHaveLength(26);
  });

  it("should contain valid structure for every member", () => {
    TEAM_MEMBERS_DATA.forEach((member) => {
      expect(member.id).toBeTruthy();
      expect(member.name).toBeTruthy();
      expect(member.year).toBeTruthy();
      expect(member.department).toBeTruthy();
      expect(member.designation).toBeTruthy();
      expect(TEAM_DIVISIONS).toContain(member.division);

      if (member.linkedin) {
        expect(member.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
        expect(member.linkedin).not.toContain("utm_source=");
      }
    });
  });

  it("should correctly handle unverified LinkedIn entries (e.g. Harish BN)", () => {
    const harish = TEAM_MEMBERS_DATA.find((m) => m.name === "Harish BN");
    expect(harish).toBeDefined();
    expect(harish?.linkedin).toBeUndefined();
    expect(harish?.linkedinUnverified).toBe("Harish Balasubramaniam Neelakandan | LinkedIn");
  });

  it("should compute dynamic stats matching current dataset", () => {
    const stats = getTeamStats();
    expect(stats.totalMembers).toBe(26);
    expect(stats.totalDivisions).toBe(TEAM_DIVISIONS.length);
    expect(stats.verifiedLinkedInCount).toBe(25);
    expect(stats.branchCode).toBe("STB 28051");
  });

  it("should filter members by division correctly", () => {
    const core = getMembersByDivision("CORE");
    expect(core.length).toBe(7);

    const technical = getMembersByDivision("TECHNICAL");
    expect(technical.length).toBe(3);

    const allMembers = getMembersByDivision("ALL");
    expect(allMembers.length).toBe(26);
  });

  it("should compute division counts correctly for all 7 authoritative divisions", () => {
    const counts = getDivisionCounts();
    expect(counts["ALL"]).toBe(26);
    expect(counts["CORE"]).toBe(7);
    expect(counts["TREASURY"]).toBe(3);
    expect(counts["TECHNICAL"]).toBe(3);
    expect(counts["DESIGN"]).toBe(3);
    expect(counts["CONTENT"]).toBe(3);
    expect(counts["SOCIAL MEDIA & PHOTOGRAPHY"]).toBe(3);
    expect(counts["OUTREACH & EXECUTIVE"]).toBe(4);
  });

  it("should export branch socials", () => {
    expect(branchSocials.instagram).toBe("https://www.instagram.com/ieee__svce/");
  });
});
