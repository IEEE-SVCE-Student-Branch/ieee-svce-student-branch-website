"use client";

import React, { useRef } from "react";
import { TeamMember } from "@/lib/data/team";
import { useProximityEngine } from "./useProximityEngine";
import { TeamMemberCard } from "./TeamMemberCard";
import styles from "./Team.module.css";

interface TeamMemberGridProps {
  members: TeamMember[];
  selectedMember: TeamMember;
  onSelectMember: (member: TeamMember) => void;
}

export function TeamMemberGrid({
  members,
  selectedMember,
  onSelectMember,
}: TeamMemberGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerElement } = useProximityEngine(containerRef);

  return (
    <section ref={containerRef} className={styles.memberRailSection}>
      <div className={styles.memberRailGrid}>
        {members.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            isSelected={selectedMember.id === member.id}
            onSelect={onSelectMember}
            registerElement={registerElement}
          />
        ))}
      </div>
    </section>
  );
}
