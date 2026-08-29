import React from "react";
import Link from "next/link";
import { COMMUNITY_ACHIEVEMENTS } from "@/lib/data/branch-data";
import styles from "./HomeAchievements.module.css";

export function HomeAchievements() {
  return (
    <section className={styles.section} aria-label="IEEE SVCE Achievements">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>06 // ACHIEVEMENTS</span>
          </div>
          <h2 className={styles.title}>Laurels & Institutional Honors</h2>
          <p className={styles.desc}>
            Verified recognitions conferred by IEEE Region 10, IEEE Madras Section, and national
            engineering consortiums.
          </p>
        </div>

        <div className={styles.grid}>
          {COMMUNITY_ACHIEVEMENTS.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.yearTag}>{item.year}</span>
                <span className={styles.catBadge}>[ {item.category} ]</span>
              </div>

              <h3 className={styles.itemTitle}>{item.title}</h3>
              <div className={styles.awardedBy}>Conferred by: {item.awardedBy}</div>
              <p className={styles.summary}>{item.summary}</p>

              <div className={styles.citationBox}>
                <span className={styles.citLabel}>OFFICIAL CITATION:</span>
                <p className={styles.citVal}>{item.citation}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.provTag}>{item.provenance}</span>
                <Link href="/community" className={styles.proofLink} data-cursor="VIEW">
                  <span>PROOF WALL</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
