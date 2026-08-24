import React from "react";
import Link from "next/link";
import styles from "./CuriosityConstellation.module.css";

const CONSTELLATION_WORLDS = [
  {
    code: "WLD-01",
    world: "Event Field",
    title: "EVENTS",
    href: "/events",
    description:
      "Flagship national symposia, 24-hour hardware hackathons, and multi-track IEEE society workshops.",
    cta: "ENTER EVENT FIELD",
  },
  {
    code: "WLD-02",
    world: "Living Lab",
    title: "INNOVATION",
    href: "/innovation",
    description:
      "Open-source micro-ML firmware, low-power LoRa telemetry nodes, and student-engineered hardware prototypes.",
    cta: "ENTER LIVING LAB",
  },
  {
    code: "WLD-03",
    world: "Constellation",
    title: "TEAM",
    href: "/team",
    description:
      "Senior IEEE faculty counselors, chapter chairs, student executive committee officers, and domain leads.",
    cta: "ENTER CONSTELLATION",
  },
  {
    code: "WLD-04",
    world: "Credential Vault",
    title: "CERTIFICATES",
    href: "/certificates",
    description:
      "Public cryptographic verification portal for authenticated participant credentials and awards.",
    cta: "VERIFY CREDENTIALS",
  },
  {
    code: "WLD-05",
    world: "Proof Wall",
    title: "COMMUNITY",
    href: "/community",
    description:
      "Student laurels, Section recognitions, 30-year Hall of Fame, and active industry advisory connect.",
    cta: "EXPLORE COMMUNITY",
  },
  {
    code: "WLD-06",
    world: "Knowledge Field",
    title: "LEARN",
    href: "/learn",
    description:
      "Workshop slide decks (PPTs), LaTeX templates, interview preparation toolkits, and study guides.",
    cta: "ACCESS KNOWLEDGE",
  },
];

export function CuriosityConstellation() {
  return (
    <section className={styles.section} aria-label="Page Worlds Gateways">
      <div className="container">
        <div className={styles.headerArea}>
          <span className={styles.tagline}>{"// INSTITUTIONAL ARCHITECTURE"}</span>
          <h2 className={styles.heading}>Explore the Page Worlds</h2>
          <p className={styles.subHeading}>
            Direct portals connecting the signal field to specialized institutional dimensions.
          </p>
        </div>

        <div className={styles.grid}>
          {CONSTELLATION_WORLDS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={styles.constellationCard}
              data-cursor="PORTAL"
            >
              <div className={styles.cardTop}>
                <span className={styles.worldCode}>[ {item.code} ]</span>
                <span className={styles.worldTag}>{item.world}</span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
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
