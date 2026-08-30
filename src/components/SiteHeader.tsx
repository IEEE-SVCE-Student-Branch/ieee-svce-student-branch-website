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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          {/* Primary IEEE SVCE Coherent Home Brand Lockup */}
          <Link
            href="/"
            className={styles.brandLockup}
            aria-label="IEEE SVCE Student Branch — Home"
            data-cursor="HOME"
          >
            <div className={styles.ieeeMarkWrapper}>
              <Image
                src="/ieee.svg"
                alt="IEEE Official Mark"
                width={80}
                height={80}
                priority
                className={styles.ieeeLogo}
              />
            </div>
            <div className={styles.brandDivider} aria-hidden="true" />
            <div className={styles.svceMarkWrapper}>
              <Image
                src="/svce.svg"
                alt="SVCE Official Mark"
                width={110}
                height={54}
                priority
                className={styles.svceLogo}
              />
            </div>
            <div className={styles.brandMetaBlock}>
              <span className={styles.brandTitle}>IEEE SVCE</span>
              <span className={styles.brandSubtitle}>STUDENT BRANCH</span>
            </div>
          </Link>

          {/* Right: Search & Explore Controls */}
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
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className={styles.searchLabel}>SEARCH</span>
              <span className={styles.kbd}>⌘K</span>
            </button>

            <button
              type="button"
              className={styles.exploreBtn}
              onClick={() => setIsExploreOpen(true)}
              aria-label="Open Explore Navigation Directory"
              aria-expanded={isExploreOpen}
              aria-controls="explore-menu-dialog"
              data-cursor="EXPLORE"
            >
              <div className={styles.exploreMatrix} aria-hidden="true">
                <span className={styles.matrixDot} />
                <span className={styles.matrixDot} />
                <span className={styles.matrixDot} />
                <span className={styles.matrixDot} />
                <span className={styles.matrixDot} />
                <span className={styles.matrixDot} />
                <span className={styles.matrixDot} />
                <span className={styles.matrixDot} />
                <span className={styles.matrixDot} />
              </div>
              <span className={styles.exploreText}>EXPLORE</span>
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
