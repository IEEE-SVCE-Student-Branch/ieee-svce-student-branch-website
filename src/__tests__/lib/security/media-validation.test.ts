import { describe, it, expect } from "vitest";
import {
  validateMedia,
  generateSafeFilename,
  MAX_FILE_SIZE,
} from "../../../lib/security/media-validation";

describe("Security: Media Validation", () => {
  it("should reject files over the size limit", () => {
    const buffer = new Uint8Array([0xff, 0xd8, 0xff]); // JPEG
    const result = validateMedia(buffer, MAX_FILE_SIZE + 1, "test.jpg");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("exceeds maximum size");
  });

  it("should reject empty files", () => {
    const result = validateMedia(new Uint8Array([]), 0, "test.jpg");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("File is empty");
  });

  it("should identify valid JPEG by magic bytes", () => {
    const buffer = new Uint8Array([0xff, 0xd8, 0xff, 0x12, 0x34]);
    const result = validateMedia(buffer, 100, "fake.png"); // Maliciously renamed
    expect(result.valid).toBe(true);
    expect(result.detectedType).toBe("jpeg");
  });

  it("should identify valid PNG by magic bytes", () => {
    const buffer = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const result = validateMedia(buffer, 100, "image.png");
    expect(result.valid).toBe(true);
    expect(result.detectedType).toBe("png");
  });

  it("should identify valid PDF by magic bytes", () => {
    const buffer = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]); // %PDF-
    const result = validateMedia(buffer, 100, "doc.pdf");
    expect(result.valid).toBe(true);
    expect(result.detectedType).toBe("pdf");
  });

  it("should explicitly reject SVG (no magic byte match)", () => {
    // SVG starts with <?xml or <svg
    const buffer = new TextEncoder().encode('<?xml version="1.0"?><svg></svg>');
    const result = validateMedia(buffer, 100, "vector.svg");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("File type not allowed");
  });

  describe("generateSafeFilename", () => {
    it("should generate a safe filename with correct extension", () => {
      const name = generateSafeFilename("jpeg", "avatar");
      expect(name).toMatch(/^avatar_\d+_[a-z0-9]{6}\.jpg$/);
    });

    it("should generate a safe filename for pdf", () => {
      const name = generateSafeFilename("pdf", "report");
      expect(name).toMatch(/^report_\d+_[a-z0-9]{6}\.pdf$/);
    });
  });
});
