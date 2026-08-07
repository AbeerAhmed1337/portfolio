// server/guardrails/inputShield.ts
// Gate 1 & 2: Input validation, length checks, history capping, and lexical filtering.

import { config } from '../config';

export type ShieldResult =
  | { allowed: true }
  | { allowed: false; reason: string; statusCode: 400 | 422 };

/** Patterns that indicate blatantly out-of-scope requests */
const OUT_OF_SCOPE_PATTERNS: RegExp[] = [
  // Programming/code tasks
  /\b(write|generate|create|build|code|implement|make me|give me|show me)\s+(a\s+)?(python|javascript|java|c\+\+|ruby|php|script|program|function|class|algorithm)\b/i,
  /\b(debug|fix|refactor|optimize)\s+(this|my|the|a)\s+(code|function|script|program)\b/i,
  // Math / calculations
  /\b(calculate|compute|solve|what is)\s+[\d\s\+\-\*\/\^%()]+/i,
  /\bmath(ematics)?\b.*(problem|equation|formula)/i,
  // General knowledge / off-topic
  /\b(who is|what is|explain|tell me about)\s+(donald trump|elon musk|politics|religion|god|covid|vaccine|history of|geography)/i,
  /\b(write|create|generate)\s+(an?\s+)?(essay|story|poem|letter|email|blog|article)\b/i,
  // Prompt injection attempts
  /\b(ignore|forget|override|disregard)\s+(previous|prior|all|your|the)\s+(instructions?|prompt|system|rules?|context)/i,
  /you are now|pretend (to be|you are)|act as (if|a|an)/i,
  /\[INST\]|\[\/INST\]|<\|system\|>|<\|user\|>/i, // Known injection markers
];

/**
 * Sanitize and validate the incoming user query.
 * Returns { allowed: true } if it passes, or a rejection reason.
 */
export function validateInput(query: unknown): ShieldResult {
  if (typeof query !== 'string') {
    return { allowed: false, reason: 'Query must be a string.', statusCode: 400 };
  }

  const trimmed = query.trim();

  if (trimmed.length === 0) {
    return { allowed: false, reason: 'Query cannot be empty.', statusCode: 400 };
  }

  if (trimmed.length > config.MAX_QUERY_LENGTH) {
    return {
      allowed: false,
      reason: `Query exceeds maximum length of ${config.MAX_QUERY_LENGTH} characters.`,
      statusCode: 422,
    };
  }

  return { allowed: true };
}

/**
 * Lexical shield — fast regex-based check for blatantly out-of-scope queries.
 * Returns true if the query should be BLOCKED (i.e., it's off-topic).
 */
export function isLexicallyBlocked(query: string): boolean {
  for (const pattern of OUT_OF_SCOPE_PATTERNS) {
    if (pattern.test(query)) {
      return true;
    }
  }
  return false;
}

/**
 * Cap conversation history to the last N messages (from config.HISTORY_LIMIT).
 * Ensures we never send more than HISTORY_LIMIT messages to the LLM.
 */
export function capHistory(
  history: Array<{ role: string; content: string }>
): Array<{ role: string; content: string }> {
  if (!Array.isArray(history)) return [];
  // Keep only the last N messages
  return history.slice(-config.HISTORY_LIMIT);
}

/**
 * Keyword-based metadata category extraction for Pinecone filter routing.
 * Returns a category string if detected, otherwise null (no filter applied).
 */
export function extractMetadataCategory(query: string): string | null {
  const lower = query.toLowerCase();

  if (/\b(project|built|made|created|collabriai|chatbot|churn|ticket|task|kanban)\b/.test(lower)) {
    return 'projects';
  }
  if (/\b(skill|tech|technology|stack|react|fastapi|langchain|docker|python|typescript|frontend|backend)\b/.test(lower)) {
    return 'skills';
  }
  if (/\b(experience|job|work|intern|10pearls|kda|company|employ|role)\b/.test(lower)) {
    return 'experience';
  }
  if (/\b(education|university|ned|degree|study|graduate|gpa|course)\b/.test(lower)) {
    return 'education';
  }
  if (/\b(contact|reach|email|linkedin|github|hire|connect|message)\b/.test(lower)) {
    return 'contact';
  }
  if (/\b(achievement|award|accomplish|proud|highlight|notable)\b/.test(lower)) {
    return 'achievements';
  }

  return null; // No specific category, search all
}
