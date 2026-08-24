import React from "react";
import Link from "next/link";
import styles from "./PageShell.module.css";

interface PageShellProps {
  title: string;
  categoryTag: string;
  description: string;
  breadcrumbLabel: string;
  provenanceCode?: string;
  children: React.ReactNode;
}

export function PageShell({
  title,
  categoryTag,
  description,
  breadcrumbLabel,
  provenanceCode = "STB28051-VERIFIED-V1",
  children,
}: PageShellProps) {
  return (
    <>
      {/* Editorial Header Section */}
      <section className={styles.headerSection} aria-label={`${title} Header`}>
        <div className="container">
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb Navigation">
            <Link href="/" className={styles.breadcrumbLink}>
              IEEE SVCE
            </Link>
            <span className={styles.separator}>/</span>
            <span className={styles.currentBreadcrumb}>{breadcrumbLabel}</span>
          </nav>

          <div className={styles.headingArea}>
            <span className={styles.tagline}>{categoryTag}</span>
            <h1 className={styles.pageTitle}>{title}</h1>
            <p className={styles.pageDescription}>{description}</p>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.provenanceStamp}>
              <span aria-hidden="true">◈</span>
              <span>VERIFIED INSTITUTIONAL SHELL: {provenanceCode}</span>
            </div>
            <div>STATUS: PUBLIC DIGITAL EXPERIENCE // SESSION 2026/27</div>
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className={styles.contentSection}>
        <div className="container">{children}</div>
      </div>
    </>
  );
}
