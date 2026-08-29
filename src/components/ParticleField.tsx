"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ParticleField.module.css";

// Lightweight deterministic seeded LCG random number generator
function createPRNG(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(1664525, s) + 1013904223;
    return ((s >>> 0) / 0xffffffff);
  };
}

interface Particle {
  // Base 3D positions (on initial sphere / ellipsoid volume)
  bx: number;
  by: number;
  bz: number;
  // Particle visual properties
  radius: number;
  baseAlpha: number;
  isAccent: boolean; // IEEE blue accent (~8%)
  // Per-particle variation for de-synchronization
  phaseA: number;  // phase offset for field A sampling
  phaseB: number;  // phase offset for field B sampling
  phaseC: number;  // phase offset for individual drift
  freqA: number;   // individual frequency variation (0.8–1.2)
  freqB: number;
  // Layer: 0=FAR, 1=MID, 2=NEAR
  layer: 0 | 1 | 2;
}

export function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ─── Media queries ──────────────────────────────────────────────────────────
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const vw = window.innerWidth;

    // Adaptive density multiplier based on viewport
    let densityMult: number;
    if (vw >= 1440) densityMult = 1.0;
    else if (vw >= 1024) densityMult = 0.65;
    else if (vw >= 768) densityMult = 0.45;
    else densityMult = 0.22;

    // Base particle counts at full density (desktop 1440+)
    const baseFAR = 1200;
    const baseMID = 450;
    const baseNEAR = 150;

    const countFAR  = Math.round(baseFAR  * densityMult);
    const countMID  = Math.round(baseMID  * densityMult);
    const countNEAR = Math.round(baseNEAR * densityMult);
    const totalCount = countFAR + countMID + countNEAR;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrameId = 0;
    let time = 0;

    // Pointer state (smooth lerp)
    const ptr = { cx: 0, cy: 0, tx: 0, ty: 0 };

    // ─── Build particle volume ───────────────────────────────────────────────
    const buildParticles = () => {
      width  = canvas.width  = window.innerWidth  * devicePixelRatio;
      height = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";

      const rng = createPRNG(28051994);
      particles = [];

      // The base volume is an ellipsoid — slightly flattened on Z
      // so the swarm reads as spatial / deep from the viewer's perspective.
      // Radius is proportional to the smaller viewport dimension.
      const baseR = Math.min(width, height) * 0.48;

      const addLayer = (
        count: number,
        layer: 0 | 1 | 2,
        rMin: number, rMax: number,
        aMin: number, aMax: number,
        accentRatio: number
      ) => {
        for (let i = 0; i < count; i++) {
          // Uniform sphere distribution (rejection method via cosine elevation)
          const u = rng(); // 0–1 for radial variation
          const cosTheta = 1 - 2 * rng();
          const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta));
          const phi = rng() * Math.PI * 2;

          // Radial variation: 0.55–1.3 of baseR creates the "volume" feel
          // (not a shell — a filled sphere with density falloff)
          const radialVar = 0.55 + u * 0.75;
          const r = baseR * radialVar;

          const bx = r * sinTheta * Math.cos(phi);
          const by = r * sinTheta * Math.sin(phi) * 0.85; // slight Y flatten
          const bz = r * cosTheta * 0.68; // stronger Z flatten for depth feel

          const radius    = rMin + rng() * (rMax - rMin);
          const baseAlpha = aMin + rng() * (aMax - aMin);
          const isAccent  = rng() < accentRatio;

          particles.push({
            bx, by, bz,
            radius,
            baseAlpha,
            isAccent,
            phaseA: rng() * Math.PI * 2,
            phaseB: rng() * Math.PI * 2,
            phaseC: rng() * Math.PI * 2,
            freqA: 0.8 + rng() * 0.4,
            freqB: 0.75 + rng() * 0.5,
            layer,
          });
        }
      };

      // FAR particles: tiny, dim, dense background fog
      addLayer(countFAR,  0, 0.45 * devicePixelRatio, 1.05 * devicePixelRatio, 0.10, 0.26, 0.06);
      // MID particles: moderate size/opacity — the body of the swarm
      addLayer(countMID,  1, 0.85 * devicePixelRatio, 1.70 * devicePixelRatio, 0.20, 0.42, 0.08);
      // NEAR particles: more visible, foreground presence
      addLayer(countNEAR, 2, 1.35 * devicePixelRatio, 2.35 * devicePixelRatio, 0.33, 0.62, 0.12);
    };

    buildParticles();

    // ─── Event listeners ─────────────────────────────────────────────────────
    const onResize = () => buildParticles();

    const onMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      ptr.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      ptr.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onMouseLeave = () => { ptr.tx = 0; ptr.ty = 0; };

    window.addEventListener("resize",     onResize,     { passive: true });
    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    // Visibility pause
    let visible = !document.hidden;
    const onVisChange = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVisChange);

    // ─── Perspective / projection constants ──────────────────────────────────
    // Focal length in device pixels — controls depth exaggeration
    const focalLength = Math.min(width, height) * 0.85;

    // ─── Pre-allocate projection arrays to avoid GC pressure ─────────────────
    // Each slot: [projX, projY, projRadius, alpha, isAccent, layer]
    type ProjEntry = { x: number; y: number; r: number; a: number; accent: boolean; layer: number };
    const proj: ProjEntry[] = Array.from({ length: totalCount }, () => ({
      x: 0, y: 0, r: 0, a: 0, accent: false, layer: 0,
    }));

    // ─── Render loop ─────────────────────────────────────────────────────────
    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!visible) return;

      time += 0.005; // slow global time tick (~0.3 deg/frame at 60fps)

      // Smooth pointer lerp
      ptr.cx += (ptr.tx - ptr.cx) * 0.04;
      ptr.cy += (ptr.ty - ptr.cy) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const cx = width  / 2;
      const cy = height / 2;

      // ── Shared deformation fields ──────────────────────────────────────────
      // Field A: large-scale volume stretch (very slow, period ~40s game time)
      const tA = time * 0.12;
      const fieldA_x = Math.sin(tA * 0.7)  * 0.28;
      const fieldA_y = Math.cos(tA * 0.5)  * 0.22;
      const fieldA_z = Math.sin(tA * 0.9)  * 0.18;

      // Field B: medium-scale asymmetric tilt (period ~22s)
      const tB = time * 0.22;
      const fieldB_x = Math.cos(tB * 1.1)  * 0.18;
      const fieldB_y = Math.sin(tB * 0.8)  * 0.16;
      const fieldB_z = Math.cos(tB * 1.3)  * 0.12;

      // Field C: fine-scale radial breathing (period ~14s)
      const tC = time * 0.35;
      const breathe = Math.sin(tC) * 0.12 + Math.cos(tC * 0.7) * 0.08;

      // Subtle camera-level rotation from time (very slow — full 360 over ~200s)
      const camRotY = time * 0.018;
      const camRotX = Math.sin(time * 0.011) * 0.09;
      const cosY = Math.cos(camRotY), sinY = Math.sin(camRotY);
      const cosX = Math.cos(camRotX), sinX = Math.sin(camRotX);

      let projCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let { bx, by, bz } = p;

        if (!isReducedMotion) {
          // Shared deformation — ALL particles feel the same field,
          // but their individual phases create local variation.
          const pA = p.phaseA, pB = p.phaseB, pC = p.phaseC;
          const fA = p.freqA, fB = p.freqB;

          // Radial breathing (shared breathe + individual phase offset)
          const breatheScalar = 1.0 + breathe + 0.06 * Math.sin(tC * fA + pC);
          bx *= breatheScalar;
          by *= breatheScalar;
          bz *= breatheScalar;

          // Field A contribution: position-correlated large wave
          const wA = Math.sin(tA * fA + pA + bx * 0.002);
          const wAy = Math.cos(tA * fA + pA + by * 0.002);
          bx += bx * fieldA_x * wA  + 22 * Math.cos(tA * 0.6 + pA);
          by += by * fieldA_y * wAy + 20 * Math.sin(tA * 0.5 + pA);
          bz += bz * fieldA_z * wA  + 16 * Math.cos(tA * 0.8 + pA);

          // Field B contribution: medium asymmetric tilt
          const wB = Math.sin(tB * fB + pB + bz * 0.003);
          bx += bx * fieldB_x * wB + 14 * Math.cos(tB * 1.2 + pB);
          by += by * fieldB_y * wB + 12 * Math.sin(tB * 0.9 + pB);
          bz += bz * fieldB_z * wB + 10 * Math.cos(tB * 1.4 + pB);

          // Tiny individual drift — prevents synchronized movement
          bx += 4.5 * Math.cos(time * 0.8 * fA + pC * 1.3);
          by += 4.5 * Math.sin(time * 0.7 * fB + pC * 0.9);
          bz += 3.0 * Math.cos(time * 0.6 * fA + pC * 1.7);
        }

        // Camera rotation (Y then X)
        const rx1 = bx * cosY - bz * sinY;
        const rz1 = bx * sinY + bz * cosY;
        const ry2 = by * cosX - rz1 * sinX;
        const rz2 = by * sinX + rz1 * cosX;

        // Perspective projection
        const depth = focalLength + rz2 + focalLength * 0.6;
        if (depth <= 0) continue;
        const scale = focalLength / depth;

        // Cursor parallax — stronger for near particles
        const pxStr = p.layer === 2 ? 7 : p.layer === 1 ? 2.8 : 0.6;
        const projX = cx + rx1 * scale + ptr.cx * pxStr;
        const projY = cy + ry2 * scale + ptr.cy * pxStr;

        // Clip to canvas bounds + small margin
        if (projX < -30 || projX > width + 30 || projY < -30 || projY > height + 30) continue;

        const projR = Math.max(0.3, p.radius * scale);
        const projA = Math.min(0.92, Math.max(0.02, p.baseAlpha * scale * 1.3));

        const pe = proj[projCount];
        pe.x = projX;
        pe.y = projY;
        pe.r = projR;
        pe.a = projA;
        pe.accent = p.isAccent;
        pe.layer = p.layer;
        projCount++;
      }

      // Painter's algorithm: sort back-to-front (higher z = further, draw first)
      // We approximate with layer — FAR first, NEAR last
      // (Full Z-sort would require storing rz2; we use layer as a fast approximation)
      // Actually sort by alpha ascending (dim/far first) for correct overlap:
      proj.slice(0, projCount).sort((a, b) => a.a - b.a);

      // Draw all particles
      for (let i = 0; i < projCount; i++) {
        const { x, y, r, a, accent, layer } = proj[i];

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);

        if (accent) {
          // Electric Cyan Accent (~10% of swarm)
          ctx.fillStyle = `rgba(6, 182, 212, ${Math.min(0.95, a * 1.3)})`;
        } else if (layer === 2) {
          // NEAR particles: Sharp IEEE Cerulean Blue
          ctx.fillStyle = `rgba(2, 132, 199, ${a})`;
        } else if (layer === 1) {
          // MID particles: Deep IEEE Institutional Blue
          ctx.fillStyle = `rgba(0, 98, 155, ${a * 0.85})`;
        } else {
          // FAR particles: Subdued Slate / Indigo depth haze
          ctx.fillStyle = `rgba(51, 65, 85, ${a * 0.65})`;
        }

        ctx.fill();
      }
    };

    // ─── Start ───────────────────────────────────────────────────────────────
    if (isReducedMotion) {
      // Static snapshot — one draw, no animation
      render();
      cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }

    // ─── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize",      onResize);
      window.removeEventListener("mousemove",   onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.particleCanvas} ${className}`}
      aria-hidden="true"
    />
  );
}
