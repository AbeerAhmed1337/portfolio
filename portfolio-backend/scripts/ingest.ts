// scripts/ingest.ts
// RAG Ingestion Script — Reads knowledge/*.md files, chunks them, generates
// embeddings via DeepSeek, and upserts them into Pinecone with metadata tags.
//
// Usage: npx tsx scripts/ingest.ts
// Run this once whenever you update the knowledge base.

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env variables
try {
  process.loadEnvFile(join(__dirname, '..', '.env'));
} catch {
  // If native loadEnvFile fails or .env is not present, rely on process.env
}

import { upsertVectors } from '../server/services/pinecone';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!;
const KNOWLEDGE_DIR = join(__dirname, '..', 'knowledge');

// Map filenames to Pinecone metadata categories
const FILE_CATEGORY_MAP: Record<string, string> = {
  'identity.md': 'identity',
  'projects.md': 'projects',
  'technical_skills.md': 'skills',
  'experience.md': 'experience',
  'education.md': 'education',
  'achievements.md': 'achievements',
  'contact.md': 'contact',
  'resume.md': 'resume',
};

/** Generate embedding for a single text chunk using Pinecone Inference API */
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.pinecone.io/embed', {
    method: 'POST',
    headers: {
      'Api-Key': process.env.PINECONE_API_KEY!,
      'Content-Type': 'application/json',
      'X-Pinecone-API-Version': '2024-07',
    },
    body: JSON.stringify({
      model: 'multilingual-e5-large',
      inputs: [{ text }],
      parameters: {
        input_type: 'passage',
        truncate: 'END',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding failed: ${response.status} — ${error}`);
  }

  const data = await response.json() as { data: Array<{ values: number[] }> };
  return data.data[0].values;
}

/**
 * Split a markdown document into meaningful chunks.
 * Strategy: Split on H2/H3 headings (##/###) to preserve semantic boundaries.
 * Falls back to 800-char sliding window if no headings.
 */
function chunkDocument(content: string, filename: string): Array<{ id: string; text: string }> {
  const chunks: Array<{ id: string; text: string }> = [];

  // Split on H2 and H3 headings
  const sections = content.split(/\n(?=##)/);

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i].trim();
    if (section.length < 50) continue; // Skip tiny sections

    // If section is huge, split into sub-chunks of ~800 chars
    if (section.length > 1200) {
      const subChunks = [];
      for (let j = 0; j < section.length; j += 800) {
        subChunks.push(section.substring(j, j + 800));
      }
      subChunks.forEach((sub, j) => {
        const baseId = filename.replace('.md', '');
        chunks.push({
          id: `${baseId}-${i}-${j}`,
          text: sub,
        });
      });
    } else {
      const baseId = filename.replace('.md', '');
      chunks.push({
        id: `${baseId}-${i}`,
        text: section,
      });
    }
  }

  // Fallback if no H2 sections were found
  if (chunks.length === 0) {
    chunks.push({ id: filename.replace('.md', '') + '-0', text: content.trim() });
  }

  return chunks;
}

/** Small delay helper to respect rate limits */
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('📚 Starting RAG knowledge base ingestion...\n');

  const files = readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} knowledge files: ${files.join(', ')}\n`);

  let totalChunks = 0;
  let totalVectors: Array<{
    id: string;
    values: number[];
    metadata: { category: string; source: string; text: string };
  }> = [];

  for (const filename of files) {
    const category = FILE_CATEGORY_MAP[filename] ?? 'general';
    const filePath = join(KNOWLEDGE_DIR, filename);
    const content = readFileSync(filePath, 'utf-8');

    console.log(`📄 Processing: ${filename} → category: "${category}"`);

    const chunks = chunkDocument(content, filename);
    console.log(`   → ${chunks.length} chunks`);

    for (const chunk of chunks) {
      try {
        process.stdout.write(`   → Embedding chunk "${chunk.id}"... `);
        const embedding = await generateEmbedding(chunk.text);
        console.log(`✅ (${embedding.length} dims)`);

        totalVectors.push({
          id: chunk.id,
          values: embedding,
          metadata: {
            category,
            source: filename,
            text: chunk.text,
          },
        });

        totalChunks++;

        // Rate limit: 20 requests/min for embedding APIs
        await sleep(100);
      } catch (err) {
        console.error(`\n   ❌ Failed to embed chunk "${chunk.id}":`, err);
      }
    }

    // Upsert in batches of 100
    if (totalVectors.length >= 100) {
      console.log(`\n🚀 Upserting batch of ${totalVectors.length} vectors to Pinecone...`);
      await upsertVectors(totalVectors);
      totalVectors = [];
      console.log('   ✅ Batch upserted\n');
    }
  }

  // Upsert remaining vectors
  if (totalVectors.length > 0) {
    console.log(`\n🚀 Upserting final batch of ${totalVectors.length} vectors to Pinecone...`);
    await upsertVectors(totalVectors);
    console.log('   ✅ Final batch upserted\n');
  }

  console.log(`\n✅ Ingestion complete! ${totalChunks} chunks indexed into Pinecone.`);
  console.log('   The knowledge base is ready for semantic search.');
}

main().catch(err => {
  console.error('❌ Ingestion failed:', err);
  process.exit(1);
});
