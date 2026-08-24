import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IEEE SVCE | The Living Institution",
    template: "%s | IEEE SVCE",
  },
  description:
    "IEEE Student Branch, Sri Venkateswara College of Engineering (STB 28051, Region 10). Engineering precision, research excellence, and student innovation.",
  keywords: [
    "IEEE SVCE",
    "IEEE Student Branch",
    "SVCE",
    "Engineering",
    "Research",
    "Technology",
    "Innovation",
    "Student Branch STB28051",
  ],
  authors: [{ name: "IEEE SVCE Digital Institution" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="institutional-bg-grid">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
