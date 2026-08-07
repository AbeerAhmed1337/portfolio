// server/services/pinecone.ts
// Pinecone vector database adapter for semantic search and metadata-filtered retrieval.

import { config } from '../config';

function getPineconeConfig() {
  const apiKey = process.env.PINECONE_API_KEY;
  const indexHost = process.env.PINECONE_INDEX_HOST;
  if (!apiKey || !indexHost) {
    throw new Error('Pinecone API key or Index Host missing from environment variables');
  }
  return { apiKey, indexHost };
}

export type PineconeMatch = {
  id: string;
  score: number;
  metadata: {
    category: string;
    source: string;
    text: string;
  };
};

export type PineconeQueryResult = {
  matches: PineconeMatch[];
  topScore: number;
};

/**
 * Query Pinecone for semantically similar documents.
 * Optionally filters by metadata category for more precise retrieval.
 *
 * @param embedding - The float32 query embedding vector
 * @param category - Optional metadata category filter (e.g. "projects", "skills")
 * @returns The top matches sorted by score (descending)
 */
export async function queryPinecone(
  embedding: number[],
  category: string | null
): Promise<PineconeQueryResult> {
  const { apiKey, indexHost } = getPineconeConfig();
  const requestBody: Record<string, unknown> = {
    vector: embedding,
    topK: config.PINECONE_TOP_K,
    includeMetadata: true,
    namespace: config.PINECONE_NAMESPACE,
  };

  // Apply metadata filter if a category was detected
  if (category) {
    requestBody.filter = { category: { $eq: category } };
  }

  const response = await fetch(`${indexHost}/query`, {
    method: 'POST',
    headers: {
      'Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pinecone query failed: ${response.status} — ${errorText}`);
  }

  const data = await response.json() as { matches: PineconeMatch[] };
  const matches = data.matches ?? [];
  const topScore = matches.length > 0 ? matches[0].score : 0;

  return { matches, topScore };
}

/**
 * Upsert document chunks into Pinecone.
 * Used by the ingestion script (scripts/ingest.ts).
 *
 * @param vectors - Array of { id, values, metadata } objects
 */
export async function upsertVectors(
  vectors: Array<{
    id: string;
    values: number[];
    metadata: { category: string; source: string; text: string };
  }>
): Promise<void> {
  const { apiKey, indexHost } = getPineconeConfig();
  const response = await fetch(`${indexHost}/vectors/upsert`, {
    method: 'POST',
    headers: {
      'Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      vectors,
      namespace: config.PINECONE_NAMESPACE,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pinecone upsert failed: ${response.status} — ${errorText}`);
  }
}
