import React from "react";
import Link from "next/link";
import { FEATURED_NOW_EVENT } from "@/lib/data/branch-data";
import styles from "./NowFeature.module.css";

export function NowFeature() {
  const evt = FEATURED_NOW_EVENT;

  return (
    <section className={styles.section} aria-label="Current Marquee Program">
      <div className="container">
        <div className={styles.nowCard}>
          {/* Header Bar */}
          <div className={styles.cardHeader}>
            <div className={styles.nowBadgeGroup}>
              <span className={styles.pulseLight} aria-hidden="true" />
              <span className={styles.nowLabel}>{"// NOW FEATURED"}</span>
            </div>
            <span className={styles.provenanceCode}>PROVENANCE: {evt.provenance}</span>
          </div>

          {/* Card Body */}
          <div className={styles.cardBody}>
            <div className={styles.mainInfo}>
              <span className={styles.trackBadge}>[ {evt.track} ]</span>
              <h2 className={styles.eventTitle}>{evt.title}</h2>
              <p className={styles.eventSubtitle}>{evt.subtitle}</p>
              <p className={styles.abstract}>{evt.abstract}</p>

              <div className={styles.tagsRow}>
                {evt.tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Side Metadata & CTA */}
            <div className={styles.sideMeta}>
              <div className={styles.metaGrid}>
                <div className={styles.metaBlock}>
                  <span className={styles.metaLabel}>DATE & TIME</span>
                  <span className={styles.metaValue}>
                    {evt.date} • {evt.time}
                  </span>
                </div>

                <div className={styles.metaBlock}>
                  <span className={styles.metaLabel}>VENUE</span>
                  <span className={styles.metaValue}>{evt.venue}</span>
                </div>

                <div className={styles.metaBlock}>
                  <span className={styles.metaLabel}>KEYNOTE SPEAKERS</span>
                  <span className={styles.metaValue}>{evt.speakers.join(", ")}</span>
                </div>
              </div>

              <Link href={`/events#${evt.slug}`} className={styles.actionButton}>
                <span>VIEW SYMPOSIUM DETAILS & SCHEDULE</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
