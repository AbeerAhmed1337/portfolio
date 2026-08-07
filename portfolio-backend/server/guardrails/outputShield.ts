// server/guardrails/outputShield.ts
// Gate 4: Output filtering — redacts secrets/credentials only, not technical terms.

import { config } from '../config';

/**
 * Filter LLM output to redact any accidentally leaked secrets or credentials.
 * Does NOT block technical terms like React, SQL, Docker, FastAPI, etc.
 *
 * @param output - Raw LLM output string
 * @returns Sanitized output string
 */
export function filterOutput(output: string): string {
  let filtered = output;

  for (const pattern of config.SECRET_PATTERNS) {
    // Reset lastIndex for global regexes
    pattern.lastIndex = 0;
    filtered = filtered.replace(pattern, '[REDACTED]');
  }

  return filtered;
}

/**
 * Check if the output was modified (i.e., secrets were found and redacted).
 */
export function wasRedacted(original: string, filtered: string): boolean {
  return original !== filtered;
}
