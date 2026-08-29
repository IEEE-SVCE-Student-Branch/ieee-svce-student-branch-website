"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  delayMs = 0,
  direction = "up",
  className = "",
  threshold = 0.12,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If reduced motion is preferred, render visible immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [threshold]);

  const directionClass =
    direction === "left"
      ? styles.fromLeft
      : direction === "right"
        ? styles.fromRight
        : direction === "fade"
          ? styles.fadeOnly
          : styles.fromBottom;

  return (
    <div
      ref={domRef}
      className={`${styles.revealWrapper} ${directionClass} ${
        isVisible ? styles.revealed : ""
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
