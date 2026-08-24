"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FEATURED_NOW_EVENT, FEATURED_MEMORY_ITEM, BRANCH_PROJECTS, COMMUNITY_ACHIEVEMENTS } from "@/lib/data/branch-data";
import styles from "./SignalFieldSwitch.module.css";

type ModeState = "NOW" | "MEMORY";

export function SignalFieldSwitch() {
  const [mode, setMode] = useState<ModeState>("NOW");

  return (
    <section
      className={`${styles.section} ${mode === "NOW" ? styles.nowMode : styles.memoryMode}`}
      aria-label="Institutional Signal Switch"
    >
      <div className="container">
        {/* Central State Switch Bar */}
        <div className={styles.headerContainer}>
          <div
            className={styles.stateSwitchWrapper}
            role="tablist"
            aria-label="Field Temporal State Switch"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "NOW"}
              className={`${styles.switchOption} ${mode === "NOW" ? styles.switchActiveNow : ""}`}
              onClick={() => setMode("NOW")}
              data-cursor="NOW"
            >
              ● NOW // ACTIVE FIELD
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "MEMORY"}
              className={`${styles.switchOption} ${mode === "MEMORY" ? styles.switchActiveMemory : ""}`}
              onClick={() => setMode("MEMORY")}
              data-cursor="MEMORY"
            >
              ◈ MEMORY // INSTITUTIONAL VAULT
            </button>
          </div>

          <h2 className={styles.fieldTitle}>
            {mode === "NOW"
              ? "Live Technical Programs & Active Research"
              : "Permanent Archive, Accolades & 1994 Charter"}
          </h2>
          <p className={styles.fieldSubtitle}>
            {mode === "NOW"
              ? "Real-time symposium beacons, student embedded ML prototypes, and upcoming laboratory dispatches."
              : "Three decades of verified institutional milestones, Region 10 paper accolades, and immutable ledgers."}
          </p>
        </div>

        {/* Dynamic Dual-Mode Grid */}
        <div className={styles.fieldGrid}>
          {mode === "NOW" ? (
            <>
              {/* NOW Mode: Primary Marquee Beacon */}
              <div className={styles.featuredCard}>
                <div>
                  <div className={styles.cardTopMeta}>
                    <div className={`${styles.statusTag} ${styles.nowTag}`}>
                      <span aria-hidden="true">●</span>
                      <span>FEATURED NOW // MARQUEE SYMPOSIUM</span>
                    </div>
                    <span className={styles.provenanceStamp}>
                      {FEATURED_NOW_EVENT.provenance}
                    </span>
                  </div>

                  <div className={styles.cardBody} style={{ marginTop: "1.25rem" }}>
                    <span className={styles.cardScope}>[ {FEATURED_NOW_EVENT.track} ]</span>
                    <h3 className={styles.cardTitle}>{FEATURED_NOW_EVENT.title}</h3>
                    <p className={styles.cardSubtitle}>{FEATURED_NOW_EVENT.subtitle}</p>
                    <p className={styles.cardDescription}>{FEATURED_NOW_EVENT.abstract}</p>

                    <div className={styles.metaInfoBlock}>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>DATE & TIME</span>
                        <span className={styles.infoValue}>{FEATURED_NOW_EVENT.date}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>VENUE</span>
                        <span className={styles.infoValue}>{FEATURED_NOW_EVENT.venue}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>PROGRAM TRACKS</span>
                        <span className={styles.infoValue}>4 Technical Domains</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/events/${FEATURED_NOW_EVENT.slug}`}
                    className={styles.ctaBtn}
                    data-cursor="OPEN"
                  >
                    <span>EXPLORE SYMPOSIUM DOSSIER</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {/* NOW Mode: Active Working Labs Stream */}
              <div className={styles.secondaryColumn}>
                <div className={styles.signalItem}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemBadge}>ACTIVE LAB // TINYML</span>
                    <span className={styles.itemDate}>2025–2026</span>
                  </div>
                  <h4 className={styles.itemTitle}>{BRANCH_PROJECTS[0].title}</h4>
                  <p className={styles.itemDescription}>{BRANCH_PROJECTS[0].problem}</p>
                  <Link
                    href="/innovation"
                    className={styles.itemAction}
                    data-cursor="LABS"
                  >
                    <span>VIEW RESEARCH LAB →</span>
                  </Link>
                </div>

                <div className={styles.signalItem}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemBadge}>SPECIAL INTEREST GROUP</span>
                    <span className={styles.itemDate}>2025</span>
                  </div>
                  <h4 className={styles.itemTitle}>{BRANCH_PROJECTS[1].title}</h4>
                  <p className={styles.itemDescription}>{BRANCH_PROJECTS[1].problem}</p>
                  <Link
                    href="/innovation"
                    className={styles.itemAction}
                    data-cursor="LABS"
                  >
                    <span>VIEW LAB SCHEMATIC →</span>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* MEMORY Mode: Historical Charter & Milestone */}
              <div className={styles.featuredCard}>
                <div>
                  <div className={styles.cardTopMeta}>
                    <div className={`${styles.statusTag} ${styles.memoryTag}`}>
                      <span aria-hidden="true">◈</span>
                      <span>PERMANENT VAULT // SECTION LAUREL</span>
                    </div>
                    <span className={styles.provenanceStamp}>
                      {FEATURED_MEMORY_ITEM.provenance}
                    </span>
                  </div>

                  <div className={styles.cardBody} style={{ marginTop: "1.25rem" }}>
                    <span className={styles.cardScope}>[ {FEATURED_MEMORY_ITEM.recordType} ]</span>
                    <h3 className={styles.cardTitle}>{FEATURED_MEMORY_ITEM.title}</h3>
                    <p className={styles.cardSubtitle}>Historical Record // Year {FEATURED_MEMORY_ITEM.year}</p>
                    <p className={styles.cardDescription}>{FEATURED_MEMORY_ITEM.summary}</p>

                    <div className={styles.metaInfoBlock}>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>CITATION</span>
                        <span className={styles.infoValue}>{FEATURED_MEMORY_ITEM.citation}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>CONFERRING BODY</span>
                        <span className={styles.infoValue}>IEEE Madras Section (Region 10)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href="/community"
                    className={`${styles.ctaBtn} ${styles.ctaBtnMemory}`}
                    data-cursor="VAULT"
                  >
                    <span>ENTER ACCOLADES ARCHIVE</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {/* MEMORY Mode: Historical Records Stream */}
              <div className={styles.secondaryColumn}>
                <div className={styles.signalItem}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemBadge} style={{ color: "#6366f1", background: "rgba(99, 102, 241, 0.1)" }}>
                      ORIGINAL CHARTER
                    </span>
                    <span className={styles.itemDate}>1994</span>
                  </div>
                  <h4 className={styles.itemTitle}>Charter of IEEE SVCE Student Branch STB 28051</h4>
                  <p className={styles.itemDescription}>
                    Official IEEE foundation charter establishing the branch under IEEE Region 10 and Madras Section.
                  </p>
                  <Link
                    href="/archive"
                    className={styles.itemAction}
                    style={{ color: "#6366f1" }}
                    data-cursor="ARCHIVE"
                  >
                    <span>INSPECT 1994 CHARTER →</span>
                  </Link>
                </div>

                <div className={styles.signalItem}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemBadge} style={{ color: "#6366f1", background: "rgba(99, 102, 241, 0.1)" }}>
                      REGION 10 LAUREL
                    </span>
                    <span className={styles.itemDate}>{COMMUNITY_ACHIEVEMENTS[0].year}</span>
                  </div>
                  <h4 className={styles.itemTitle}>{COMMUNITY_ACHIEVEMENTS[0].title}</h4>
                  <p className={styles.itemDescription}>{COMMUNITY_ACHIEVEMENTS[0].summary}</p>
                  <Link
                    href="/community"
                    className={styles.itemAction}
                    style={{ color: "#6366f1" }}
                    data-cursor="VAULT"
                  >
                    <span>VIEW CITATION RECORD →</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
