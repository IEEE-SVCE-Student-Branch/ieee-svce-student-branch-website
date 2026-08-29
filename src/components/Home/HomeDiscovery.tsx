"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DISCOVERY_CATALOG } from "@/lib/data/discovery";
import styles from "./HomeDiscovery.module.css";

type CategoryFilter = "ALL" | "event" | "project" | "achievement" | "person" | "article" | "media";

export function HomeDiscovery() {
  const [filter, setFilter] = useState<CategoryFilter>("ALL");

  const filteredItems = filter === "ALL" 
    ? DISCOVERY_CATALOG.slice(0, 6) 
    : DISCOVERY_CATALOG.filter((item) => item.category === filter);

  return (
    <section className={styles.section} aria-label="Semantic Discovery Grid">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>03 // DISCOVER</span>
          </div>
          <h2 className={styles.title}>Semantic Signal Explorer</h2>
          <p className={styles.desc}>
            Navigate interconnected artifacts across research prototypes, conference papers, student laurels, and archival chronicles.
          </p>
        </div>

        {/* Filter Chips */}
        <div className={styles.filterRow}>
          {[
            { id: "ALL", label: "ALL SIGNALS" },
            { id: "event", label: "EVENTS" },
            { id: "project", label: "INNOVATION" },
            { id: "achievement", label: "LAURELS" },
            { id: "person", label: "PEOPLE" },
            { id: "article", label: "RESOURCES" },
            { id: "media", label: "MEDIA" },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              className={`${styles.filterBtn} ${filter === btn.id ? styles.filterActive : ""}`}
              onClick={() => setFilter(btn.id as CategoryFilter)}
              data-cursor="FILTER"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Discovery Micro-Grid */}
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              className={styles.card}
              data-cursor="EXPLORE"
            >
              <div className={styles.cardTop}>
                <span className={styles.categoryBadge}>[ {item.categoryLabel} ]</span>
                <span className={styles.provenanceTag}>{item.provenance}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardSummary}>{item.summary}</p>
              <div className={styles.cardBottom}>
                <span className={styles.actionPrompt}>INSPECT ARTIFACT</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
