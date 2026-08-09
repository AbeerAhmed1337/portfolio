// api/chat.ts
// Vercel Serverless Function — Main entry point for the AI Portfolio Assistant.
// Implements the 4-gate security + RAG pipeline from the architecture document.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateInput, isLexicallyBlocked, capHistory, extractMetadataCategory } from '../server/guardrails/inputShield';
import { filterOutput } from '../server/guardrails/outputShield';
import { checkRateLimit, buildCacheKey, getCachedResponse, setCachedResponse } from '../server/services/redis';
import { queryPinecone } from '../server/services/pinecone';
import { assemblePrompt, callDeepSeek } from '../server/services/deepseek';
import { verifyTurnstileToken } from '../server/services/turnstile';
import { matchLocalFallback } from '../server/utils/localContext';
import { logRequest, generateRequestId, elapsedMs } from '../server/utils/logger';
import { config } from '../server/config';

const PINECONE_API_KEY = process.env.PINECONE_API_KEY!;

/** Generate text embedding using Pinecone Inference API */
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.pinecone.io/embed', {
    method: 'POST',
    headers: {
      'Api-Key': PINECONE_API_KEY,
      'Content-Type': 'application/json',
      'X-Pinecone-API-Version': '2024-07',
    },
    body: JSON.stringify({
      model: 'multilingual-e5-large',
      inputs: [{ text }],
      parameters: {
        input_type: 'query',
        truncate: 'END',
      },
    }),
  });

  if (!response.ok) {
    console.error('[Embed] Embedding generation failed:', response.status);
    throw new Error('Embedding generation failed');
  }

  const data = await response.json() as { data: Array<{ values: number[] }> };
  return data.data[0].values;
}

/** Standard fallback response for out-of-scope queries */
function outOfScopeResponse(): string {
  return "I'm here to answer questions specifically about Abeer Ahmed's background, projects, skills, and how to contact him. I'm not able to help with that topic. Is there something about Abeer I can help you with?";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = performance.now();
  const requestId = generateRequestId();

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for required API keys
  if (!process.env.DEEPSEEK_API_KEY || !process.env.PINECONE_API_KEY) {
    console.error('[API Error] DEEPSEEK_API_KEY or PINECONE_API_KEY is not set in environment variables.');
    return res.status(500).json({
      error: 'Backend API keys are not configured. Please set DEEPSEEK_API_KEY and PINECONE_API_KEY in your environment variables.',
    });
  }

  // Extract IP address (Vercel provides this via x-forwarded-for)
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
    req.socket?.remoteAddress ??
    'unknown';

  const { query, history = [] } = req.body as {
    query: unknown;
    history?: Array<{ role: string; content: string }>;
  };

  // ─────────────────────────────────────────────────────────────────────
  // GATE 1: Input Validation & Rate Limiting
  // ─────────────────────────────────────────────────────────────────────
  const inputValidation = validateInput(query);
  if (!inputValidation.allowed) {
    logRequest({ requestId, ip, query: String(query ?? ''), stage: 'rate_limit', error: inputValidation.reason });
    return res.status(inputValidation.statusCode).json({ error: inputValidation.reason });
  }

  const userQuery = (query as string).trim();

  // Rate limit check
  const { limited, count } = await checkRateLimit(ip);
  if (limited) {
    // Check if Turnstile token was provided
    const turnstileToken = req.headers['x-turnstile-token'] as string | undefined;

    if (!turnstileToken) {
      logRequest({ requestId, ip, query: userQuery, stage: 'rate_limit', latencyMs: elapsedMs(startTime) });
      return res.status(403).json({
        error: 'Challenge required',
        code: 'TURNSTILE_REQUIRED',
        message: 'Too many requests. Please complete the challenge to continue.',
      });
    }

    // Verify Turnstile token
    const turnstileResult = await verifyTurnstileToken(turnstileToken, ip);
    if (!turnstileResult.success) {
      return res.status(403).json({
        error: 'Challenge verification failed',
        code: 'TURNSTILE_INVALID',
      });
    }
  }

  // Cap history to last 4 messages (2 turns)
  const cappedHistory = capHistory(history);

  // ─────────────────────────────────────────────────────────────────────
  // GATE 2: Cache Check & Lexical Screening
  // ─────────────────────────────────────────────────────────────────────
  const cacheKey = buildCacheKey(userQuery, cappedHistory);
  const cached = await getCachedResponse(cacheKey);

  if (cached) {
    logRequest({ requestId, ip, query: userQuery, stage: 'cache_hit', latencyMs: elapsedMs(startTime), cached: true });
    return res.status(200).json({ response: cached, cached: true });
  }

  // Lexical shield — fast regex check for blatantly off-topic queries
  if (isLexicallyBlocked(userQuery)) {
    const fallback = outOfScopeResponse();
    logRequest({ requestId, ip, query: userQuery, stage: 'lexical_block', latencyMs: elapsedMs(startTime) });
    return res.status(200).json({ response: fallback, cached: false });
  }

  // ─────────────────────────────────────────────────────────────────────
  // GATE 3: RAG — Embedding, Pinecone Query, Similarity Check
  // ─────────────────────────────────────────────────────────────────────

  // Check for local fallback first (greetings, contact queries)
  const localFallback = matchLocalFallback(userQuery);

  let context = '';
  let similarityScore = 0;
  let usedLocalFallback = false;

  if (localFallback) {
    context = localFallback.context;
    usedLocalFallback = true;
    logRequest({ requestId, ip, query: userQuery, stage: 'local_fallback', latencyMs: elapsedMs(startTime) });

    // If it's a direct reply, skip LLM entirely
    if (localFallback.isDirect) {
      return res.status(200).json({ response: context, cached: false });
    }
  } else {
    // Generate embedding and query Pinecone
    let embedding: number[];
    try {
      embedding = await generateEmbedding(userQuery);
    } catch {
      // If embedding fails, try local fallback or return error
      return res.status(200).json({
        response: "I'm having a moment — please try again shortly!",
        cached: false,
      });
    }

    const category = extractMetadataCategory(userQuery);

    try {
      const { matches, topScore } = await queryPinecone(embedding, category);
      similarityScore = topScore;

      if (topScore < config.MIN_SIMILARITY) {
        // Similarity too low — query is likely out of scope
        const fallbackCheck = matchLocalFallback(userQuery);
        if (fallbackCheck) {
          context = fallbackCheck.context;
          usedLocalFallback = true;
        } else {
          const fallback = outOfScopeResponse();
          logRequest({ requestId, ip, query: userQuery, stage: 'pinecone_miss', similarityScore, latencyMs: elapsedMs(startTime) });
          return res.status(200).json({ response: fallback, cached: false });
        }
      } else {
        // Build context from top matching documents
        context = matches
          .filter(m => m.score >= config.MIN_SIMILARITY)
          .map(m => m.metadata.text)
          .join('\n\n---\n\n');
      }
    } catch (err) {
      console.error('[Pinecone] Query error:', err);
      return res.status(500).json({ error: 'Knowledge base unavailable. Please try again.' });
    }
  }

  // ─────────────────────────────────────────────────────────────────────
  // GATE 4: LLM Call & Output Filtering
  // ─────────────────────────────────────────────────────────────────────
  const messages = assemblePrompt(userQuery, context, cappedHistory);

  let rawResponse: string;
  try {
    rawResponse = await callDeepSeek(messages);
  } catch (err) {
    console.error('[DeepSeek] LLM error:', err);
    return res.status(500).json({ error: 'AI response unavailable. Please try again.' });
  }

  // Output filtering — redact any accidentally leaked secrets
  const filteredResponse = filterOutput(rawResponse);

  // Cache the successful response
  await setCachedResponse(cacheKey, filteredResponse);

  logRequest({
    requestId,
    ip,
    query: userQuery,
    stage: 'llm_response',
    latencyMs: elapsedMs(startTime),
    similarityScore,
    cached: false,
  });

  return res.status(200).json({
    response: filteredResponse,
    cached: false,
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        requestId,
        similarityScore,
        usedLocalFallback,
        historyCount: cappedHistory.length,
        ipRequestCount: count,
      },
    }),
  });
}
