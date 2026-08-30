"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageGlyphIcon } from "./EventIcons";
import styles from "./EventMedia.module.css";

interface EventMediaProps {
  src?: string;
  alt: string;
  label: string;
  fit?: "cover" | "contain";
}

export function EventMedia({
  src,
  alt,
  label,
  fit = "cover",
}: EventMediaProps) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <div className={styles.media}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: fit }}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={styles.media} role="img" aria-label={alt}>
      <div className={styles.inner}>
        <ImageGlyphIcon size={30} className={styles.glyph} />
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}