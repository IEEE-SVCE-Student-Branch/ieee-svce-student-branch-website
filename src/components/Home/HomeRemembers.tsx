import React from "react";
import Link from "next/link";
import { ARCHIVE_RECORDS, FEATURED_MEMORY_ITEM } from "@/lib/data/branch-data";
import styles from "./HomeRemembers.module.css";

export function HomeRemembers() {
  return (
    <section className={styles.section} aria-label="What IEEE SVCE Remembers">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>05 // WHAT IEEE SVCE REMEMBERS</span>
          </div>
          <h2 className={styles.title}>Institutional Archives & Memory</h2>
          <p className={styles.desc}>
            Three decades of permanent IEEE charter records, inaugural conference proceedings, and Section award citations since August 1994.
          </p>
        </div>

        <div className={styles.archiveGrid}>
          {/* Featured Recognition Dossier */}
          <div className={styles.featuredMemory}>
            <div className={styles.memHeader}>
              <span className={styles.memType}>{FEATURED_MEMORY_ITEM.recordType}</span>
              <span className={styles.memYear}>[ {FEATURED_MEMORY_ITEM.year} ]</span>
            </div>
            <h3 className={styles.memTitle}>{FEATURED_MEMORY_ITEM.title}</h3>
            <p className={styles.memSummary}>{FEATURED_MEMORY_ITEM.summary}</p>
            <div className={styles.citationBox}>
              <span className={styles.citationTag}>CITATION:</span>
              <p className={styles.citationText}>{FEATURED_MEMORY_ITEM.citation}</p>
            </div>
            <div className={styles.memFooter}>
              <span className={styles.provenanceTag}>{FEATURED_MEMORY_ITEM.provenance}</span>
              <Link href="/reports" className={styles.viewLink} data-cursor="VIEW">
                <span>INSPECT DOSSIER</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Chronological Archive Stream */}
          <div className={styles.recordsList}>
            {ARCHIVE_RECORDS.map((rec) => (
              <div key={rec.id} className={styles.recordItem}>
                <div className={styles.recTop}>
                  <span className={styles.recYear}>{rec.year}</span>
                  <span className={styles.recCat}>[ {rec.category} ]</span>
                </div>
                <h4 className={styles.recTitle}>{rec.title}</h4>
                <p className={styles.recSummary}>{rec.summary}</p>
                <span className={styles.recProv}>{rec.provenance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
