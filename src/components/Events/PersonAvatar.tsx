import React from "react";
import Image from "next/image";

interface PersonAvatarProps {
  name: string;
  photo?: string;
  size?: number;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function PersonAvatar({ name, photo, size = 64 }: PersonAvatarProps) {
  if (photo) {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image src={photo} alt={name} fill style={{ objectFit: "cover" }} sizes={`${size}px`} />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-primary-subtle)",
        color: "var(--color-primary)",
        fontFamily: "var(--font-mono)",
        fontWeight: 800,
        fontSize: size * 0.32,
      }}
      role="img"
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}