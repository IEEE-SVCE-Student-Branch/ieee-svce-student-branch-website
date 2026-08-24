"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DISCOVERY_CATALOG, DiscoveryItem } from "@/lib/data/discovery";
import styles from "./SignalFieldHero.module.css";

type FilterType = "ALL" | "PEOPLE" | "EVENTS" | "BUILD" | "HISTORY" | "ACHIEVEMENTS";

export function SignalFieldHero() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [isRolling, setIsRolling] = useState(false);
  const [discoveredItem, setDiscoveredItem] = useState<DiscoveryItem | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Magnetic button displacement coordinates
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  // Spring animation loop for magnetic deflection (18px–24px deflection)
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || isRolling) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const distance = Math.hypot(distX, distY);
      const attractionRadius = 140;

      if (distance < attractionRadius) {
        // Calculate repulsive deflection of 18–24px
        const maxDeflect = 22;
        const force = (1 - distance / attractionRadius) * maxDeflect;
        const angle = Math.atan2(distY, distX);
        // Move slightly away from the pointer
        targetPos.current = {
          x: -Math.cos(angle) * force,
          y: -Math.sin(angle) * force,
        };
      } else {
        targetPos.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      targetPos.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const updatePhysics = () => {
      const springEase = 0.16;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * springEase;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * springEase;

      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updatePhysics);
    };

    rafId.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isRolling]);

  const handleRollSignal = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Filter discovery pool based on selected category
    let pool = DISCOVERY_CATALOG;
    if (activeFilter === "PEOPLE") pool = DISCOVERY_CATALOG.filter((i) => i.category === "person");
    else if (activeFilter === "EVENTS") pool = DISCOVERY_CATALOG.filter((i) => i.category === "event");
    else if (activeFilter === "BUILD") pool = DISCOVERY_CATALOG.filter((i) => i.category === "project");
    else if (activeFilter === "HISTORY") pool = DISCOVERY_CATALOG.filter((i) => i.category === "media" || i.category === "article");
    else if (activeFilter === "ACHIEVEMENTS") pool = DISCOVERY_CATALOG.filter((i) => i.category === "achievement");

    if (pool.length === 0) pool = DISCOVERY_CATALOG;

    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];
    setDiscoveredItem(selected);

    // Converge signals, reveal, then navigate after 1.2s
    setTimeout(() => {
      router.push(selected.route);
    }, 1250);
  };

  return (
    <section className={styles.heroSection} aria-label="Interactive Signal Field">
      {/* Institutional Coordinate Watermarks */}
      <span className={styles.coordinateTagLeft} aria-hidden="true">
        STB 28051 // 12.9863° N, 79.9723° E // EST. 1994
      </span>
      <span className={styles.coordinateTagRight} aria-hidden="true">
        IEEE REGION 10 // MADRAS SECTION // DIGITAL INSTITUTION
      </span>

      {/* Background SVG Signal Grid & Beams */}
      <div
        className={`${styles.signalCanvas} ${isRolling ? styles.accelerated : ""}`}
        aria-hidden="true"
      >
        <svg className={styles.signalSvg} xmlns="http://www.w3.org/2000/svg">
          {/* Signal grid lines */}
          <line x1="10%" y1="0" x2="10%" y2="100%" className={styles.movingSignal} strokeWidth="1" />
          <line x1="30%" y1="0" x2="30%" y2="100%" className={styles.movingSignal} strokeWidth="1" />
          <line x1="50%" y1="0" x2="50%" y2="100%" className={styles.movingSignalFast} strokeWidth="1.5" />
          <line x1="70%" y1="0" x2="70%" y2="100%" className={styles.movingSignal} strokeWidth="1" />
          <line x1="90%" y1="0" x2="90%" y2="100%" className={styles.movingSignal} strokeWidth="1" />

          <line x1="0" y1="25%" x2="100%" y2="25%" className={styles.movingSignal} strokeWidth="1" />
          <line x1="0" y1="50%" x2="100%" y2="50%" className={styles.movingSignalFast} strokeWidth="1.5" />
          <line x1="0" y1="75%" x2="100%" y2="75%" className={styles.movingSignal} strokeWidth="1" />

          {/* Connected diagonal beams */}
          <path
            d="M 100 120 Q 400 300 800 200 T 1400 450"
            fill="none"
            className={styles.movingSignalFast}
            strokeWidth="1.5"
          />
          <path
            d="M 200 600 Q 600 400 1100 500 T 1600 200"
            fill="none"
            className={styles.movingSignal}
            strokeWidth="1"
          />

          {/* Signal nodes */}
          <circle cx="30%" cy="25%" r="3.5" className={styles.pulsingNode} />
          <circle cx="50%" cy="50%" r="4" className={styles.pulsingNodeCyan} />
          <circle cx="70%" cy="25%" r="3.5" className={styles.pulsingNode} />
          <circle cx="30%" cy="75%" r="3.5" className={styles.pulsingNodeCyan} />
          <circle cx="70%" cy="75%" r="4" className={styles.pulsingNode} />
        </svg>
      </div>

      {/* Primary Interactive Interface */}
      <div className={styles.heroContent}>
        <div className={styles.topPill}>
          <span className={styles.radarDot} aria-hidden="true" />
          <span>IEEE SVCE // THE LIVING INSTITUTION // STB 28051</span>
        </div>

        <h1 className={styles.mainTitle}>
          DISCOVER <span className={styles.gradientText}>IEEE SVCE</span>
        </h1>

        <p className={styles.subtitle}>
          The institutional signal field connects people, research labs, technical symposiums,
          and three decades of engineering memory.
        </p>

        {/* Category Filters */}
        <div className={styles.discoveryFilters}>
          <span className={styles.filtersPrompt}>{"// WHAT DO YOU WANT TO DISCOVER?"}</span>
          <div className={styles.chipsRow} role="radiogroup" aria-label="Discovery Category Filter">
            {(["ALL", "PEOPLE", "EVENTS", "BUILD", "HISTORY", "ACHIEVEMENTS"] as FilterType[]).map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  role="radio"
                  aria-checked={activeFilter === category}
                  className={`${styles.chip} ${activeFilter === category ? styles.chipActive : ""}`}
                  onClick={() => setActiveFilter(category)}
                  data-cursor="FILTER"
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        {/* Central Magnetic ROLL THE SIGNAL Button */}
        <div ref={containerRef} className={styles.magneticContainer}>
          <button
            ref={buttonRef}
            type="button"
            className={`${styles.rollButton} ${isRolling ? styles.rolling : ""}`}
            onClick={handleRollSignal}
            disabled={isRolling}
            aria-label="Roll the signal to discover an institutional artifact"
            data-cursor="ROLL"
          >
            <span className={styles.rollIcon} aria-hidden="true">
              ✦
            </span>
            <span>{isRolling ? "CONVERGING SIGNALS..." : "ROLL THE SIGNAL"}</span>
          </button>
        </div>

        {/* Discovery Reveal Card */}
        {discoveredItem && isRolling && (
          <div
            className={styles.revealCard}
            role="alert"
            aria-live="assertive"
            aria-label={`Discovered ${discoveredItem.categoryLabel}: ${discoveredItem.title}`}
          >
            <div className={styles.revealStatus}>
              <span aria-hidden="true">✓</span>
              <span>DISCOVERED</span>
            </div>
            <div className={styles.revealCategory}>[ {discoveredItem.categoryLabel} ]</div>
            <div className={styles.revealTitle}>{discoveredItem.title}</div>
            <div className={styles.navNotice}>
              <div className={styles.navSpinner} aria-hidden="true" />
              <span>SYNCHRONIZING REPOSITORY RECORD...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
