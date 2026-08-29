"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DISCOVERY_CATALOG, DiscoveryItem } from "@/lib/data/discovery";
import { ParticleField } from "../ParticleField";
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
        // Move slightly away from pointer
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
    else if (activeFilter === "EVENTS")
      pool = DISCOVERY_CATALOG.filter((i) => i.category === "event");
    else if (activeFilter === "BUILD")
      pool = DISCOVERY_CATALOG.filter((i) => i.category === "project");
    else if (activeFilter === "HISTORY")
      pool = DISCOVERY_CATALOG.filter((i) => i.category === "media" || i.category === "article");
    else if (activeFilter === "ACHIEVEMENTS")
      pool = DISCOVERY_CATALOG.filter((i) => i.category === "achievement");

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
    <section className={styles.heroSection} aria-label="IEEE SVCE Discovery Hero">
      {/* Performant Living Volumetric Spatial Field */}
      <ParticleField />

      {/* Primary Interactive Interface */}
      <div className={styles.heroContent}>
        <div className={styles.topPill}>
          <span className={styles.radarDot} aria-hidden="true" />
          <span>IEEE SVCE STUDENT BRANCH</span>
        </div>

        <h1 className={styles.mainTitle}>
          DISCOVER <span className={styles.gradientText}>IEEE SVCE</span>
        </h1>

        <p className={styles.subtitle}>
          The student-driven technical community connecting Sri Venkateswara College of Engineering
          with the global IEEE network.
        </p>

        {/* Discovery Category Filters */}
        <div className={styles.discoveryFilters}>
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

        {/* Central Magnetic DISCOVER Button */}
        <div ref={containerRef} className={styles.magneticContainer}>
          <button
            ref={buttonRef}
            type="button"
            className={`${styles.rollButton} ${isRolling ? styles.rolling : ""}`}
            onClick={handleRollSignal}
            disabled={isRolling}
            aria-label="Discover an IEEE SVCE institutional artifact"
            data-cursor="DISCOVER"
          >
            <span className={styles.rollIcon} aria-hidden="true">
              ✦
            </span>
            <span>{isRolling ? "DISCOVERING..." : "DISCOVER IEEE SVCE"}</span>
            <span className={styles.rollArrow} aria-hidden="true">
              →
            </span>
          </button>
        </div>

        {/* Discovery Reveal Modal Card */}
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
              <span>Opening institutional record...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
