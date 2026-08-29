"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { TeamMember } from "@/lib/data/branch-data";
import styles from "./TeamCard.module.css";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    // Calculate rotation (-4deg to +4deg)
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 4;

    setRotation({ x: rotX, y: rotY });
    setGlowPos({ x: percentX, y: percentY });
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  // Compute initials for institutional monogram
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <>
      <div
        ref={cardRef}
        className={styles.cardContainer}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        aria-label={`View profile for ${member.name}, ${member.position}`}
        data-cursor="OPEN"
      >
        <div
          className={styles.cardPerspective}
          style={{
            transform: isHovered
              ? `perspective(900px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-4px)`
              : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)",
          }}
        >
          {/* Dynamic Glow Highlight Layer */}
          <div
            className={styles.cardGlowOverlay}
            style={{
              background: isHovered
                ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(2, 132, 199, 0.18) 0%, rgba(99, 102, 241, 0.05) 45%, transparent 70%)`
                : "none",
            }}
            aria-hidden="true"
          />

          {/* Portrait Frame — photo or monogram */}
          <div className={styles.portraitFrame}>
            {member.photo ? (
              <div className={styles.photoWrapper}>
                <Image
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(max-width: 640px) 100px, 120px"
                  className={styles.portraitImage}
                  onError={() => {/* fallback handled by CSS */}}
                />
              </div>
            ) : (
              <div className={styles.monogramDisc}>
                <span className={styles.monogramText}>{initials}</span>
              </div>
            )}
            <div className={styles.badgeRow}>
              <span
                className={`${styles.statusBadge} ${
                  member.status === "VERIFIED" ? styles.statusVerified : styles.statusPending
                }`}
              >
                {member.status === "VERIFIED" ? "✓ VERIFIED" : "PENDING"}
              </span>
              <span className={styles.yearTag}>{member.year}</span>
            </div>
          </div>

          {/* Member Metadata */}
          <div className={styles.metaContent}>
            <div className={styles.teamTag}>{member.team}</div>
            <h3 className={styles.memberName}>{member.name}</h3>
            <div className={styles.memberRole}>{member.position}</div>
            <p className={styles.memberDept}>{member.department}</p>
          </div>

          {/* Card Action Hint */}
          <div className={styles.cardFooter}>
            <span className={styles.viewPrompt}>OPEN PROFILE →</span>
            <span className={styles.sessionLabel}>SESSION {member.session}</span>
          </div>
        </div>
      </div>

      {/* Profile Detail Modal Overlay */}
      {isModalOpen && (
        <div
          className={styles.profileBackdrop}
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Institutional Profile: ${member.name}`}
        >
          <div
            className={styles.profileModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Profile"
              autoFocus
            >
              ✕
            </button>

            <div className={styles.modalHeader}>
              {member.photo ? (
                <div className={styles.modalPhotoWrapper}>
                  <Image
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="96px"
                    className={styles.modalPortraitImage}
                  />
                </div>
              ) : (
                <div className={styles.modalMonogram}>
                  <span>{initials}</span>
                </div>
              )}
              <div>
                <span className={styles.modalTeamTag}>{`// ${member.team.toUpperCase()}`}</span>
                <h2 className={styles.modalName}>{member.name}</h2>
                <div className={styles.modalPosition}>{member.position}</div>
              </div>
            </div>

            <div className={styles.modalDetailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>DEPARTMENT</span>
                <span className={styles.detailValue}>{member.department}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>ACADEMIC STANDING</span>
                <span className={styles.detailValue}>{member.year}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>INSTITUTIONAL TENURE</span>
                <span className={styles.detailValue}>{member.session}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>ROSTER VERIFICATION</span>
                <span
                  className={`${styles.detailValue} ${
                    member.status === "VERIFIED" ? styles.verifiedColor : styles.pendingColor
                  }`}
                >
                  {member.status}
                </span>
              </div>
            </div>

            <div className={styles.modalActionRow}>
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinLink}
                data-cursor="LINKEDIN"
              >
                <span>IEEE SVCE BRANCH COMMUNITY</span>
                <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                className={styles.modalDismissBtn}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
