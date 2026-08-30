"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { TeamMember, TEAM_MEMBERS_DATA, branchSocials } from "@/lib/data/team";
import { RegisterNodeFn } from "./useProximityEngine";
import styles from "./Team.module.css";

interface TeamMemberCardProps {
  member: TeamMember;
  isSelected: boolean;
  onSelect: (member: TeamMember) => void;
  registerElement: RegisterNodeFn;
}

export function TeamMemberCard({
  member,
  isSelected,
  onSelect,
  registerElement,
}: TeamMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerElement(member.id, cardRef.current);
    return () => registerElement(member.id, null);
  }, [member.id, registerElement]);

  const indexNumber = TEAM_MEMBERS_DATA.findIndex((m) => m.id === member.id) + 1;
  const formattedIndex = String(indexNumber).padStart(2, "0");

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <div
      ref={cardRef}
      className={`${styles.memberCard} ${isSelected ? styles.memberCardSelected : ""}`}
      onClick={() => onSelect(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(member);
        }
      }}
      aria-label={`View details for ${member.name}, ${member.designation}`}
    >
      <div className={styles.memberCardHeader}>
        <span className={styles.memberCardIndex}>#{formattedIndex}</span>
        <span className={styles.memberCardDivisionTag}>{member.division}</span>
      </div>

      {/* 1. Photograph */}
      <div className={styles.memberCardImageWrapper}>
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={styles.memberCardImage}
            style={{
              objectPosition: member.imagePosition || "50% 25%",
              transform: member.imageScale
                ? `scale(${member.imageScale}) translate3d(calc(var(--p-dx, 0) * var(--p-weight, 0) * 4px), calc(var(--p-dy, 0) * var(--p-weight, 0) * 4px), 0)`
                : undefined,
            }}
          />
        ) : (
          <div className={styles.memberCardImageFallback}>{initials}</div>
        )}
        <div className={styles.memberCardSpotlight} />
      </div>

      {/* 2. Name, 3. Designation, 4. Department + Year */}
      <div className={styles.memberCardBody}>
        <h3 className={styles.memberCardName}>{member.name}</h3>
        <span className={styles.memberCardRole}>{member.designation}</span>
        <span className={styles.memberCardDept}>
          {member.department} · {member.year}
        </span>
      </div>

      {/* 5. Icon-Only Social Actions (LinkedIn & Instagram Signature Icon Buttons) */}
      <div className={styles.memberCardFooter}>
        <div className={styles.cardSocialsGroup}>
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={styles.iconSocialBtn}
              aria-label={`Open ${member.name}'s LinkedIn profile`}
              title={`Open ${member.name}'s LinkedIn profile`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          ) : (
            <div
              className={`${styles.iconSocialBtn} ${styles.iconSocialDisabled}`}
              title={`LinkedIn profile for ${member.name} pending verification`}
              aria-label={`LinkedIn profile for ${member.name} pending verification`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
          )}

          <a
            href={member.instagram || branchSocials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={styles.iconSocialBtn}
            aria-label="Open official IEEE SVCE Instagram"
            title="Open official IEEE SVCE Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
