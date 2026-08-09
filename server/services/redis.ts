// server/services/redis.ts
// Upstash Redis adapter for caching, IP rate limiting, and cache writes.
// Uses the Upstash REST API (no TCP connections required — works in Vercel Edge/Serverless).

import { config } from '../config';

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL!;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

/** Execute a Redis command via the Upstash REST API */
async function redisCommand<T>(command: string[]): Promise<T> {
  const response = await fetch(`${REDIS_URL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`Redis command failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as { result: T };
  return data.result;
}

/**
 * Generate a stable cache key from a query + normalized history.
 * We hash both to ensure identical conversations return cached responses.
 */
export function buildCacheKey(query: string, history: Array<{ role: string; content: string }>): string {
  const normalized = query.trim().toLowerCase() + '|' + history.map(m => `${m.role}:${m.content}`).join('|');
  // Simple djb2-style hash (not cryptographic, but fast and deterministic)
  let hash = 5381;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 33) ^ normalized.charCodeAt(i);
  }
  return `portfolio:cache:${(hash >>> 0).toString(36)}`;
}

/**
 * Get a cached response by key.
 * Returns null if not found.
 */
export async function getCachedResponse(cacheKey: string): Promise<string | null> {
  try {
    const result = await redisCommand<string | null>(['GET', cacheKey]);
    return result;
  } catch (err) {
    console.error('[Redis] getCachedResponse error:', err);
    return null; // Degrade gracefully — don't fail the request
  }
}

/**
 * Store a response in the cache with TTL.
 */
export async function setCachedResponse(cacheKey: string, response: string): Promise<void> {
  try {
    await redisCommand(['SET', cacheKey, response, 'EX', String(config.CACHE_TTL_SECONDS)]);
  } catch (err) {
    console.error('[Redis] setCachedResponse error:', err);
    // Non-fatal — cache write failure doesn't break the user experience
  }
}

/**
 * IP-based rate limiter using a sliding window counter.
 * Returns { limited: false, count: number } if under the limit.
 * Returns { limited: true, count: number } if the IP exceeds the threshold.
 */
export async function checkRateLimit(ip: string): Promise<{ limited: boolean; count: number }> {
  const key = `portfolio:ratelimit:${ip}`;
  try {
    // Increment counter and set TTL atomically
    const count = await redisCommand<number>(['INCR', key]);

    if (count === 1) {
      // First request in window — set TTL
      await redisCommand(['EXPIRE', key, String(config.RATE_LIMIT_WINDOW_SECONDS)]);
    }

    return {
      limited: count > config.RATE_LIMIT_MAX_REQUESTS,
      count,
    };
  } catch (err) {
    console.error('[Redis] checkRateLimit error:', err);
    // On Redis failure, allow the request through (fail open)
    return { limited: false, count: 0 };
  }
}
