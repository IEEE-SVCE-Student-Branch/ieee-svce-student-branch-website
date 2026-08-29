import React from "react";
import Link from "next/link";
import { BRANCH_STATS, BRANCH_ANNOUNCEMENTS } from "@/lib/data/branch-data";
import styles from "./HomePulse.module.css";

export function HomePulse() {
  return (
    <section className={styles.pulseSection} aria-label="Institutional Pulse and Announcements">
      <div className="container">
        <div className={styles.grid}>
          {/* Current Session Telemetry */}
          <div className={styles.sessionCard}>
            <div className={styles.cardHeader}>
              <span className={styles.signalBadge}>
                <span className={styles.liveDot} aria-hidden="true" />
                SESSION // {BRANCH_STATS.currentSession}
              </span>
              <span className={styles.codeTag}>{BRANCH_STATS.branchCode}</span>
            </div>

            <div className={styles.sessionBody}>
              <h2 className={styles.sessionTitle}>Institutional Baseline</h2>
              <p className={styles.sessionDesc}>
                Governed under IEEE Region 10 and IEEE Madras Section. Continuous operation
                since August 1994, advancing student research and humanitarian technology.
              </p>

              <div className={styles.telemetryMetrics}>
                <div className={styles.metricItem}>
                  <span className={styles.metricVal}>{BRANCH_STATS.activeChapters}</span>
                  <span className={styles.metricLabel}>SOCIETAL CHAPTERS</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricVal}>{BRANCH_STATS.affinityGroups}</span>
                  <span className={styles.metricLabel}>AFFINITY GROUP</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricVal}>{BRANCH_STATS.verifiedMembers}</span>
                  <span className={styles.metricLabel}>VERIFIED MEMBERS</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricVal}>30+</span>
                  <span className={styles.metricLabel}>YEARS ARCHIVE</span>
                </div>
              </div>
            </div>

            <div className={styles.sessionFooter}>
              <Link href="/team" className={styles.linkAction} data-cursor="VIEW">
                <span>VIEW EXECUTIVE COMMITTEE</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Institutional Announcements Stream */}
          <div className={styles.announcementsCard}>
            <div className={styles.cardHeader}>
              <span className={styles.announcementTag}>
                <span>{"//"}</span>
                <span>DISPATCH & ANNOUNCEMENTS</span>
              </span>
              <span className={styles.provenanceBadge}>vTools LOGGED</span>
            </div>

            <div className={styles.announcementsList}>
              {BRANCH_ANNOUNCEMENTS.map((item) => (
                <div key={item.id} className={styles.announcementItem}>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemCategory}>[ {item.category} ]</span>
                    <span className={styles.itemDate}>{item.date}</span>
                  </div>
                  <h3 className={styles.itemTitle}>
                    {item.link ? (
                      <Link href={item.link} className={styles.itemLink} data-cursor="OPEN">
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className={styles.itemSummary}>{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
