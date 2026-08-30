"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { TeamMember } from "@/lib/data/team";
import { RegisterNodeFn } from "./useProximityEngine";
import styles from "./Team.module.css";

interface TeamNetworkNodeProps {
  member: TeamMember;
  isSelected: boolean;
  onSelect: (member: TeamMember) => void;
  onHoverChange?: (memberId: string | null) => void;
  registerElement: RegisterNodeFn;
  xPct: number;
  yPct: number;
}

export function TeamNetworkNode({
  member,
  isSelected,
  onSelect,
  onHoverChange,
  registerElement,
  xPct,
  yPct,
}: TeamNetworkNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerElement(member.id, nodeRef.current);
    return () => registerElement(member.id, null);
  }, [member.id, registerElement]);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <div
      ref={nodeRef}
      className={`${styles.spatialNode} ${isSelected ? styles.spatialNodeSelected : ""}`}
      style={{
        left: `${50 + xPct}%`,
        top: `${50 + yPct}%`,
      }}
      onClick={() => onSelect(member)}
      onMouseEnter={() => onHoverChange?.(member.id)}
      onMouseLeave={() => onHoverChange?.(null)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(member);
        }
      }}
      aria-label={`Select ${member.name}, ${member.designation}`}
    >
      {member.image ? (
        <Image
          src={member.image}
          alt={member.name}
          width={40}
          height={40}
          className={styles.spatialNodeAvatar}
          style={{
            objectPosition: member.imagePosition || "50% 25%",
            transform: member.imageScale ? `scale(${member.imageScale})` : undefined,
          }}
        />
      ) : (
        <div className={styles.spatialNodeAvatarFallback}>{initials}</div>
      )}
      <div className={styles.spatialNodeInfo}>
        <span className={styles.spatialNodeName}>{member.name}</span>
        <span className={styles.spatialNodeRole}>{member.designation}</span>
      </div>
    </div>
  );
}
