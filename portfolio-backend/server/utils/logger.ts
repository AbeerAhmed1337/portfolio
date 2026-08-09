// server/utils/logger.ts
// Structured logging for latency tracking, token usage, and request audit trails.

export type RequestLog = {
  requestId: string;
  ip: string;
  query: string;
  timestamp: string;
  stage: 'rate_limit' | 'cache_hit' | 'lexical_block' | 'pinecone_miss' | 'local_fallback' | 'llm_response';
  latencyMs?: number;
  tokensUsed?: number;
  cached?: boolean;
  similarityScore?: number;
  error?: string;
};

/**
 * Simple structured logger. In production (Vercel), logs appear in function logs.
 * Could be extended to send to a logging service (e.g. Axiom, Logtail).
 */
export function logRequest(log: Partial<RequestLog> & { requestId: string; ip: string; query: string; stage: RequestLog['stage'] }) {
  const entry: RequestLog = {
    timestamp: new Date().toISOString(),
    ...log,
  };

  // Truncate query in logs for privacy
  const safeEntry = {
    ...entry,
    query: entry.query.length > 100 ? entry.query.substring(0, 100) + '...' : entry.query,
  };

  console.log(JSON.stringify(safeEntry));
}

/**
 * Generate a short request ID for tracing a single request through the pipeline.
 */
export function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

/**
 * Helper to measure elapsed time in milliseconds from a start timestamp.
 */
export function elapsedMs(startTime: number): number {
  return Math.round(performance.now() - startTime);
}
