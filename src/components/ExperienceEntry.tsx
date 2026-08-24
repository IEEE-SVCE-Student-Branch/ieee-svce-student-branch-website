import React from "react";
import Link from "next/link";
import styles from "./ExperienceEntry.module.css";

interface ExperienceEntryProps {
  category: string;
  metaText?: string;
  title: string;
  subtitle?: string;
  description: string;
  provenance?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function ExperienceEntry({
  category,
  metaText,
  title,
  subtitle,
  description,
  provenance,
  actionHref,
  actionLabel = "VIEW RECORD →",
}: ExperienceEntryProps) {
  return (
    <div className={styles.entry}>
      <div>
        <div className={styles.topBar}>
          <span className={styles.categoryBadge}>{category}</span>
          {metaText && <span className={styles.metaText}>{metaText}</span>}
        </div>

        <div className={styles.mainContent}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={styles.footerBar}>
        {provenance ? (
          <span className={styles.provenanceBadge}>PROVENANCE: {provenance}</span>
        ) : (
          <span />
        )}

        {actionHref && (
          <Link href={actionHref} className={styles.actionLink}>
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
