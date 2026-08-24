"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExploreMenu } from "./ExploreMenu";
import { SearchModal } from "./SearchModal";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          {/* Official Brand Lockup */}
          <Link
            href="/"
            className={styles.brandLockup}
            aria-label="IEEE SVCE Digital Institution Homepage"
            data-cursor="SIGNAL"
          >
            <div className={styles.brandLogoGroup}>
              <Image
                src="/brand/svce-emblem.png"
                alt="SVCE Emblem"
                width={32}
                height={32}
                className={styles.emblem}
              />
            </div>
            <div className={styles.brandTitles}>
              <span className={styles.brandMain}>IEEE SVCE</span>
              <span className={styles.brandTagline}>THE LIVING INSTITUTION // STB 28051</span>
            </div>
          </Link>

          {/* Live Signal Telemetry */}
          <div className={styles.liveTelemetryBadge}>
            <span className={styles.signalDot} aria-hidden="true" />
            <span>SIGNAL FIELD ACTIVE // 2026/27</span>
          </div>

          {/* Search & Explore Controls */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.searchBtn}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Institutional Records (Cmd+K)"
              data-cursor="SEARCH"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>SEARCH</span>
              <span className={styles.kbd}>⌘K</span>
            </button>

            <button
              type="button"
              className={styles.exploreBtn}
              onClick={() => setIsExploreOpen(true)}
              aria-label="Open Explore Navigation Directory"
              aria-expanded={isExploreOpen}
              data-cursor="EXPLORE"
            >
              <div className={styles.exploreIcon} aria-hidden="true">
                <span className={styles.exploreBar} />
                <span className={styles.exploreBar} />
                <span className={styles.exploreBar} />
              </div>
              <span>EXPLORE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlays */}
      <ExploreMenu isOpen={isExploreOpen} onClose={() => setIsExploreOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
