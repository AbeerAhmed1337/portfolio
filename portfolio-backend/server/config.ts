// server/config.ts
// Centralized configuration for all thresholds, limits, and constants.

export const config = {
  // RAG / Similarity
  MIN_SIMILARITY: 0.70,       // Minimum Pinecone cosine similarity score to consider a match

  // Conversation History
  HISTORY_LIMIT: 4,           // Max messages (2 turns) to send to the LLM

  // Rate Limiting (Upstash Redis sliding window)
  RATE_LIMIT_WINDOW_SECONDS: 60,
  RATE_LIMIT_MAX_REQUESTS: 10, // Requests per window before requiring Turnstile

  // Caching (Upstash Redis TTL)
  CACHE_TTL_SECONDS: 3600,    // 1 hour TTL for cached responses

  // Input Validation
  MAX_QUERY_LENGTH: 500,       // Max characters for a user message

  // Pinecone
  PINECONE_TOP_K: 5,           // Number of top results to retrieve from Pinecone
  PINECONE_NAMESPACE: 'portfolio-abeer', // Pinecone namespace for this portfolio

  // Output filter - regex to detect sensitive secrets in LLM output
  SECRET_PATTERNS: [
    /sk-[a-zA-Z0-9]{20,}/g,                        // OpenAI / OpenRouter style API keys
    /AIza[0-9A-Za-z-_]{35}/g,                       // Google API keys
    /[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}/g, // JWT tokens
    /PINECONE_API_KEY\s*[:=]\s*[^\s]+/gi,           // Env variable leaks
    /DEEPSEEK_API_KEY\s*[:=]\s*[^\s]+/gi,
    /UPSTASH_REDIS_REST_TOKEN\s*[:=]\s*[^\s]+/gi,
    /process\.env\.[A-Z_]+/g,                       // process.env references
  ],
} as const;
