// src/components/Chatbot/MessageItem.tsx
// Renders a single chat message (user or assistant) with typing indicator.

import { motion } from 'framer-motion';
import type { Message } from '../../hooks/useChat';

type Props = {
  message: Message;
};

/** Animated typing dots for loading state */
function TypingDots() {
  return (
    <span className="chat-typing-dots" aria-label="Thinking...">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function MessageItem({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`chat-message chat-message--${isUser ? 'user' : 'assistant'}`}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {!isUser && (
        <div className="chat-message__avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        </div>
      )}

      <div className="chat-message__bubble">
        {message.isLoading && !message.content ? (
          <TypingDots />
        ) : (
          <p className="chat-message__text">{message.content}</p>
        )}
      </div>
    </motion.div>
  );
}
