/**
 * IEEE SVCE Digital Institution — Rate Limiter
 *
 * In-memory token-bucket rate limiter. Zero external dependencies.
 * Suitable for single-instance deployments (Vercel serverless resets per cold start,
 * which is acceptable — rate limiting degrades gracefully, not catastrophically).
 *
 * For multi-instance production, replace with Redis-based limiter.
 */

interface RateLimitEntry {
  tokens: number;
  lastRefill: number;
}

interface RateLimiterOptions {
  /** Maximum number of tokens (requests) in the bucket */
  maxTokens: number;
  /** How many tokens are added per refill interval */
  refillRate: number;
  /** Refill interval in milliseconds */
  refillInterval: number;
}

export class RateLimiter {
  private buckets = new Map<string, RateLimitEntry>();
  private readonly maxTokens: number;
  private readonly refillRate: number;
  private readonly refillInterval: number;

  constructor(options: RateLimiterOptions) {
    this.maxTokens = options.maxTokens;
    this.refillRate = options.refillRate;
    this.refillInterval = options.refillInterval;
  }

  /**
   * Check if a request from `key` should be allowed.
   * Returns { allowed: boolean, remaining: number, resetMs: number }
   */
  check(key: string): { allowed: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    let entry = this.buckets.get(key);

    if (!entry) {
      entry = { tokens: this.maxTokens, lastRefill: now };
      this.buckets.set(key, entry);
    }

    // Refill tokens based on elapsed time
    const elapsed = now - entry.lastRefill;
    const tokensToAdd = Math.floor(elapsed / this.refillInterval) * this.refillRate;
    if (tokensToAdd > 0) {
      entry.tokens = Math.min(this.maxTokens, entry.tokens + tokensToAdd);
      entry.lastRefill = now;
    }

    // Consume a token
    if (entry.tokens > 0) {
      entry.tokens -= 1;
      return {
        allowed: true,
        remaining: entry.tokens,
        resetMs: this.refillInterval,
      };
    }

    // Rate limited
    const msUntilRefill = this.refillInterval - (now - entry.lastRefill);
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(msUntilRefill, 0),
    };
  }

  /** Clear expired entries to prevent memory leaks in long-running processes */
  cleanup(maxAgeMs: number = 3600000): void {
    const now = Date.now();
    for (const [key, entry] of this.buckets) {
      if (now - entry.lastRefill > maxAgeMs) {
        this.buckets.delete(key);
      }
    }
  }
}

/**
 * Pre-configured rate limiters for common use cases.
 */

/** Auth endpoints: 5 attempts per 15 minutes per IP */
export const authRateLimiter = new RateLimiter({
  maxTokens: 5,
  refillRate: 5,
  refillInterval: 15 * 60 * 1000, // 15 minutes
});

/** General API: 60 requests per minute per IP */
export const apiRateLimiter = new RateLimiter({
  maxTokens: 60,
  refillRate: 60,
  refillInterval: 60 * 1000, // 1 minute
});
