import React from "react";
import Link from "next/link";
import { BRANCH_PROJECTS } from "@/lib/data/branch-data";
import styles from "./HomeBuilds.module.css";

export function HomeBuilds() {
  return (
    <section className={styles.section} aria-label="What IEEE SVCE Builds">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>04 // WHAT IEEE SVCE BUILDS</span>
          </div>
          <h2 className={styles.title}>Living Lab Innovation & Prototypes</h2>
          <p className={styles.desc}>
            Undergraduate engineering working groups developing hardware-accelerated AI, self-healing disaster mesh radios, and open-source biosignal shields.
          </p>
        </div>

        <div className={styles.grid}>
          {BRANCH_PROJECTS.map((proj) => (
            <div key={proj.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.domainBadge}>[ {proj.domain} ]</span>
                <span className={styles.statusPill}>● {proj.status.replace("_", " ")}</span>
              </div>

              <h3 className={styles.projectTitle}>{proj.title}</h3>
              <p className={styles.problemText}>{proj.problem}</p>

              <div className={styles.resultsBox}>
                <span className={styles.resLabel}>EXPERIMENTAL RESULT:</span>
                <p className={styles.resVal}>{proj.results}</p>
              </div>

              <div className={styles.techList}>
                {proj.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.provenanceTag}>{proj.provenance}</span>
                <Link href={`/innovation#${proj.slug}`} className={styles.linkAction} data-cursor="INSPECT">
                  <span>FULL ARCHITECTURE</span>
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
