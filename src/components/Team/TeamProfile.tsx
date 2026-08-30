"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { TeamMember, TEAM_MEMBERS_DATA, branchSocials } from "@/lib/data/team";
import { useProximityEngine } from "./useProximityEngine";
import styles from "./Team.module.css";

interface TeamProfileProps {
  member: TeamMember;
}

export function TeamProfile({ member }: TeamProfileProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { registerElement } = useProximityEngine(panelRef);

  useEffect(() => {
    registerElement(member.id, cardRef.current);
    return () => registerElement(member.id, null);
  }, [member.id, registerElement]);

  const indexNumber = TEAM_MEMBERS_DATA.findIndex((m) => m.id === member.id) + 1;
  const formattedIndex = String(indexNumber).padStart(2, "0");
  const totalCount = String(TEAM_MEMBERS_DATA.length).padStart(2, "0");

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <aside ref={panelRef} className={styles.profilePanel}>
      <div className={styles.profileCounterRow}>
        <span className={styles.profileCounter}>
          {formattedIndex} / {totalCount}
        </span>
        <span className={styles.profileDivisionBadge}>{member.division}</span>
      </div>

      <div ref={cardRef} className={styles.profileImageContainer}>
        {member.image ? (
          <Image
            key={member.id}
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            priority
            className={styles.profileImage}
            style={{
              objectPosition: member.imagePosition || "50% 25%",
            }}
          />
        ) : (
          <div className={styles.profileImageFallback}>{initials}</div>
        )}
        <div className={styles.profileSpotlight} />
      </div>

      <div className={styles.profileMeta}>
        <span className={styles.profileRoleTag}>{member.designation}</span>
        <h2 className={styles.profileName}>{member.name}</h2>
        <div className={styles.profileDeptYear}>
          <span>{member.year}</span>
          <span className={styles.metaDot}>·</span>
          <span>{member.department}</span>
        </div>
      </div>

      <div className={styles.profileActionsRow}>
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
            aria-label={`View ${member.name}'s LinkedIn profile`}
          >
            VIEW LINKEDIN PROFILE ↗
          </a>
        ) : (
          <div className={styles.unverifiedNotice}>
            LinkedIn Profile Pending Verification ({member.name})
          </div>
        )}

        <a
          href={member.instagram || branchSocials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnSecondary}
          aria-label="Visit official IEEE SVCE Instagram"
        >
          IEEE SVCE INSTAGRAM ↗
        </a>
      </div>
    </aside>
  );
}
