import React from "react";
import Link from "next/link";
import { BRANCH_PROJECTS, COMMUNITY_ACHIEVEMENTS, BRANCH_EVENTS } from "@/lib/data/branch-data";
import styles from "./HomeHighlights.module.css";

export function HomeHighlights() {
  const featuredProject = BRANCH_PROJECTS[0];
  const featuredAchievement = COMMUNITY_ACHIEVEMENTS[0];
  const pastEvent = BRANCH_EVENTS.find((e) => e.status === "PAST");

  return (
    <section className={styles.highlightsSection} aria-label="Institutional Highlights">
      <div className="container">
        <div className={styles.headerArea}>
          <span className={styles.tagline}>{"// FIELD SIGNALS & RESEARCH"}</span>
          <h2 className={styles.heading}>Institutional Spotlights</h2>
          <p className={styles.subHeading}>
            Direct transmissions from the student innovation labs, national competitive tracks, and
            IEEE Section laurels.
          </p>
        </div>

        <div className={styles.highlightsGrid}>
          {/* Innovation Project Spotlight */}
          {featuredProject && (
            <div className={styles.highlightCard}>
              <div className={styles.cardTop}>
                <span className={styles.badgePrimary}>LIVING LAB // INNOVATION</span>
                <span className={styles.statusTag}>{featuredProject.status}</span>
              </div>

              <div className={styles.cardContent}>
                <span className={styles.domainTag}>{featuredProject.domain}</span>
                <h3 className={styles.cardTitle}>{featuredProject.title}</h3>
                <p className={styles.cardDescription}>{featuredProject.problem}</p>
                <div className={styles.resultsBox}>
                  <span className={styles.resultsLabel}>VALIDATED RESULT:</span>
                  <span className={styles.resultsValue}>{featuredProject.results}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.techPills}>
                  {featuredProject.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/innovation#${featuredProject.slug}`}
                  className={styles.actionBtn}
                  data-cursor="INSPECT"
                >
                  <span>FULL SPECS</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}

          {/* Student Achievement / Laurel */}
          {featuredAchievement && (
            <div className={styles.highlightCard}>
              <div className={styles.cardTop}>
                <span className={styles.badgeSuccess}>CONFERRED LAUREL</span>
                <span className={styles.statusTag}>{featuredAchievement.year}</span>
              </div>

              <div className={styles.cardContent}>
                <span className={styles.domainTag}>{featuredAchievement.awardedBy}</span>
                <h3 className={styles.cardTitle}>{featuredAchievement.title}</h3>
                <p className={styles.cardDescription}>{featuredAchievement.summary}</p>
                <div className={styles.citationBox}>
                  <span className={styles.citationLabel}>CONFERRAL CITATION:</span>
                  <span className={styles.citationValue}>{featuredAchievement.citation}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.provenanceTag}>{featuredAchievement.provenance}</span>
                <Link href="/community" className={styles.actionBtn} data-cursor="VIEW">
                  <span>PROOF WALL</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}

          {/* Recent/Past Event Retrospective */}
          {pastEvent && (
            <div className={styles.highlightCard}>
              <div className={styles.cardTop}>
                <span className={styles.badgeArchive}>EVENT RETROSPECTIVE</span>
                <span className={styles.statusTag}>CONCLUDED</span>
              </div>

              <div className={styles.cardContent}>
                <span className={styles.domainTag}>{pastEvent.date}</span>
                <h3 className={styles.cardTitle}>{pastEvent.title}</h3>
                <p className={styles.cardDescription}>{pastEvent.abstract}</p>
                {pastEvent.winners && pastEvent.winners.length > 0 && (
                  <div className={styles.winnersBox}>
                    <span className={styles.winnerHeading}>FIRST PLACE LAUREATE:</span>
                    <span className={styles.winnerDetail}>
                      {pastEvent.winners[0].team} ({pastEvent.winners[0].institution}) —{" "}
                      {pastEvent.winners[0].project}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.provenanceTag}>{pastEvent.provenance}</span>
                <Link
                  href={`/events/${pastEvent.slug}`}
                  className={styles.actionBtn}
                  data-cursor="REPORT"
                >
                  <span>EVENT DOSSIER</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
