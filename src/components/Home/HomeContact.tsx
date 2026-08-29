import React from "react";
import Link from "next/link";
import { BRANCH_STATS } from "@/lib/data/branch-data";
import styles from "./HomeContact.module.css";

export function HomeContact() {
  return (
    <section className={styles.section} aria-label="Official Contact Desks & Coordinates">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div className={styles.tagline}>
            <span className={styles.marker}>{"//"}</span>
            <span>10 // CONTACT & COORDINATES</span>
          </div>
          <h2 className={styles.title}>Institutional Inquiries & Location</h2>
          <p className={styles.desc}>
            Permanent communication channels for student membership, Section correspondence, industry collaborations, and faculty research.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Coordinates & Physical Address */}
          <div className={styles.coordsCard}>
            <span className={styles.cardTag}>OFFICIAL BRANCH DESK</span>
            <h3 className={styles.coordsTitle}>IEEE SVCE Student Branch</h3>
            <p className={styles.coordsSub}>
              Student Branch Code: {BRANCH_STATS.branchCode} {"//"} Est. {BRANCH_STATS.establishedYear}
            </p>

            <div className={styles.detailRow}>
              <span className={styles.dLabel}>PHYSICAL LOCATION:</span>
              <p className={styles.dVal}>{BRANCH_STATS.location}</p>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.dLabel}>COORDINATES:</span>
              <p className={styles.dValMono}>{BRANCH_STATS.coordinates}</p>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.dLabel}>OFFICIAL EMAIL:</span>
              <a href={`mailto:${BRANCH_STATS.officialEmail}`} className={styles.emailLink}>
                {BRANCH_STATS.officialEmail}
              </a>
            </div>

            <div className={styles.coordsFooter}>
              <Link href="/contact" className={styles.contactBtn} data-cursor="TRANSMIT">
                <span>OPEN OFFICIAL TRANSMISSION DESK</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Inquiry Channels */}
          <div className={styles.channelsCard}>
            <span className={styles.cardTag}>TRANSMISSION DESKS</span>
            <div className={styles.channelsList}>
              <div className={styles.chanItem}>
                <h4 className={styles.chanTitle}>General & Student Membership</h4>
                <p className={styles.chanDesc}>
                  Inquiries regarding IEEE global membership, IEEE SVCE onboarding, and student benefits.
                </p>
              </div>
              <div className={styles.chanItem}>
                <h4 className={styles.chanTitle}>Symposium & Flagship Collaborations</h4>
                <p className={styles.chanDesc}>
                  Event sponsorships, keynote speaker invitations, and national hackathon partnerships.
                </p>
              </div>
              <div className={styles.chanItem}>
                <h4 className={styles.chanTitle}>Living Lab & Research Mentorship</h4>
                <p className={styles.chanDesc}>
                  Collaborative industry problem statements and equipment grants for student engineering working groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
