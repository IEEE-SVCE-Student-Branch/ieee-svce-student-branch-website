import { describe, it, expect } from "vitest";
import {
  stripHtml,
  escapeHtml,
  sanitizeFilename,
  sanitizeUrl,
} from "../../../lib/security/sanitize";

describe("Security: Sanitization", () => {
  describe("stripHtml", () => {
    it("should remove HTML tags", () => {
      expect(stripHtml("<p>Hello</p>")).toBe("Hello");
      expect(stripHtml("<script>alert(1)</script>")).toBe("alert(1)");
    });

    it("should trim whitespace", () => {
      expect(stripHtml("  Hello  ")).toBe("Hello");
    });
  });

  describe("escapeHtml", () => {
    it("should escape special characters", () => {
      expect(escapeHtml('<script>alert("XSS & test")</script>')).toBe(
        "&lt;script&gt;alert(&quot;XSS &amp; test&quot;)&lt;/script&gt;"
      );
    });
  });

  describe("sanitizeFilename", () => {
    it("should remove path traversal characters", () => {
      expect(sanitizeFilename("../../../etc/passwd")).toBe("etcpasswd");
      expect(sanitizeFilename("folder/file.txt")).toBe("folderfile.txt");
    });

    it("should handle null bytes", () => {
      expect(sanitizeFilename("file\0name.txt")).toBe("filename.txt");
    });

    it("should provide a fallback for empty strings", () => {
      expect(sanitizeFilename("...")).toBe("unnamed_file");
      expect(sanitizeFilename("/")).toBe("unnamed_file");
    });
  });

  describe("sanitizeUrl", () => {
    it("should block javascript: schemes", () => {
      expect(sanitizeUrl("javascript:alert(1)")).toBeNull();
      expect(sanitizeUrl("  javascript:alert(1)  ")).toBeNull();
      expect(sanitizeUrl("JAVASCRIPT:alert(1)")).toBeNull();
    });

    it("should block data: and vbscript: schemes", () => {
      expect(sanitizeUrl("data:text/html,<script>alert(1)</script>")).toBeNull();
      expect(sanitizeUrl("vbscript:msgbox(1)")).toBeNull();
    });

    it("should allow http/https URLs", () => {
      expect(sanitizeUrl("https://ieee.org")).toBe("https://ieee.org");
      expect(sanitizeUrl("http://localhost:3000")).toBe("http://localhost:3000");
    });

    it("should allow relative URLs", () => {
      expect(sanitizeUrl("/os/dashboard")).toBe("/os/dashboard");
      expect(sanitizeUrl("#section")).toBe("#section");
    });
  });
});
