// src/components/Chatbot/ChatWindow.tsx
// The main chat window panel — messages list, input bar, suggested prompts,
// and dynamic Turnstile challenge mounting.

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Sparkles } from 'lucide-react';
import MessageItem from './MessageItem';
import TurnstileWidget from './TurnstileWidget';
import { useChat } from '../../hooks/useChat';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '';

const SUGGESTED_PROMPTS = [
  "What projects has Abeer built?",
  "What is Abeer's tech stack?",
  "Tell me about his experience at 10Pearls",
  "How can I contact Abeer?",
];

type Props = {
  isOpen: boolean;
};

export default function ChatWindow({ isOpen }: Props) {
  const { messages, isLoading, requiresTurnstile, error, sendMessage, onTurnstileSuccess, clearMessages } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  function handleSuggestedPrompt(prompt: string) {
    sendMessage(prompt);
  }

  const isEmpty = messages.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="chatbot-window"
          className="chatbot-window"
          role="dialog"
          aria-label="AI Portfolio Assistant"
          aria-modal="true"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__identity">
              <div className="chatbot-header__avatar">
                <Sparkles size={14} />
              </div>
              <div>
                <p className="chatbot-header__name">Abeer's Assistant</p>
                <p className="chatbot-header__status">
                  <span className="chatbot-header__dot" aria-hidden="true" />
                  Online
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                className="chatbot-header__clear"
                onClick={clearMessages}
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="chatbot-messages" aria-live="polite" aria-label="Conversation">
            {isEmpty ? (
              <div className="chatbot-welcome">
                <div className="chatbot-welcome__avatar">
                  <Sparkles size={22} />
                </div>
                <h3 className="chatbot-welcome__title">Hi! I'm Abeer's assistant.</h3>
                <p className="chatbot-welcome__subtitle">
                  Ask me anything about his background, projects, skills, or how to reach him.
                </p>
                <div className="chatbot-suggestions" role="list">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      className="chatbot-suggestion-chip"
                      onClick={() => handleSuggestedPrompt(prompt)}
                      role="listitem"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map(msg => <MessageItem key={msg.id} message={msg} />)
            )}

            {/* Turnstile challenge */}
            <AnimatePresence>
              {requiresTurnstile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <TurnstileWidget
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={onTurnstileSuccess}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="chatbot-error">{error}</p>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <form className="chatbot-input-bar" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              id="chatbot-input"
              className="chatbot-input"
              placeholder="Ask about Abeer's projects, skills..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              maxLength={500}
              aria-label="Chat input"
              disabled={isLoading || requiresTurnstile}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              aria-label="Send message"
              disabled={!input.trim() || isLoading || requiresTurnstile}
            >
              <Send size={16} />
            </button>
          </form>

          {/* Disclaimer */}
          <p className="chatbot-disclaimer">
            AI assistant · Answers about Abeer Ahmed only
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
