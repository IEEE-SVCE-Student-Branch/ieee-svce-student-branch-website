"use client";

import { useEffect, useRef, useCallback } from "react";

export interface RegisterNodeFn {
  (id: string, el: HTMLElement | null): void;
}

export function useProximityEngine(containerRef: React.RefObject<HTMLElement | null>) {
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const animationFrameRef = useRef<number | null>(null);
  const pointerPosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const registerElement: RegisterNodeFn = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      elementsRef.current.set(id, el);
    } else {
      elementsRef.current.delete(id);
    }
  }, []);

  useEffect(() => {
    // Check reduced motion preference or touch-only device
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    const container = containerRef.current || document.body;

    const handlePointerMove = (e: PointerEvent) => {
      pointerPosRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProximityState);
      }
    };

    const handlePointerLeave = () => {
      pointerPosRef.current.active = false;
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProximityState);
      }
    };

    const updateProximityState = () => {
      animationFrameRef.current = null;
      const { x: px, y: py, active } = pointerPosRef.current;
      const elements = Array.from(elementsRef.current.entries());

      if (elements.length === 0) return;

      if (!active) {
        // Reset all custom properties when mouse leaves window/container
        elements.forEach(([, el]) => {
          el.style.setProperty("--p-weight", "0");
          el.style.setProperty("--p-dx", "0");
          el.style.setProperty("--p-dy", "0");
        });
        return;
      }

      // Calculate distances for all registered nodes
      const elementMetrics = elements.map(([id, el]) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Normalize dx, dy by element size (clamped between -1 and 1)
        const normDx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
        const normDy = Math.max(-1, Math.min(1, dy / (rect.height / 2)));

        // Calculate light source offset inside element (0% to 100%)
        const lightX = Math.max(0, Math.min(100, ((px - rect.left) / rect.width) * 100));
        const lightY = Math.max(0, Math.min(100, ((py - rect.top) / rect.height) * 100));

        return { id, el, dist, normDx, normDy, lightX, lightY };
      });

      // Sort by distance to compute neighbor reaction falloffs
      elementMetrics.sort((a, b) => a.dist - b.dist);

      elementMetrics.forEach((item, index) => {
        // Neighbor falloff multiplier
        let neighborFactor = 0;
        if (index === 0) neighborFactor = 1.0;
        else if (index === 1) neighborFactor = 0.35;
        else if (index === 2) neighborFactor = 0.1;

        // Distance proximity zones
        const d = item.dist;
        let distFactor = 0;

        if (d > 220) {
          distFactor = 0;
        } else if (d > 160) {
          distFactor = 0.15 * ((220 - d) / 60);
        } else if (d > 80) {
          distFactor = 0.15 + 0.35 * ((160 - d) / 80);
        } else {
          distFactor = 0.5 + 0.5 * ((80 - d) / 80);
        }

        const finalWeight = distFactor * neighborFactor;

        // Apply hardware-accelerated CSS variables directly to DOM node
        item.el.style.setProperty("--p-weight", finalWeight.toFixed(3));
        item.el.style.setProperty("--p-dx", item.normDx.toFixed(3));
        item.el.style.setProperty("--p-dy", item.normDy.toFixed(3));
        item.el.style.setProperty("--p-dist", item.dist.toFixed(1));
        item.el.style.setProperty("--p-light-x", `${item.lightX.toFixed(1)}%`);
        item.el.style.setProperty("--p-light-y", `${item.lightY.toFixed(1)}%`);
      });
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [containerRef]);

  return { registerElement };
}
