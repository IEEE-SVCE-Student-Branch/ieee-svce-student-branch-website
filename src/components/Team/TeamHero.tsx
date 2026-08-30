"use client";

import React from "react";
import Image from "next/image";
import { getTeamStats, branchSocials } from "@/lib/data/team";
import styles from "./Team.module.css";

export function TeamHero() {
  const stats = getTeamStats();

  return (
    <header className={styles.heroSection}>
      <div className={styles.brandHeader}>
        <div className={styles.brandLogoLockup}>
          <Image
            src="/ieee.svg"
            alt="IEEE Official Mark"
            width={165}
            height={52}
            priority
            className={styles.brandLogoIeee}
          />
          <div className={styles.brandDivider} aria-hidden="true" />
          <Image
            src="/svce.svg"
            alt="SVCE Official Mark"
            width={115}
            height={52}
            priority
            className={styles.brandLogoSvce}
          />
        </div>
        <span className={styles.heroTag}>{"// " + branchSocials.branchCode}</span>
      </div>

      <h1 className={styles.heroTitle}>
        THE PEOPLE <br />
        <span className={styles.heroTitleHighlight}>BEHIND IEEE SVCE</span>
      </h1>

      <p className={styles.heroSubtitle}>
        Every idea. Every event. Every impact. It starts with a person.
      </p>

      <div className={styles.heroStatsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.totalMembers}</span>
          <span className={styles.statLabel}>Team Members</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.totalDivisions}</span>
          <span className={styles.statLabel}>Authoritative Divisions</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>1</span>
          <span className={styles.statLabel}>Branch Community</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{branchSocials.branchCode}</span>
          <span className={styles.statLabel}>IEEE Madras Section</span>
        </div>
      </div>
    </header>
  );
}
