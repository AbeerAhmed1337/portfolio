// src/components/Chatbot/index.tsx
// Root Chatbot component — orchestrates the FAB button and ChatWindow.
// Mounted at the App level as a floating overlay.

import { useState } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatWindow from './ChatWindow';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-root" aria-label="Portfolio AI Assistant">
      <ChatWindow isOpen={isOpen} />
      <ChatbotButton
        isOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      />
    </div>
  );
}
