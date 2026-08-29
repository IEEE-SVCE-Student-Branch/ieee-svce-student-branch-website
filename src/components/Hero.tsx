import React from "react";
import Link from "next/link";
import { BRANCH_STATS } from "@/lib/data/branch-data";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.section} aria-label="Institutional Overview">
      <div className="container">
        {/* Top metadata line */}
        <div className={styles.topMetadataBar}>
          <div className={styles.coordinateTag}>
            <span aria-hidden="true">⌖</span>
            <span>{BRANCH_STATS.coordinates}</span>
          </div>
          <div>{"IEEE REGION 10 // MADRAS SECTION"}</div>
          <div>{`ESTABLISHED ${BRANCH_STATS.establishedYear} // STB 28051`}</div>
        </div>

        {/* Asymmetric grid */}
        <div className={styles.gridContent}>
          {/* Main typographic manifesto */}
          <div className={styles.typographicHero}>
            <div className={styles.preHeading}>THE LIVING INSTITUTION</div>
            <h1 className={styles.institutionTitle}>IEEE SVCE</h1>
            <div className={styles.institutionSub}>{"STUDENT BRANCH // 2026 / 27"}</div>

            <div className={styles.mottoContainer} aria-label="Build What's Next">
              <span className={styles.mottoWord}>BUILD</span>
              <span className={`${styles.mottoWord} ${styles.mottoWordHighlight}`}>
                WHAT&apos;S
              </span>
              <span className={styles.mottoWord}>NEXT.</span>
            </div>
          </div>

          {/* Side dossier container */}
          <div className={styles.sideDossier}>
            <div className={styles.dossierHeader}>
              <span>INSTITUTIONAL DOSSIER</span>
              <span className={styles.dossierBadge}>STB 28051</span>
            </div>

            <p className={styles.manifestoText}>
              A permanent digital institution for applied engineering, peer-reviewed research,
              technical symposia, and student leadership at Sri Venkateswara College of Engineering.
            </p>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{BRANCH_STATS.activeChapters}</span>
                <span className={styles.statLabel}>Chapters</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{BRANCH_STATS.verifiedMembers}</span>
                <span className={styles.statLabel}>Members</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{BRANCH_STATS.annualEvents}</span>
                <span className={styles.statLabel}>Programs/Yr</span>
              </div>
            </div>

            <div className={styles.actionsGroup}>
              <Link href="/events" className={styles.primaryCta}>
                <span>EXPLORE TECHNICAL CALENDAR</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/about" className={styles.secondaryCta}>
                <span>BRANCH CHARTER</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
