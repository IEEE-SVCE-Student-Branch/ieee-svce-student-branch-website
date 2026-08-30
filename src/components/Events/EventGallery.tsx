"use client";

import React, { useCallback, useEffect, useState } from "react";
import { EventGalleryImage } from "@/lib/data/events-showcase";
import { EventMedia } from "./EventMedia";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./EventIcons";
import styles from "./EventGallery.module.css";

interface EventGalleryProps {
  images: EventGalleryImage[];
  eventTitle: string;
}

export function EventGallery({ images, eventTitle }: EventGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = images.length;

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goPrev, goNext]);

  if (total === 0) return null;

  const current = images[activeIndex];

  return (
    <div className={styles.gallery}>
      <div className={styles.viewer}>
        <button
          type="button"
          className={styles.viewerButton}
          onClick={() => setLightboxOpen(true)}
          aria-label={`Expand image ${activeIndex + 1} of ${total}`}
        >
          <EventMedia
            alt={current.caption}
            label={`GALLERY IMAGE ${activeIndex + 1}`}
            src={current.src}
          />
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}

        <span className={styles.counter}>
          {activeIndex + 1} / {total}
        </span>
      </div>

      <p className={styles.caption}>{current.caption}</p>

      {total > 1 && (
        <div className={styles.thumbRow} role="tablist" aria-label={`${eventTitle} gallery thumbnails`}>
          {images.map((image, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              className={`${styles.thumbButton} ${idx === activeIndex ? styles.thumbActive : ""}`}
              onClick={() => setActiveIndex(idx)}
            >
              <EventMedia alt={image.caption} label={`${idx + 1}`} src={image.src} />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${eventTitle} gallery, expanded view`}
          onClick={() => setLightboxOpen(false)}
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
            >
              <CloseIcon />
            </button>

            <div className={styles.lightboxImageArea}>
              <EventMedia
                alt={current.caption}
                label={`GALLERY IMAGE ${activeIndex + 1}`}
                src={current.src}
              />

              {total > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.navButton} ${styles.navPrev}`}
                    onClick={goPrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    className={`${styles.navButton} ${styles.navNext}`}
                    onClick={goNext}
                    aria-label="Next image"
                  >
                    <ChevronRightIcon />
                  </button>
                </>
              )}
            </div>

            <p className={styles.lightboxCaption}>{current.caption}</p>
            <p className={styles.lightboxCounter}>
              {activeIndex + 1} / {total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}