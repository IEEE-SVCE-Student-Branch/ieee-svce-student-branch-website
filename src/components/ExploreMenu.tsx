"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./ExploreMenu.module.css";

interface ExploreMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavGroup {
  category: string;
  items: {
    name: string;
    href: string;
    worldName: string;
    desc: string;
    badge?: string;
  }[];
}

/**
 * MANDATORY PRIMARY NAVIGATION (Locked Information Architecture):
 * 1. HOME (/)
 * 2. ABOUT (/about)
 * 3. TEAM (/team)
 * 4. EVENTS (/events)
 * 5. INNOVATION (/innovation)
 * 6. LEARN (/learn)
 * 7. COMMUNITY (/community)
 * 8. MEDIA (/media)
 * 9. PARTNERS (/partners)
 * 10. REPORTS (/reports)
 * 11. CERTIFICATES (/certificates)
 * 12. CONTACT (/contact)
 */
const NAVIGATION_GROUPS: NavGroup[] = [
  {
    category: "Core Institution & People",
    items: [
      {
        name: "HOME",
        href: "/",
        worldName: "Signal Field",
        desc: "Interactive signal field, real-time beacons & serendipitous discovery",
      },
      {
        name: "ABOUT",
        href: "/about",
        worldName: "Blueprint",
        desc: "Branch constitution, IEEE history since 1994, vision & membership benefits",
      },
      {
        name: "TEAM",
        href: "/team",
        worldName: "Constellation",
        desc: "Branch Counselor, Core ExeCom officers, chapter chairs & domain heads",
      },
      {
        name: "CONTACT",
        href: "/contact",
        worldName: "Coordinates",
        desc: "Official inquiry desk, geo coordinates, maps & collaboration channels",
      },
    ],
  },
  {
    category: "Technical Programs & Knowledge",
    items: [
      {
        name: "EVENTS",
        href: "/events",
        worldName: "Event Field",
        desc: "Flagship symposiums, hardware hackathons, schedules & speaker keynotes",
      },
      {
        name: "INNOVATION",
        href: "/innovation",
        worldName: "Living Lab",
        desc: "Student engineering labs, problem-solution architecture & GitHub demos",
      },
      {
        name: "LEARN",
        href: "/learn",
        worldName: "Knowledge Field",
        desc: "Workshop slide decks (PPTs), study toolkits, technical guides & interview prep",
      },
      {
        name: "CERTIFICATES",
        href: "/certificates",
        worldName: "Credential Vault",
        desc: "Public cryptographic verification interface for participant & winner credentials",
        badge: "VERIFY",
      },
    ],
  },
  {
    category: "Community, Media & Records",
    items: [
      {
        name: "COMMUNITY",
        href: "/community",
        worldName: "Proof Wall",
        desc: "Student achievements, Section laurels, Hall of Fame & Industry Connect",
      },
      {
        name: "MEDIA",
        href: "/media",
        worldName: "Light Table",
        desc: "Visual chronicles: workshops, arenas, guest lectures & behind-the-scenes",
      },
      {
        name: "PARTNERS",
        href: "/partners",
        worldName: "Network",
        desc: "Industry collaborators, technology sponsors & IEEE societal relationships",
      },
      {
        name: "REPORTS",
        href: "/reports",
        worldName: "Institutional Dossier",
        desc: "Audited annual branch digests, event reports & year-based PDF records",
      },
    ],
  },
];

export function ExploreMenu({ isOpen, onClose }: ExploreMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-over Drawer */}
      <div
        ref={menuRef}
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Institutional Navigation Directory"
      >
        <div className={styles.header}>
          <div className={styles.brandHeaderGroup}>
            <Image
              src="/brand/svce-emblem.png"
              alt="SVCE Emblem"
              width={28}
              height={28}
              style={{ objectFit: "contain" }}
            />
            <div className={styles.titleArea}>
              <span className={styles.label}>STB 28051 // DIRECTORY</span>
              <h2 className={styles.heading}>Institutional Navigation</h2>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation"
            data-cursor="CLOSE"
          >
            <span>CLOSE</span>
            <span aria-hidden="true">[ESC]</span>
          </button>
        </div>

        <nav className={styles.content} aria-label="Explore Directory">
          {NAVIGATION_GROUPS.map((group) => (
            <div key={group.category} className={styles.categoryGroup}>
              <div className={styles.categoryTitle}>
                <span>{"//"}</span>
                <span>{group.category}</span>
              </div>
              <div className={styles.navGrid}>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                      data-cursor="EXPLORE"
                    >
                      <div className={styles.linkHeader}>
                        <span className={styles.linkName}>{item.name}</span>
                        <span className={styles.worldTag}>
                          {item.badge ? item.badge : item.worldName}
                        </span>
                      </div>
                      <p className={styles.linkDesc}>{item.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className={styles.footerInfo}>
          <span>IEEE SVCE // 12 PRIMARY DESTINATIONS</span>
          <span>EST. 1994 // REGION 10</span>
        </div>
      </div>
    </>
  );
}
