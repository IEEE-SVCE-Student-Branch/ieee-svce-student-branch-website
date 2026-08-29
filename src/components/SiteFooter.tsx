import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BRANCH_STATS } from "@/lib/data/branch-data";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Institutional Footer">
      <div className="container">
        {/* Flagship IEEE Global Membership Call-to-Action Panel */}
        <div className={styles.membershipBanner}>
          <div className={styles.membershipContent}>
            <div className={styles.membershipBadge}>
              <span className={styles.membershipDot} />
              <span>GLOBAL PROFESSIONAL AFFILIATION</span>
            </div>
            <h2 className={styles.membershipHeading}>
              Join IEEE — The World&apos;s Largest Technical Professional Organization
            </h2>
            <p className={styles.membershipText}>
              Access IEEE Xplore Digital Library, global conference discounts, career
              certifications, technical society memberships, and networking opportunities across
              160+ countries.
            </p>
          </div>
          <div className={styles.membershipAction}>
            <a
              href="https://www.ieee.org/membership/join/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.joinIeeeBtn}
              data-cursor="JOIN IEEE"
            >
              <span>JOIN IEEE OFFICIAL</span>
              <span className={styles.externalIcon}>↗</span>
            </a>
            <span className={styles.officialNotice}>Official IEEE Global Destination</span>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Brand Identity & Official Logos */}
          <div className={styles.brandColumn}>
            <div className={styles.brandLogos}>
              <Image
                src="/brand/svce-emblem.png"
                alt="SVCE Emblem"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.logoTitle}>IEEE SVCE</div>
            <div className={styles.branchMeta}>
              IEEE STUDENT BRANCH // EST. {BRANCH_STATS.establishedYear}
            </div>
            <p className={styles.brandDescription}>
              A permanent digital institution for engineering precision, technical dissemination,
              student leadership, and archival memory at Sri Venkateswara College of Engineering.
            </p>
            <div className={styles.provenanceBadge}>
              <span aria-hidden="true">◈</span>
              <span>AFFILIATION: IEEE REGION 10 / MADRAS SECTION</span>
            </div>
          </div>

          {/* Core Institution */}
          <div className={styles.navColumn}>
            <div className={styles.columnHeading}>Core Institution</div>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.footerLink} data-cursor="HOME">
                  Home (Signal Field)
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink} data-cursor="ABOUT">
                  About & History (Blueprint)
                </Link>
              </li>
              <li>
                <Link href="/team" className={styles.footerLink} data-cursor="TEAM">
                  Team & ExeCom (Constellation)
                </Link>
              </li>
              <li>
                <Link href="/partners" className={styles.footerLink} data-cursor="PARTNERS">
                  Partners & Sponsors (Network)
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink} data-cursor="CONTACT">
                  Contact Desk (Coordinates)
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Programs & Knowledge */}
          <div className={styles.navColumn}>
            <div className={styles.columnHeading}>Programs & Knowledge</div>
            <ul className={styles.linkList}>
              <li>
                <Link href="/events" className={styles.footerLink} data-cursor="EVENTS">
                  Technical Events (Event Field)
                </Link>
              </li>
              <li>
                <Link href="/innovation" className={styles.footerLink} data-cursor="INNOVATION">
                  Innovation & Labs (Living Lab)
                </Link>
              </li>
              <li>
                <Link href="/learn" className={styles.footerLink} data-cursor="LEARN">
                  Learn & Resources (Knowledge Field)
                </Link>
              </li>
              <li>
                <Link href="/certificates" className={styles.footerLink} data-cursor="VERIFY">
                  Certificates (Credential Vault)
                </Link>
              </li>
            </ul>
          </div>

          {/* Community, Media & Reports */}
          <div className={styles.navColumn}>
            <div className={styles.columnHeading}>Community & Records</div>
            <ul className={styles.linkList}>
              <li>
                <Link href="/community" className={styles.footerLink} data-cursor="COMMUNITY">
                  Community & Laurels (Proof Wall)
                </Link>
              </li>
              <li>
                <Link href="/media" className={styles.footerLink} data-cursor="MEDIA">
                  Media Chronicle (Light Table)
                </Link>
              </li>
              <li>
                <Link href="/reports" className={styles.footerLink} data-cursor="REPORTS">
                  Institutional Reports (Dossier)
                </Link>
              </li>
              <li>
                <Link href="/archive" className={styles.footerLink} data-cursor="ARCHIVE">
                  Historical Vault (Time Machine)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className={styles.bottomBar}>
          <div>
            © {new Date().getFullYear()} IEEE SVCE STUDENT BRANCH (STB 28051). ALL RIGHTS RESERVED.
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/about" className={styles.footerLink}>
              CONSTITUTION
            </Link>
            <Link href="/certificates" className={styles.footerLink}>
              VERIFY CERTIFICATES
            </Link>
            <Link href="/contact" className={styles.footerLink}>
              OFFICIAL INQUIRIES
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
