import React from "react";
import Link from "next/link";
import styles from "./BranchPulse.module.css";

const ACTIVE_CHAPTERS = [
  {
    name: "IEEE Computer Society Chapter",
    scope: "Edge AI, Cyber-Physical Systems & High-Performance Computing",
    status: "ACTIVE LAB",
  },
  {
    name: "IEEE Power & Energy Society (PES)",
    scope: "Smart Grids, Micro-Inverters & High Voltage Protection",
    status: "COLLOQUIUM",
  },
  {
    name: "IEEE Robotics & Automation Cluster",
    scope: "Autonomous Navigation, Hardware ROS & TinyML",
    status: "INCUBATING",
  },
  {
    name: "IEEE Women in Engineering (WIE) Affinity Group",
    scope: "Deep-Tech Research Mentorship & Leadership Summits",
    status: "ACTIVE FORUM",
  },
];

const DISPATCH_FEED = [
  {
    tag: "SYMPOSIUM",
    date: "OCT 2026",
    title: "Call for Papers & Hackathon Tracks Open for IMPULSE '26 National Symposium",
  },
  {
    tag: "RESEARCH",
    date: "SEP 2026",
    title: "Student Research Lab begins field trials for LoRa Edge-Vision Grid Monitor",
  },
  {
    tag: "ACCOLADE",
    date: "AUG 2026",
    title: "SVCE Student delegates honored at IEEE Madras Section Annual Congress",
  },
];

export function BranchPulse() {
  return (
    <section className={styles.section} aria-label="Branch Activity Pulse">
      <div className="container">
        <div className={styles.headerRow}>
          <div className={styles.titleGroup}>
            <span className={styles.sectionTag}>{"// SYSTEM MONITOR"}</span>
            <h2 className={styles.sectionHeading}>Branch Pulse</h2>
          </div>

          <div className={styles.liveIndicator}>
            <span className={styles.pulseDot} aria-hidden="true" />
            <span>TECHNICAL DISPATCH STREAM VERIFIED</span>
          </div>
        </div>

        <div className={styles.pulseGrid}>
          {/* Active Societies Card */}
          <div className={styles.chaptersCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Specialized Chapters & Affinity Wings</span>
              <span className={styles.cardCounter}>4 ACTIVE BODIES</span>
            </div>

            <div className={styles.chapterList}>
              {ACTIVE_CHAPTERS.map((chap) => (
                <div key={chap.name} className={styles.chapterItem}>
                  <div className={styles.chapterDetails}>
                    <span className={styles.chapterName}>{chap.name}</span>
                    <span className={styles.chapterScope}>{chap.scope}</span>
                  </div>
                  <span className={styles.statusPill}>{chap.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Dispatches Card */}
          <div className={styles.feedCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Institutional Dispatch Feed</span>
              <Link
                href="/events"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--color-primary)",
                }}
              >
                VIEW ALL →
              </Link>
            </div>

            <div className={styles.feedList}>
              {DISPATCH_FEED.map((item, idx) => (
                <div key={idx} className={styles.feedItem}>
                  <div className={styles.feedMeta}>
                    <span className={styles.feedTag}>{item.tag}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <div className={styles.feedTitle}>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
