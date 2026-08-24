"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if pointer is coarse (touch device) or reduced motion preferred
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [data-cursor], input, select, textarea");
      if (interactiveEl) {
        setIsInteractive(true);
        const customLabel = interactiveEl.getAttribute("data-cursor");
        if (customLabel) {
          setLabel(customLabel);
        } else if (interactiveEl.tagName === "A") {
          setLabel("OPEN");
        } else if (interactiveEl.tagName === "BUTTON") {
          setLabel("VIEW");
        } else {
          setLabel("");
        }
      } else {
        setIsInteractive(false);
        setLabel("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Smooth spring follow loop
    const updatePosition = () => {
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div
      className={`${styles.cursorContainer} ${isInteractive ? styles.cursorInteractive : ""}`}
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div ref={dotRef} className={styles.cursorDot} />
      <div ref={ringRef} className={styles.cursorRing}>
        <span className={styles.cursorLabel}>{label}</span>
      </div>
    </div>
  );
}
