import React from "react";
import Link from "next/link";
import { FEATURED_MEMORY_ITEM } from "@/lib/data/branch-data";
import styles from "./MemoryFeature.module.css";

export function MemoryFeature() {
  const mem = FEATURED_MEMORY_ITEM;

  return (
    <section className={styles.section} aria-label="Institutional Memory">
      <div className="container">
        <div className={styles.memoryCard}>
          {/* Top provenance bar */}
          <div className={styles.topBar}>
            <div className={styles.memoryLabelGroup}>
              <span aria-hidden="true">◈</span>
              <span>{"// INSTITUTIONAL MEMORY"}</span>
              <span>•</span>
              <span>{mem.recordType}</span>
            </div>
            <span className={styles.provenanceBadge}>{`RECORD: ${mem.provenance}`}</span>
          </div>

          {/* Content */}
          <div className={styles.contentRow}>
            <div className={styles.textContent}>
              <h2 className={styles.title}>{mem.title}</h2>
              <p className={styles.summary}>{mem.summary}</p>
              <div className={styles.citationText}>{`// ${mem.citation}`}</div>
            </div>

            <div className={styles.actionSide}>
              <Link href="/achievements" className={styles.archiveLink}>
                <span>ACCOLADES REPOSITORY</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
