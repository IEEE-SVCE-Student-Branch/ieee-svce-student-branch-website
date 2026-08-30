"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { TeamMember, TEAM_MEMBERS_DATA } from "@/lib/data/team";
import { useProximityEngine } from "./useProximityEngine";
import { TeamNetworkNode } from "./TeamNetworkNode";
import styles from "./Team.module.css";

interface TeamNetworkProps {
  selectedMember: TeamMember;
  onSelectMember: (member: TeamMember) => void;
}

interface NetworkNodePosition {
  memberId: string;
  xPct: number; // Offset % from center 50%, kept strictly within [-38%, +38%]
  yPct: number; // Offset % from center 50%, kept strictly within [-38%, +38%]
}

// Organic asymmetric spatial node placements for all 26 members with strict radial separation
const NODE_POSITIONS: NetworkNodePosition[] = [
  // CORE (7 members)
  { memberId: "tm-01", xPct: -10, yPct: -18 }, // TR Hemachander (Chair)
  { memberId: "tm-04", xPct: 10, yPct: -18 }, // A Aadhithya Narayanan (Vice Chair)
  { memberId: "tm-02", xPct: -28, yPct: -10 }, // Sai Raksheedha S (Secretary)
  { memberId: "tm-05", xPct: 28, yPct: -10 }, // Vikhashini S (Joint Secretary)
  { memberId: "tm-03", xPct: -12, yPct: -38 }, // Janelle Rebecca J (Secretary)
  { memberId: "tm-06", xPct: 12, yPct: -38 }, // Dimple Kurugunda (Joint Secretary)
  { memberId: "tm-10", xPct: -36, yPct: -36 }, // Lakshan Vidhyuth LB (Event Head)

  // TREASURY (3 members)
  { memberId: "tm-07", xPct: -24, yPct: 6 }, // Harish BN (Treasurer)
  { memberId: "tm-08", xPct: -38, yPct: 14 }, // Bharath Kalyan B (Joint Treasurer)
  { memberId: "tm-09", xPct: -36, yPct: 38 }, // Sai Tharun B (Treasury Exec)

  // TECHNICAL (3 members)
  { memberId: "tm-11", xPct: 24, yPct: 6 }, // Akshitha K (Technical Head)
  { memberId: "tm-12", xPct: 36, yPct: -36 }, // Yaathra P (Technical Exec)
  { memberId: "tm-13", xPct: 26, yPct: -28 }, // Sethu Madhavan (Technical Exec)

  // DESIGN (3 members)
  { memberId: "tm-14", xPct: -12, yPct: 22 }, // GVL Apoorva (Design Head)
  { memberId: "tm-15", xPct: -7, yPct: 38 }, // Keerthana Janakiraman (Design Exec)
  { memberId: "tm-16", xPct: -22, yPct: 36 }, // Jwala Shiny E (Design Exec)

  // CONTENT (3 members)
  { memberId: "tm-17", xPct: 12, yPct: 22 }, // S Niharika (Content Head)
  { memberId: "tm-18", xPct: 26, yPct: 26 }, // M.Titiksha (Content Exec)
  { memberId: "tm-19", xPct: 38, yPct: 14 }, // Krishna B (Content Exec)

  // SOCIAL MEDIA & PHOTOGRAPHY (3 members)
  { memberId: "tm-20", xPct: -26, yPct: -28 }, // Harine S (Social Media Exec)
  { memberId: "tm-23", xPct: 22, yPct: 36 }, // E Dharanivel (Photo Lead)
  { memberId: "tm-24", xPct: 36, yPct: 38 }, // Prabhanjan V A (Photo Exec)

  // OUTREACH & EXECUTIVE (4 members)
  { memberId: "tm-21", xPct: -38, yPct: -24 }, // Harshitha R (Outreach Exec)
  { memberId: "tm-22", xPct: -26, yPct: 26 }, // Sathya Shree TR (Outreach Exec)
  { memberId: "tm-25", xPct: 7, yPct: 38 }, // Arulmozhi K (Executive)
  { memberId: "tm-26", xPct: 38, yPct: -24 }, // Rogini D (Executive)
];

export function TeamNetwork({ selectedMember, onSelectMember }: TeamNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
  const { registerElement } = useProximityEngine(containerRef);

  const spatialNodes = NODE_POSITIONS.map((pos) => {
    const member = TEAM_MEMBERS_DATA.find((m) => m.id === pos.memberId);
    return { ...pos, member };
  }).filter((item): item is NetworkNodePosition & { member: TeamMember } => item.member !== undefined);

  const activeId = hoveredMemberId || selectedMember.id;

  return (
    <div ref={containerRef} className={styles.networkViewport}>
      {/* SVG Connection Lines & Signal Pulse Overlay */}
      <svg className={styles.networkSvgOverlay}>
        <defs>
          <linearGradient id="signalPulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00629b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
          </linearGradient>
        </defs>

        {spatialNodes.map((node) => {
          const isSelected = selectedMember.id === node.member.id;
          const isActiveSignal = activeId === node.member.id;
          const isSameDivision = selectedMember.division === node.member.division;
          const x2 = `${50 + node.xPct}%`;
          const y2 = `${50 + node.yPct}%`;

          return (
            <React.Fragment key={`group-${node.member.id}`}>
              {/* Base Connection Edge */}
              <line
                x1="50%"
                y1="50%"
                x2={x2}
                y2={y2}
                className={`${styles.connectionLine} ${
                  isSelected ? styles.connectionLineSelected : isSameDivision ? styles.connectionLineActive : ""
                }`}
              />

              {/* Animated Signal Pulse Wave for Active/Hovered Node */}
              {isActiveSignal && (
                <line
                  x1="50%"
                  y1="50%"
                  x2={x2}
                  y2={y2}
                  className={styles.signalPulseLine}
                  stroke="url(#signalPulseGradient)"
                />
              )}
            </React.Fragment>
          );
        })}
      </svg>

      {/* Central IEEE SVCE Hub Core */}
      <div className={`${styles.networkCenterNode} ${hoveredMemberId ? styles.networkCenterNodeActive : ""}`}>
        <Image
          src="/ieee.svg"
          alt="IEEE Logo"
          width={88}
          height={30}
          className={styles.networkCenterLogo}
          priority
        />
        <span className={styles.networkCenterLabel}>IEEE SVCE</span>
      </div>

      {/* Spatial Organic Member Nodes */}
      {spatialNodes.map((node) => (
        <TeamNetworkNode
          key={node.member.id}
          member={node.member}
          isSelected={selectedMember.id === node.member.id}
          onSelect={onSelectMember}
          onHoverChange={(memberId) => setHoveredMemberId(memberId)}
          registerElement={registerElement}
          xPct={node.xPct}
          yPct={node.yPct}
        />
      ))}
    </div>
  );
}
