import React from "react";
import Link from "next/link";
import styles from "./CuriositySection.module.css";

const CURIOSITY_ITEMS = [
  {
    index: "01",
    tag: "CALENDAR",
    title: "EVENTS",
    href: "/events",
    description:
      "Flagship national symposia, 24-hour hardware hackathons, and multi-track IEEE society workshops.",
    cta: "EXPLORE CALENDAR",
  },
  {
    index: "02",
    tag: "STUDENT LABS",
    title: "INNOVATION",
    href: "/innovation",
    description:
      "Open-source micro-ML firmware, low-power LoRa mesh nodes, and student-engineered hardware prototypes.",
    cta: "EXPLORE LABS & RESEARCH",
  },
  {
    index: "03",
    tag: "PERMANENT RECORD",
    title: "ARCHIVE",
    href: "/archive",
    description:
      "Foundational 1994 charter, historical ExeCom ledgers, and three decades of documented student achievements.",
    cta: "ENTER HISTORICAL VAULT",
  },
  {
    index: "04",
    tag: "GOVERNANCE",
    title: "PEOPLE",
    href: "/people",
    description:
      "Senior IEEE faculty counselors, chapter chairs, student executive committee, and alumni technical mentors.",
    cta: "MEET BRANCH LEADERSHIP",
  },
];

export function CuriositySection() {
  return (
    <section className={styles.section} aria-label="Curiosity & Exploration Portals">
      <div className="container">
        <div className={styles.headerArea}>
          <span className={styles.sectionTag}>{"// PATHWAYS TO KNOWLEDGE"}</span>
          <h2 className={styles.heading}>Explore Institutional Dimensions</h2>
          <p className={styles.subHeading}>
            Curated entry points into research, events, archives, and governance.
          </p>
        </div>

        <div className={styles.invitationGrid}>
          {CURIOSITY_ITEMS.map((item) => (
            <Link key={item.title} href={item.href} className={styles.curiosityCard}>
              <div className={styles.cardTop}>
                <span className={styles.cardIndex}>[ {item.index} ]</span>
                <span className={styles.cardCategory}>{item.tag}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <span>{item.cta}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
