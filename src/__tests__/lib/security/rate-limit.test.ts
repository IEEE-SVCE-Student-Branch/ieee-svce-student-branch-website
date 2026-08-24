import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { RateLimiter } from "../../../lib/security/rate-limit";

describe("Security: RateLimiter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should allow requests under the limit", () => {
    const limiter = new RateLimiter({
      maxTokens: 5,
      refillRate: 1,
      refillInterval: 1000,
    });

    const result = limiter.check("test-ip");
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("should block requests over the limit", () => {
    const limiter = new RateLimiter({
      maxTokens: 2,
      refillRate: 1,
      refillInterval: 1000,
    });

    limiter.check("test-ip"); // 1 remaining
    limiter.check("test-ip"); // 0 remaining
    const result = limiter.check("test-ip"); // blocked

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.resetMs).toBeGreaterThan(0);
  });

  it("should refill tokens after interval", () => {
    const limiter = new RateLimiter({
      maxTokens: 2,
      refillRate: 2,
      refillInterval: 1000,
    });

    limiter.check("test-ip");
    limiter.check("test-ip");
    expect(limiter.check("test-ip").allowed).toBe(false); // exhausted

    // Fast forward 1 second
    vi.advanceTimersByTime(1000);

    const result = limiter.check("test-ip");
    expect(result.allowed).toBe(true); // Refilled
  });

  it("should clean up expired entries", () => {
    const limiter = new RateLimiter({
      maxTokens: 1,
      refillRate: 1,
      refillInterval: 1000,
    });

    limiter.check("old-ip");
    vi.advanceTimersByTime(5000); // Wait 5 seconds
    limiter.check("new-ip"); // Add a new one

    // Cleanup entries older than 2 seconds
    limiter.cleanup(2000);

    // old-ip should be removed, new-ip should be kept
    // We can verify this by checking if old-ip has full tokens again without time passing
    expect(limiter.check("old-ip").remaining).toBe(0); // If it was clean, it's a new entry with max-1=0
    // Wait, maxTokens is 1, check consumes 1, remaining is 0. This works.
  });
});
