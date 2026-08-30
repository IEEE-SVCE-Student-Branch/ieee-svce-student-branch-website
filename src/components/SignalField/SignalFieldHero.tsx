"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ParticleField } from "../ParticleField";
import styles from "./SignalFieldHero.module.css";

const DISCOVERY_CHIPS = [
  { id: "ALL", label: "ALL", route: "/" },
  { id: "PEOPLE", label: "PEOPLE", route: "/team" },
  { id: "EVENTS", label: "EVENTS", route: "/events" },
  { id: "BUILD", label: "BUILD", route: "/innovation" },
  { id: "HISTORY", label: "HISTORY", route: "/about" },
  { id: "ACHIEVEMENTS", label: "ACHIEVEMENTS", route: "/achievements" },
];

export function SignalFieldHero() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  // Spring animation loop for magnetic deflection
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const distance = Math.hypot(distX, distY);
      const attractionRadius = 140;

      if (distance < attractionRadius) {
        const maxDeflect = 20;
        const force = (1 - distance / attractionRadius) * maxDeflect;
        const angle = Math.atan2(distY, distX);
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
  }, []);

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

        {/* Discovery Category Filters mapped to real routes */}
        <div className={styles.discoveryFilters}>
          <div className={styles.chipsRow} role="navigation" aria-label="Discovery Destinations">
            {DISCOVERY_CHIPS.map((chip) => (
              <Link
                key={chip.id}
                href={chip.route}
                className={styles.chip}
                data-cursor="GOTO"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Central DISCOVER IEEE SVCE CTA -> Navigates to /about */}
        <div ref={containerRef} className={styles.magneticContainer}>
          <Link
            ref={buttonRef}
            href="/about"
            className={styles.rollButton}
            aria-label="Discover IEEE SVCE Student Branch — Learn About Us"
            data-cursor="DISCOVER"
          >
            <span className={styles.rollIcon} aria-hidden="true">
              ✦
            </span>
            <span>DISCOVER IEEE SVCE</span>
            <span className={styles.rollArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
