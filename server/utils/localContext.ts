// server/utils/localContext.ts
// Static fallback maps for greetings, basic contact, and out-of-scope replies.
// These bypass Pinecone and serve direct responses for ultra-common queries.

export type LocalFallback = {
  patterns: RegExp[];
  context: string; // Static context injected into the prompt OR a direct reply
  isDirect?: boolean; // If true, skip LLM and return context directly
};

export const LOCAL_FALLBACKS: LocalFallback[] = [
  {
    patterns: [
      /^(hi|hello|hey|howdy|sup|what'?s up|good (morning|afternoon|evening))\b/i,
      /^(greetings|salaam|assalam|hola)\b/i,
    ],
    context:
      "The user is greeting you. Respond warmly and briefly introduce yourself as Abeer's portfolio assistant. Mention you can answer questions about his background, projects, skills, and how to contact him.",
    isDirect: false,
  },
  {
    patterns: [
      /how (can i|do i|to) (contact|reach|get in touch|email|message) (abeer|you|him)/i,
      /contact (abeer|info|information|details)/i,
      /email\s*(address)?/i,
    ],
    context:
      "The user wants to contact Abeer Ahmed. His contact channels are: GitHub (https://github.com/AbeerAhmed1337), LinkedIn (https://www.linkedin.com/in/abeerahmed1337/), or via the contact form at the bottom of this portfolio page. He is open to full-time roles, internships, and freelance opportunities.",
    isDirect: false,
  },
  {
    patterns: [
      /^(thanks?|thank you|ty|cheers|appreciate it|thx)\b/i,
      /^(bye|goodbye|see you|take care|later|ciao)\b/i,
    ],
    context:
      "The user is thanking you or saying goodbye. Respond warmly and briefly, and invite them to reach out to Abeer if they have more questions.",
    isDirect: false,
  },
  {
    patterns: [
      /^(who are you|what are you|what can you do|what do you know)\b/i,
      /tell me about yourself/i,
      /what is your (purpose|role|function)/i,
    ],
    context:
      "You are an AI portfolio assistant for M. Abeer Ahmed Siddiqui. You can answer questions about his background, projects (CollabriAI, Health-Chatbot, Task Management, Churn Prediction, Ticket Tagging), technical skills (React, FastAPI, LangChain, RAG, Docker, etc.), work experience (10Pearls internship), education (NED University), and how to contact him.",
    isDirect: false,
  },
];

/**
 * Check if a query matches any local greeting/fallback pattern.
 * Returns the matched LocalFallback or null.
 */
export function matchLocalFallback(query: string): LocalFallback | null {
  const trimmed = query.trim();
  for (const fallback of LOCAL_FALLBACKS) {
    for (const pattern of fallback.patterns) {
      if (pattern.test(trimmed)) {
        return fallback;
      }
    }
  }
  return null;
}
