"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./ExploreMenu.module.css";

interface ExploreMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ExploreNavItem {
  id: string;
  name: string;
  href: string;
  category: string;
  tagline: string;
  icon:
    | "home"
    | "book"
    | "people"
    | "calendar"
    | "cube"
    | "grad"
    | "laurel"
    | "camera"
    | "handshake"
    | "doc"
    | "shield"
    | "pin";
  badgeColor: "blue" | "cyan" | "violet" | "amber" | "emerald";
}

export const EXPLORE_NAV_ITEMS: ExploreNavItem[] = [
  {
    id: "nav-home",
    name: "Home",
    href: "/",
    category: "Flagship Field",
    tagline: "The digital heartbeat of IEEE SVCE Student Branch.",
    icon: "home",
    badgeColor: "blue",
  },
  {
    id: "nav-about",
    name: "About",
    href: "/about",
    category: "Institutional Blueprint",
    tagline: "Branch constitution, vision, and historical foundation.",
    icon: "book",
    badgeColor: "violet",
  },
  {
    id: "nav-team",
    name: "Team",
    href: "/team",
    category: "Organizational Roster",
    tagline: "Elected student leadership upholding institutional excellence.",
    icon: "people",
    badgeColor: "cyan",
  },
  {
    id: "nav-events",
    name: "Events",
    href: "/events",
    category: "Programs & Symposiums",
    tagline: "Flagship technical symposiums, hackathons, and workshops.",
    icon: "calendar",
    badgeColor: "blue",
  },
  {
    id: "nav-innovation",
    name: "Innovation",
    href: "/innovation",
    category: "Engineering Labs",
    tagline: "Student engineering R&D prototypes and applied research.",
    icon: "cube",
    badgeColor: "cyan",
  },
  {
    id: "nav-learn",
    name: "Learn",
    href: "/learn",
    category: "Knowledge Hub",
    tagline: "Curated learning tracks engineered by domain leads.",
    icon: "grad",
    badgeColor: "emerald",
  },
  {
    id: "nav-community",
    name: "Community",
    href: "/community",
    category: "Student Laurels",
    tagline: "Recognizing high-impact engineering accomplishments.",
    icon: "laurel",
    badgeColor: "amber",
  },
  {
    id: "nav-media",
    name: "Media",
    href: "/media",
    category: "Visual Chronicle",
    tagline: "Photographic light table of active branch milestones.",
    icon: "camera",
    badgeColor: "cyan",
  },
  {
    id: "nav-partners",
    name: "Partners",
    href: "/partners",
    category: "Industry Network",
    tagline: "Strategic industry linkages and technical society partners.",
    icon: "handshake",
    badgeColor: "emerald",
  },
  {
    id: "nav-reports",
    name: "Reports",
    href: "/reports",
    category: "Audited Archive",
    tagline: "Audited annual activity digests and verified dossiers.",
    icon: "doc",
    badgeColor: "amber",
  },
  {
    id: "nav-certificates",
    name: "Certificates",
    href: "/certificates",
    category: "Public Vault",
    tagline: "Cryptographic credential verification for event participants.",
    icon: "shield",
    badgeColor: "blue",
  },
  {
    id: "nav-contact",
    name: "Contact",
    href: "/contact",
    category: "Institutional Desk",
    tagline: "Official correspondence desk and campus coordinates.",
    icon: "pin",
    badgeColor: "violet",
  },
];

function NavIconSvg({ type }: { type: ExploreNavItem["icon"] }) {
  switch (type) {
    case "home":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "book":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "people":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "calendar":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "cube":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case "grad":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "laurel":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      );
    case "camera":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    case "handshake":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "doc":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "shield":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "pin":
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Embedded Spatial Hover Geometry Preview:
 * Extremely subtle spatial environment reaction behind/around the hovered item.
 */
function EmbeddedSpatialHoverPreview({ navId }: { navId: string }) {
  switch (navId) {
    case "nav-about":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <rect
            x="80"
            y="40"
            width="440"
            height="320"
            rx="8"
            stroke="rgba(99, 102, 241, 0.14)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <line
            x1="120"
            y1="120"
            x2="480"
            y2="120"
            stroke="rgba(99, 102, 241, 0.18)"
            strokeWidth="1.2"
          />
          <line
            x1="120"
            y1="200"
            x2="400"
            y2="200"
            stroke="rgba(99, 102, 241, 0.14)"
            strokeWidth="1"
          />
          <line
            x1="120"
            y1="280"
            x2="320"
            y2="280"
            stroke="rgba(99, 102, 241, 0.14)"
            strokeWidth="1"
          />
          <circle cx="460" cy="280" r="16" stroke="rgba(99, 102, 241, 0.22)" strokeWidth="1.5" />
        </svg>
      );
    case "nav-team":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <circle cx="200" cy="160" r="18" stroke="rgba(6, 182, 212, 0.22)" strokeWidth="1.5" />
          <circle cx="400" cy="160" r="18" stroke="rgba(6, 182, 212, 0.22)" strokeWidth="1.5" />
          <circle cx="300" cy="280" r="24" stroke="rgba(2, 132, 199, 0.28)" strokeWidth="2" />
          <line
            x1="200"
            y1="160"
            x2="300"
            y2="280"
            stroke="rgba(6, 182, 212, 0.18)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <line
            x1="400"
            y1="160"
            x2="300"
            y2="280"
            stroke="rgba(6, 182, 212, 0.18)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <line
            x1="200"
            y1="160"
            x2="400"
            y2="160"
            stroke="rgba(6, 182, 212, 0.14)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </svg>
      );
    case "nav-events":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <line
            x1="80"
            y1="200"
            x2="520"
            y2="200"
            stroke="rgba(2, 132, 199, 0.2)"
            strokeWidth="1.5"
          />
          <circle cx="160" cy="200" r="10" fill="rgba(2, 132, 199, 0.25)" />
          <circle cx="300" cy="200" r="14" fill="rgba(6, 182, 212, 0.35)" />
          <circle cx="440" cy="200" r="10" fill="rgba(2, 132, 199, 0.25)" />
          <path
            d="M160 170 V120 M300 160 V90 M440 170 V120"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "nav-innovation":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <polygon
            points="300,80 440,160 440,300 300,380 160,300 160,160"
            stroke="rgba(6, 182, 212, 0.18)"
            strokeWidth="1.5"
          />
          <line
            x1="300"
            y1="80"
            x2="300"
            y2="380"
            stroke="rgba(6, 182, 212, 0.14)"
            strokeWidth="1.2"
          />
          <line
            x1="160"
            y1="160"
            x2="440"
            y2="300"
            stroke="rgba(6, 182, 212, 0.12)"
            strokeWidth="1"
          />
          <circle cx="300" cy="230" r="12" fill="rgba(6, 182, 212, 0.2)" />
        </svg>
      );
    case "nav-learn":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <circle
            cx="300"
            cy="200"
            r="120"
            stroke="rgba(16, 185, 129, 0.14)"
            strokeWidth="1.2"
            strokeDasharray="6 4"
          />
          <circle cx="300" cy="200" r="70" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" />
          <circle cx="300" cy="200" r="20" fill="rgba(16, 185, 129, 0.22)" />
        </svg>
      );
    case "nav-community":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <circle
            cx="300"
            cy="200"
            r="90"
            stroke="rgba(245, 158, 11, 0.16)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <polygon
            points="300,140 318,180 360,184 328,212 338,254 300,230 262,254 272,212 240,184 282,180"
            stroke="rgba(245, 158, 11, 0.25)"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "nav-media":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <rect
            x="120"
            y="80"
            width="360"
            height="240"
            rx="8"
            stroke="rgba(6, 182, 212, 0.18)"
            strokeWidth="1.5"
          />
          <circle cx="210" cy="150" r="22" stroke="rgba(6, 182, 212, 0.22)" strokeWidth="1.5" />
          <path
            d="M140 280 L260 190 L340 240 L400 195 L460 280"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "nav-partners":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <circle cx="200" cy="200" r="60" stroke="rgba(16, 185, 129, 0.18)" strokeWidth="1.5" />
          <circle cx="400" cy="200" r="60" stroke="rgba(16, 185, 129, 0.18)" strokeWidth="1.5" />
          <path
            d="M250 170 C 300 140, 300 260, 350 230"
            stroke="rgba(16, 185, 129, 0.25)"
            strokeWidth="2"
          />
        </svg>
      );
    case "nav-reports":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <rect
            x="180"
            y="60"
            width="240"
            height="280"
            rx="6"
            stroke="rgba(245, 158, 11, 0.18)"
            strokeWidth="1.5"
          />
          <line
            x1="220"
            y1="120"
            x2="380"
            y2="120"
            stroke="rgba(245, 158, 11, 0.2)"
            strokeWidth="1.5"
          />
          <line
            x1="220"
            y1="170"
            x2="380"
            y2="170"
            stroke="rgba(245, 158, 11, 0.2)"
            strokeWidth="1.5"
          />
          <line
            x1="220"
            y1="220"
            x2="320"
            y2="220"
            stroke="rgba(245, 158, 11, 0.15)"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "nav-certificates":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <path
            d="M300 80 L420 140 V240 C420 310, 300 360, 300 360 C300 360, 180 310, 180 240 V140 Z"
            stroke="rgba(2, 132, 199, 0.2)"
            strokeWidth="1.8"
            fill="rgba(2, 132, 199, 0.03)"
          />
          <path
            d="M260 210 L288 238 L344 182"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "nav-contact":
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <circle
            cx="300"
            cy="200"
            r="100"
            stroke="rgba(99, 102, 241, 0.15)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <line
            x1="300"
            y1="60"
            x2="300"
            y2="340"
            stroke="rgba(99, 102, 241, 0.14)"
            strokeWidth="1"
          />
          <line
            x1="160"
            y1="200"
            x2="440"
            y2="200"
            stroke="rgba(99, 102, 241, 0.14)"
            strokeWidth="1"
          />
          <circle cx="300" cy="200" r="12" fill="rgba(99, 102, 241, 0.25)" />
        </svg>
      );
    default:
      return (
        <svg className={styles.spatialHoverSvg} viewBox="0 0 600 400" fill="none">
          <circle
            cx="300"
            cy="200"
            r="80"
            stroke="rgba(2, 132, 199, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      );
  }
}

export function ExploreMenu({ isOpen, onClose }: ExploreMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const [selectedItem, setSelectedItem] = useState<ExploreNavItem>(EXPLORE_NAV_ITEMS[0]);
  const [hoveredItem, setHoveredItem] = useState<ExploreNavItem | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setHoveredItem(null);
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const currentIndex = EXPLORE_NAV_ITEMS.findIndex((it) => it.id === selectedItem.id);
        const nextIndex = (currentIndex + 1) % EXPLORE_NAV_ITEMS.length;
        setSelectedItem(EXPLORE_NAV_ITEMS[nextIndex]);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const currentIndex = EXPLORE_NAV_ITEMS.findIndex((it) => it.id === selectedItem.id);
        const prevIndex = (currentIndex - 1 + EXPLORE_NAV_ITEMS.length) % EXPLORE_NAV_ITEMS.length;
        setSelectedItem(EXPLORE_NAV_ITEMS[prevIndex]);
      } else if (e.key === "Enter") {
        e.preventDefault();
        onClose();
        router.push(selectedItem.href);
      }

      if (e.key === "Tab" && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedItem, onClose, router]);

  const handleItemOpen = useCallback(
    (item: ExploreNavItem) => {
      onClose();
      router.push(item.href);
    },
    [onClose, router]
  );

  const activeDisplayItem = hoveredItem || selectedItem;

  return (
    <>
      {/* Restrained Backdrop Blur & Dimming */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <div
        ref={overlayRef}
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="IEEE SVCE Navigation Directory"
      >
        {/* Top Control Bar */}
        <header className={styles.topControlBar}>
          {/* Dual-Logo Brand Lockup for Explore */}
          <div className={styles.exploreBrandLockup}>
            <Image
              src="/ieee.svg"
              alt="IEEE Official Mark"
              width={40}
              height={40}
              className={styles.exploreBrandIeee}
            />
            <div className={styles.exploreBrandDivider} aria-hidden="true" />
            <Image
              src="/svce.svg"
              alt="SVCE Official Mark"
              width={80}
              height={40}
              className={styles.exploreBrandSvce}
            />
            <div className={styles.exploreBrandTextBlock}>
              <span className={styles.exploreBrandTitle}>IEEE SVCE</span>
              <span className={styles.exploreBrandLabel}>EXPLORE</span>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeControl}
            onClick={onClose}
            aria-label="Close Explore Directory (ESC)"
            data-cursor="CLOSE"
          >
            <span className={styles.closeArrow}>✕</span>
            <span>CLOSE</span>
            <span className={styles.escBadge} aria-hidden="true">
              ESC
            </span>
          </button>
        </header>

        {/* Embedded Spatial Hover Preview Layer in Background */}
        <div className={styles.spatialHoverStage} aria-hidden="true">
          <EmbeddedSpatialHoverPreview navId={activeDisplayItem.id} />
        </div>

        {/* Floating Capsule Navigation Lineup Stream */}
        <div className={styles.capsuleStreamContainer}>
          <div className={styles.capsuleStream}>
            {EXPLORE_NAV_ITEMS.map((item, idx) => {
              const isHovered = hoveredItem?.id === item.id;
              const isSelected = selectedItem.id === item.id;
              const isCurrent = pathname === item.href;
              const anyHovered = hoveredItem !== null;
              const isDimmed = anyHovered && !isHovered;

              // Subtle natural stagger displacement
              const progress = idx / (EXPLORE_NAV_ITEMS.length - 1);
              const staggerX = Math.sin(progress * Math.PI) * 18;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.navCapsule} ${styles[`color_${item.badgeColor}`]} ${
                    isHovered ? styles.capsuleHovered : ""
                  } ${isSelected ? styles.capsuleSelected : ""} ${
                    isCurrent ? styles.capsuleCurrent : ""
                  } ${isDimmed ? styles.capsuleDimmed : ""}`}
                  style={{
                    transform: `translateX(${staggerX}px)`,
                  }}
                  onClick={() => handleItemOpen(item)}
                  onMouseEnter={() => {
                    setHoveredItem(item);
                    setSelectedItem(item);
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-label={`Navigate to ${item.name} (${item.category})`}
                  data-cursor="OPEN"
                >
                  <span className={styles.capsuleIconWrapper}>
                    <NavIconSvg type={item.icon} />
                  </span>
                  <span className={styles.capsuleName}>{item.name}</span>
                  <span className={styles.categoryTag}>{item.category}</span>
                  <span className={styles.openArrow} aria-hidden="true">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
