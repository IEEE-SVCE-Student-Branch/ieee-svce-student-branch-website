"use client";

import React, { useState } from "react";
import { PageShell } from "@/components/PageShell";
import {
  TeamMember,
  TeamDivision,
  TEAM_MEMBERS_DATA,
  getMembersByDivision,
} from "@/lib/data/team";
import { TeamHero } from "./TeamHero";
import { TeamNetwork } from "./TeamNetwork";
import { TeamProfile } from "./TeamProfile";
import { TeamDivisionTabs } from "./TeamDivisionTabs";
import { TeamMemberGrid } from "./TeamMemberGrid";
import styles from "./Team.module.css";

export function TeamPageClient() {
  const [selectedMember, setSelectedMember] = useState<TeamMember>(TEAM_MEMBERS_DATA[0]);
  const [activeDivision, setActiveDivision] = useState<TeamDivision>("CORE");

  const filteredMembers = getMembersByDivision(activeDivision);

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleSelectDivision = (division: TeamDivision) => {
    setActiveDivision(division);
  };

  return (
    <PageShell
      title="People Network & Organizational Directory"
      categoryTag="// INSTITUTIONAL STEWARDSHIP"
      description="The living network of elected student officers, domain heads, and executive teams driving technical excellence and institutional governance at IEEE SVCE."
      breadcrumbLabel="TEAM"
      provenanceCode="STB28051-ROSTER-2026"
    >
      <div className={styles.teamPageContainer}>
        {/* 1. Team Hero Section */}
        <TeamHero />

        {/* 2. Main Spatial Network + Profile Inspector Side-by-Side */}
        <div className={styles.mainNetworkLayout}>
          <TeamNetwork
            selectedMember={selectedMember}
            onSelectMember={handleSelectMember}
          />
          <TeamProfile member={selectedMember} />
        </div>

        {/* 3. Division Navigation Tabs */}
        <TeamDivisionTabs
          activeDivision={activeDivision}
          onSelectDivision={handleSelectDivision}
        />

        {/* 4. Member Card Grid / Rail */}
        <TeamMemberGrid
          members={filteredMembers}
          selectedMember={selectedMember}
          onSelectMember={handleSelectMember}
        />
      </div>
    </PageShell>
  );
}
