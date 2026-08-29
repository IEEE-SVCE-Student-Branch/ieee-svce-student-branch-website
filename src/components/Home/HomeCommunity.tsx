import React from "react";
import Link from "next/link";
import styles from "./HomeCommunity.module.css";

const COMMUNITY_METRICS = [
  { label: "FOUNDING YEAR", val: "1994", sub: "30+ Years Active" },
  { label: "VERIFIED ALUMNI", val: "2,400+", sub: "Global Engineering Network" },
  { label: "SOCIETAL CHAPTERS", val: "4 + 1 WIE", sub: "CS, PES, RAS, APS & WIE" },
  { label: "ANNUAL EVENTS", val: "35+", sub: "Symposia, Hackathons & Labs" },
];

export function HomeCommunity() {
  return (
    <section className={styles.section} aria-label="IEEE SVCE Community & Hall of Fame">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>08 // COMMUNITY & HALL OF FAME</span>
          </div>
          <h2 className={styles.title}>Student Branch Ecosystem</h2>
          <p className={styles.desc}>
            An interconnected society of student technologists, faculty researchers, alumni leaders, and global Section collaborators.
          </p>
        </div>

        {/* Metrics Row */}
        <div className={styles.metricsGrid}>
          {COMMUNITY_METRICS.map((m) => (
            <div key={m.label} className={styles.metricCard}>
              <span className={m.label === "FOUNDING YEAR" ? styles.valPrimary : styles.valAccent}>{m.val}</span>
              <span className={styles.mLabel}>{m.label}</span>
              <span className={styles.mSub}>{m.sub}</span>
            </div>
          ))}
        </div>

        {/* Community Pillars */}
        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>★</div>
            <h3 className={styles.pillarTitle}>Hall of Fame Stewardship</h3>
            <p className={styles.pillarDesc}>
              Honoring graduating Core ExeCom officers, project leads, and award recipients who shaped three decades of branch excellence.
            </p>
            <Link href="/community#hall-of-fame" className={styles.pillarLink} data-cursor="VIEW">
              <span>EXPLORE HALL OF FAME</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>⚡</div>
            <h3 className={styles.pillarTitle}>Industry Connect & Mentorship</h3>
            <p className={styles.pillarDesc}>
              Direct technical mentorship pipelines with engineering leaders from Texas Instruments, Schneider Electric, and Intel Labs.
            </p>
            <Link href="/community#industry-connect" className={styles.pillarLink} data-cursor="VIEW">
              <span>VIEW INDUSTRY PIPELINE</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
