// src/components/Chatbot/ChatbotButton.tsx
// Floating action button that toggles the chat window open/closed.

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClick: () => void;
  hasUnread?: boolean;
};

export default function ChatbotButton({ isOpen, onClick, hasUnread }: Props) {
  return (
    <motion.button
      id="chatbot-toggle-btn"
      className="chatbot-fab"
      onClick={onClick}
      aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      aria-expanded={isOpen}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={22} />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageSquare size={22} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Unread indicator pulse */}
      {!isOpen && hasUnread && (
        <motion.span
          className="chatbot-fab__pulse"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        />
      )}

      {/* Tooltip label */}
      {!isOpen && (
        <motion.span
          className="chatbot-fab__tooltip"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          Ask me anything
        </motion.span>
      )}
    </motion.button>
  );
}
