"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DISCOVERY_CATALOG } from "@/lib/data/discovery";
import styles from "./SearchModal.module.css";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K trigger handled in SiteHeader, Esc closes
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = DISCOVERY_CATALOG.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
      item.provenance.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Institutional Records"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <svg
            className={styles.searchIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search events, projects, achievements, archive records..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search query"
          />
          <span className={styles.kbdTag}>ESC</span>
        </div>

        <div className={styles.resultsList}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Link key={item.id} href={item.route} onClick={onClose} className={styles.resultItem}>
                <div className={styles.resultHeader}>
                  <span className={styles.resultCategory}>{item.categoryLabel}</span>
                  <span className={styles.resultProvenance}>{item.provenance}</span>
                </div>
                <div className={styles.resultTitle}>{item.title}</div>
                <div className={styles.resultSummary}>{item.summary}</div>
              </Link>
            ))
          ) : (
            <div className={styles.emptyState}>
              No verified records matching &ldquo;{query}&rdquo; found.
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <span>IEEE SVCE VERIFIED REPOSITORY</span>
          <span>{filteredItems.length} ARTIFACTS INDEXED</span>
        </div>
      </div>
    </div>
  );
}
