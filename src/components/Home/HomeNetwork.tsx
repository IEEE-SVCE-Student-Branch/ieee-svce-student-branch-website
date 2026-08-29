import React from "react";
import Link from "next/link";
import { BRANCH_PARTNERS } from "@/lib/data/branch-data";
import styles from "./HomeNetwork.module.css";

export function HomeNetwork() {
  return (
    <section className={styles.section} aria-label="Institutional Partners & Section Governance">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>09 // PARTNERS & NETWORK</span>
          </div>
          <h2 className={styles.title}>IEEE Institutional Ecosystem</h2>
          <p className={styles.desc}>
            Operating under IEEE Region 10 and IEEE Madras Section governance alongside academic and
            industry collaborators.
          </p>
        </div>

        <div className={styles.grid}>
          {BRANCH_PARTNERS.map((p) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.typeBadge}>[ {p.type} ]</span>
                <span className={styles.statusDot}>● {p.status}</span>
              </div>
              <h3 className={styles.partnerName}>{p.name}</h3>
              <p className={styles.engagementText}>{p.engagement}</p>
              <div className={styles.cardBottom}>
                <span className={styles.regionTag}>{p.region}</span>
                <span className={styles.provTag}>{p.provenance}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.inquiryBox}>
          <div className={styles.inquiryContent}>
            <h4 className={styles.inquiryTitle}>Sponsor, Mentor or Collaborate with IEEE SVCE</h4>
            <p className={styles.inquiryDesc}>
              Connect with our student executive committee for symposium partnerships, hackathon
              problem statements, and laboratory sponsorship.
            </p>
          </div>
          <Link href="/partners" className={styles.inquiryBtn} data-cursor="CONNECT">
            <span>EXPLORE PARTNERSHIP NETWORK</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
