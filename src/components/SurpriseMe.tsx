"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomDiscovery, DiscoveryItem } from "@/lib/data/discovery";
import styles from "./SurpriseMe.module.css";

export function SurpriseMe() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<DiscoveryItem | null>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);

  const handleSurpriseMe = () => {
    if (isDiscovering) return;
    setIsDiscovering(true);

    const item = getRandomDiscovery(selectedItem?.id);
    setSelectedItem(item);

    // Reveal item, then navigate to target route after 1200ms
    setTimeout(() => {
      router.push(item.route);
    }, 1200);
  };

  return (
    <section className={styles.section} aria-label="Serendipitous Discovery Engine">
      <div className="container">
        <div className={styles.box}>
          <div className={styles.badge}>{"// SIGNATURE INTERACTION"}</div>
          <h2 className={styles.heading}>SURPRISE ME</h2>
          <p className={styles.subHeading}>
            Discover IEEE SVCE through serendipity — randomly explore an event, innovation lab,
            institutional achievement, archive relic, or leadership story.
          </p>

          <button
            type="button"
            className={styles.triggerButton}
            onClick={handleSurpriseMe}
            disabled={isDiscovering}
            aria-label="Discover a random IEEE SVCE artifact"
          >
            <span className={styles.sparkleIcon} aria-hidden="true">
              ✦
            </span>
            <span>{isDiscovering ? "DISCOVERING..." : "DISCOVER IEEE SVCE"}</span>
          </button>

          {/* Reveal state animation overlay */}
          {selectedItem && isDiscovering && (
            <div
              className={styles.discoveryReveal}
              role="alert"
              aria-live="assertive"
              aria-label={`Discovered ${selectedItem.categoryLabel}: ${selectedItem.title}`}
            >
              <div className={styles.revealHeader}>
                <span aria-hidden="true">✓</span>
                <span>DISCOVERED</span>
              </div>
              <div className={styles.revealType}>[ {selectedItem.categoryLabel} ]</div>
              <div className={styles.revealTitle}>{selectedItem.title}</div>
              <div className={styles.navigatingNotice}>
                <div className={styles.loadingSpinner} aria-hidden="true" />
                <span>OPENING INSTITUTIONAL RECORD...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
