import React from "react";
import Link from "next/link";
import { FEATURED_NOW_EVENT, BRANCH_EVENTS } from "@/lib/data/branch-data";
import styles from "./HomeHappening.module.css";

export function HomeHappening() {
  const upcomingEvents = BRANCH_EVENTS.filter((e) => e.status === "UPCOMING").slice(0, 2);

  return (
    <section className={styles.section} aria-label="What's Happening Now at IEEE SVCE">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>02 // WHAT&apos;S HAPPENING</span>
          </div>
          <h2 className={styles.title}>Active Calendar & Symposia</h2>
          <p className={styles.desc}>
            Flagship technical assemblies, 24-hour hardware hackathons, and laboratory workshop
            series.
          </p>
        </div>

        {/* Featured Flagship Event Card */}
        <div className={styles.featuredGrid}>
          <div className={styles.flagshipCard}>
            <div className={styles.cardHeader}>
              <div className={styles.statusPill}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span>UPCOMING FLAGSHIP SYMPOSIUM</span>
              </div>
              <span className={styles.trackCode}>[ {FEATURED_NOW_EVENT.track} ]</span>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.dateBadge}>{FEATURED_NOW_EVENT.date}</span>
              <h3 className={styles.eventTitle}>{FEATURED_NOW_EVENT.title}</h3>
              <p className={styles.eventSubtitle}>{FEATURED_NOW_EVENT.subtitle}</p>
              <p className={styles.eventAbstract}>{FEATURED_NOW_EVENT.abstract}</p>

              <div className={styles.logisticsBar}>
                <div className={styles.logisticItem}>
                  <span className={styles.logLabel}>TIME:</span>
                  <span className={styles.logVal}>{FEATURED_NOW_EVENT.time}</span>
                </div>
                <div className={styles.logisticItem}>
                  <span className={styles.logLabel}>VENUE:</span>
                  <span className={styles.logVal}>{FEATURED_NOW_EVENT.venue}</span>
                </div>
                <div className={styles.logisticItem}>
                  <span className={styles.logLabel}>PROVENANCE:</span>
                  <span className={styles.logVal}>{FEATURED_NOW_EVENT.provenance}</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.tags}>
                {FEATURED_NOW_EVENT.tags.slice(0, 4).map((t) => (
                  <span key={t} className={styles.tag}>
                    #{t}
                  </span>
                ))}
              </div>
              <div className={styles.actions}>
                <Link
                  href={`/events/${FEATURED_NOW_EVENT.slug}`}
                  className={styles.dossierBtn}
                  data-cursor="DOSSIER"
                >
                  <span>FULL PROGRAM DOSSIER</span>
                  <span aria-hidden="true">→</span>
                </Link>
                {FEATURED_NOW_EVENT.registrationOpen && (
                  <Link
                    href={FEATURED_NOW_EVENT.registrationUrl || "/contact"}
                    className={styles.registerBtn}
                    data-cursor="REGISTER"
                  >
                    REGISTER NOW
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Secondary Parallel Event Cards */}
          <div className={styles.secondaryList}>
            {upcomingEvents.slice(1).map((evt) => (
              <div key={evt.id} className={styles.secondaryCard}>
                <div className={styles.secHeader}>
                  <span className={styles.secTrack}>[ {evt.track} ]</span>
                  <span className={styles.secDate}>{evt.date}</span>
                </div>
                <h4 className={styles.secTitle}>{evt.title}</h4>
                <p className={styles.secAbstract}>{evt.abstract}</p>
                <div className={styles.secFooter}>
                  <span className={styles.secVenue}>{evt.venue}</span>
                  <Link href={`/events/${evt.slug}`} className={styles.secLink} data-cursor="VIEW">
                    <span>VIEW DETAILS</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
