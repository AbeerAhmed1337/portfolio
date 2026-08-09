// src/hooks/useChat.ts
// Chat hook — manages conversation state, API calls, Turnstile challenge flow,
// and streaming message display for the portfolio AI assistant.

import { useState, useCallback, useRef } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean;
};

type ChatState = {
  messages: Message[];
  isLoading: boolean;
  requiresTurnstile: boolean;
  error: string | null;
};

const API_URL = '/api/chat';

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    requiresTurnstile: false,
    error: null,
  });

  // Store Turnstile token after user completes challenge
  const turnstileTokenRef = useRef<string | null>(null);
  // Track pending query to retry after Turnstile completion
  const pendingQueryRef = useRef<string | null>(null);

  const sendMessage = useCallback(async (userInput: string, turnstileToken?: string) => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMsgId = generateId();
    const assistantMsgId = generateId();

    setState(prev => ({
      ...prev,
      isLoading: true,
      requiresTurnstile: false,
      error: null,
      messages: [
        ...prev.messages,
        { id: userMsgId, role: 'user', content: trimmed },
        { id: assistantMsgId, role: 'assistant', content: '', isLoading: true },
      ],
    }));

    // Build history (last 4 messages, excluding the ones we just added)
    const historySnapshot = state.messages.slice(-4).map(m => ({
      role: m.role,
      content: m.content,
    }));

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = turnstileToken ?? turnstileTokenRef.current;
    if (token) {
      headers['x-turnstile-token'] = token;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: trimmed,
          history: historySnapshot,
        }),
      });

      // Handle rate limit / Turnstile challenge
      if (response.status === 403) {
        const data = await response.json() as { code?: string };
        if (data.code === 'TURNSTILE_REQUIRED') {
          pendingQueryRef.current = trimmed;
          setState(prev => ({
            ...prev,
            isLoading: false,
            requiresTurnstile: true,
            // Remove the placeholder assistant message
            messages: prev.messages.filter(m => m.id !== assistantMsgId),
          }));
          return;
        }
      }

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json() as { response: string; cached?: boolean };
      const assistantText = data.response;

      // Simulate typing for non-cached responses (better UX)
      if (!data.cached) {
        let displayed = '';
        const words = assistantText.split(' ');
        for (let i = 0; i < words.length; i++) {
          displayed += (i === 0 ? '' : ' ') + words[i];
          const snapshot = displayed;
          setState(prev => ({
            ...prev,
            messages: prev.messages.map(m =>
              m.id === assistantMsgId
                ? { ...m, content: snapshot, isLoading: i < words.length - 1 }
                : m
            ),
          }));
          // Faster for short responses, slower for long ones
          await new Promise(r => setTimeout(r, words.length < 30 ? 20 : 12));
        }
      } else {
        setState(prev => ({
          ...prev,
          messages: prev.messages.map(m =>
            m.id === assistantMsgId ? { ...m, content: assistantText, isLoading: false } : m
          ),
        }));
      }

      setState(prev => ({ ...prev, isLoading: false }));
    } catch (err) {
      console.error('[useChat] Error:', err);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Something went wrong. Please try again.',
        messages: prev.messages.map(m =>
          m.id === assistantMsgId
            ? { ...m, content: "I'm having trouble connecting. Please try again.", isLoading: false }
            : m
        ),
      }));
    }
  }, [state.messages]);

  /** Called after Turnstile challenge completes successfully */
  const onTurnstileSuccess = useCallback((token: string) => {
    turnstileTokenRef.current = token;
    const pending = pendingQueryRef.current;
    pendingQueryRef.current = null;

    setState(prev => ({ ...prev, requiresTurnstile: false }));

    if (pending) {
      sendMessage(pending, token);
    }
  }, [sendMessage]);

  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [], error: null, requiresTurnstile: false }));
    turnstileTokenRef.current = null;
    pendingQueryRef.current = null;
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    requiresTurnstile: state.requiresTurnstile,
    error: state.error,
    sendMessage,
    onTurnstileSuccess,
    clearMessages,
  };
}
