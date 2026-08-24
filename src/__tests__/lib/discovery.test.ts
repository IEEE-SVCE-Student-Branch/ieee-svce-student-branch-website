import { describe, it, expect } from "vitest";
import { DISCOVERY_CATALOG, getRandomDiscovery } from "@/lib/data/discovery";
import { VERIFIED_CERTIFICATES_CATALOG } from "@/lib/data/branch-data";

describe("Discovery Engine (The Signal Field)", () => {
  it("contains items across primary discovery categories", () => {
    expect(DISCOVERY_CATALOG.length).toBeGreaterThanOrEqual(7);

    const categories = new Set(DISCOVERY_CATALOG.map((item) => item.category));
    expect(categories.has("event")).toBe(true);
    expect(categories.has("project")).toBe(true);
    expect(categories.has("achievement")).toBe(true);
    expect(categories.has("person")).toBe(true);
    expect(categories.has("article")).toBe(true);
    expect(categories.has("media")).toBe(true);
    expect(categories.has("certificate")).toBe(true);
  });

  it("ensures every discovery item has valid route, title, and provenance", () => {
    for (const item of DISCOVERY_CATALOG) {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.summary).toBeTruthy();
      expect(item.route.startsWith("/")).toBe(true);
      expect(item.provenance).toBeTruthy();
      expect(item.categoryLabel).toBeTruthy();
    }
  });

  it("returns a valid discovery item when called", () => {
    const item = getRandomDiscovery();
    expect(item).toBeDefined();
    expect(DISCOVERY_CATALOG).toContain(item);
  });

  it("excludes current item when excludeId is passed and alternate is available", () => {
    const firstItem = DISCOVERY_CATALOG[0];
    const nextItem = getRandomDiscovery(firstItem.id);
    expect(nextItem.id).not.toBe(firstItem.id);
  });
});

describe("Certificate Verification Registry", () => {
  it("contains valid verified sample certificates with cryptographic hashes", () => {
    expect(VERIFIED_CERTIFICATES_CATALOG.length).toBeGreaterThanOrEqual(3);
    for (const cert of VERIFIED_CERTIFICATES_CATALOG) {
      expect(cert.certificateId).toBeTruthy();
      expect(cert.recipientName).toBeTruthy();
      expect(cert.eventTitle).toBeTruthy();
      expect(cert.verificationHash.startsWith("0x")).toBe(true);
      expect(cert.signatory).toBeTruthy();
    }
  });
});
