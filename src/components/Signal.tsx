"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Signal.module.css";

interface SignalProps {
  forceShow?: boolean;
}

/**
 * IEEE SVCE Signal Entrance:
 * IEEE -> SVCE -> connection -> signal field -> homepage.
 * First visit: 900–1300ms (1100ms)
 * Returning visit: 250–400ms (300ms)
 * Reduced motion: bypassed.
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
    const duration = hasSeen && !forceShow ? 320 : 1150;

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("ieee_svce_signal_field_seen", "true");
    }, duration);

    return () => clearTimeout(timer);
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
      aria-label="IEEE SVCE Digital Institution Entrance"
      aria-live="polite"
      onClick={handleDismiss}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Brand Lockup Entrance Sequence */}
        <div className={styles.logoRow}>
          <div className={styles.logoItemIeee}>
            <Image
              src="/ieee.svg"
              alt="IEEE Official Mark"
              width={44}
              height={44}
              priority
              className={styles.brandImage}
            />
          </div>

          <div className={styles.dividerMark} aria-hidden="true" />

          <div className={styles.logoItemSvce}>
            <Image
              src="/svce.svg"
              alt="SVCE Official Mark"
              width={86}
              height={44}
              priority
              className={styles.brandImage}
            />
          </div>
        </div>

        {/* Dynamic Optical Connection Beam */}
        <div className={styles.beamContainer} aria-hidden="true">
          <svg className={styles.beamSvg} viewBox="0 0 200 36" fill="none">
            <path
              className={styles.beamLine}
              d="M10 18 H95 M95 18 L140 6 M95 18 L140 30 M140 6 H190 M140 30 H190"
              stroke="#00629B"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="95" cy="18" r="3.5" fill="#00629B" />
            <circle cx="190" cy="6" r="3" fill="#06B6D4" />
            <circle cx="190" cy="30" r="3" fill="#6366F1" />
          </svg>
        </div>

        <div className={styles.signalTag}>
          <span className={styles.livePulse} aria-hidden="true" />
          <span>IEEE SVCE STUDENT BRANCH</span>
        </div>
      </div>
    </div>
  );
}
