import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Signal } from "@/components/Signal";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: "IEEE SVCE | The Signal Field",
    template: "%s | IEEE SVCE",
  },
  description:
    "Official portal for IEEE Student Branch, Sri Venkateswara College of Engineering (STB 28051, Region 10). A living digital institution of engineering precision, technical events, research labs, and institutional archive.",
};

/**
 * Public site layout.
 * Wraps all pages under /(public)/ route group.
 * Atmospheric cool surface system, custom cursor, signal opening reveal, SiteHeader, and SiteFooter.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Restrained Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Signal Grid Background Overlay */}
      <div className="signal-grid-overlay" aria-hidden="true" />

      {/* Signature Brand Signal Reveal initialization */}
      <Signal />

      {/* Institutional Topbar Header */}
      <SiteHeader />

      {/* Main Public Experience */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      {/* Institutional Footer */}
      <SiteFooter />
    </>
  );
}
