"use client";

import React from "react";
import { TeamDivision, TEAM_DIVISIONS, getDivisionCounts } from "@/lib/data/team";
import styles from "./Team.module.css";

interface TeamDivisionTabsProps {
  activeDivision: TeamDivision;
  onSelectDivision: (division: TeamDivision) => void;
}

export function TeamDivisionTabs({ activeDivision, onSelectDivision }: TeamDivisionTabsProps) {
  const counts = getDivisionCounts();

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        <h2 className={styles.tabsTitle}>Authoritative Divisions</h2>
      </div>

      <div className={styles.tabsGrid} role="tablist" aria-label="Team divisions filter">
        {TEAM_DIVISIONS.map((div) => {
          const isActive = activeDivision === div;
          const count = counts[div] || 0;

          return (
            <button
              key={div}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
              onClick={() => onSelectDivision(div)}
            >
              <span>{div}</span>
              <span className={styles.tabBadge}>({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
