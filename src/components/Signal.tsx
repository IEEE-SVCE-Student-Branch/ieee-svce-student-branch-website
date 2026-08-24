"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Signal.module.css";

interface SignalProps {
  forceShow?: boolean;
}

/**
 * IEEE SVCE Signal Reveal (0.9s - 1.2s):
 * IEEE logo -> SVCE logo -> Signal beam -> Branching field -> Home Signal Field.
 * Uses official brand assets without modification or recoloring.
 */
export function Signal({ forceShow = false }: SignalProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hasSeen = sessionStorage.getItem("ieee_svce_signal_field_seen");
    if (!hasSeen || forceShow) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("ieee_svce_signal_field_seen", "true");
      }, 1250);

      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("ieee_svce_signal_field_seen", "true");
  };

  if (!mounted || !visible) return null;

  return (
    <div
      className={`${styles.overlay} ${!visible ? styles.overlayDismissed : ""}`}
      role="status"
      aria-label="IEEE SVCE Signal Field Initialization"
      aria-live="polite"
      onClick={handleDismiss}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Brand Logos Row */}
        <div className={styles.logoRow}>
          <div className={styles.logoItem}>
            <Image
              src="/brand/ieee-logo.png"
              alt="IEEE Official Logo"
              width={140}
              height={45}
              priority
              className={styles.brandImage}
            />
          </div>

          <div className={styles.dividerDot} aria-hidden="true" />

          <div className={styles.logoItem}>
            <Image
              src="/brand/svce-logo.png"
              alt="SVCE Official Logo"
              width={150}
              height={48}
              priority
              className={styles.brandImage}
            />
          </div>
        </div>

        {/* Branching Signal Beam SVG */}
        <div className={styles.beamContainer} aria-hidden="true">
          <svg className={styles.beamSvg} viewBox="0 0 180 36" fill="none">
            <path
              className={styles.beamLine}
              d="M10 18 H90 M90 18 L130 6 M90 18 L130 30 M130 6 H170 M130 30 H170"
              stroke="#00629B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="90" cy="18" r="3" fill="#00629B" />
            <circle cx="170" cy="6" r="2.5" fill="#06B6D4" />
            <circle cx="170" cy="30" r="2.5" fill="#6366F1" />
          </svg>
        </div>

        <div className={styles.signalTag}>
          <span className={styles.livePulse} aria-hidden="true" />
          <span>SIGNAL FIELD SYNCHRONIZED // 2026/27</span>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className={styles.skipBtn}
          aria-label="Skip signal intro"
        >
          ENTER FIELD [ESC]
        </button>
      </div>
    </div>
  );
}
