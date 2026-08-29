import React from "react";
import Link from "next/link";
import { MEDIA_COLLECTIONS } from "@/lib/data/branch-data";
import styles from "./HomeMedia.module.css";

export function HomeMedia() {
  return (
    <section className={styles.section} aria-label="Visual Memory & Photographic Chronicle">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>07 // MEDIA & VISUAL MEMORY</span>
          </div>
          <h2 className={styles.title}>Photographic & Field Light Table</h2>
          <p className={styles.desc}>
            High-resolution visual archives: micro-soldering labs, robotics arenas, international
            guest colloquiua, and student committee chronicles.
          </p>
        </div>

        <div className={styles.lightTableGrid}>
          {MEDIA_COLLECTIONS.map((media) => (
            <div key={media.id} className={styles.mediaFrame}>
              <div className={styles.tablePlate}>
                <div className={styles.apertureGlow} />
                <div className={styles.aspectRatioBox}>
                  <div className={styles.categoryBadge}>[ {media.category} ]</div>
                  <div className={styles.countBadge}>{media.itemsCount} ARTIFACTS</div>
                </div>
              </div>

              <div className={styles.metaRow}>
                <div className={styles.titleArea}>
                  <span className={styles.dateTag}>{media.date}</span>
                  <h3 className={styles.mediaTitle}>{media.title}</h3>
                  <p className={styles.mediaDesc}>{media.description}</p>
                </div>
                <div className={styles.creditBlock}>
                  <span className={styles.creditLabel}>CREDIT:</span>
                  <span className={styles.creditVal}>{media.photographerCredit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.exploreAllRow}>
          <Link href="/media" className={styles.lightTableBtn} data-cursor="EXPLORE">
            <span>ENTER SPATIAL LIGHT TABLE</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
