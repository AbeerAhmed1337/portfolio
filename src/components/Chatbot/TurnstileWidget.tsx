// src/components/Chatbot/TurnstileWidget.tsx
// Dynamically loaded Cloudflare Turnstile widget.
// Only mounted when the API returns 403 TURNSTILE_REQUIRED.

import { useEffect, useRef } from 'react';

type Props = {
  siteKey: string;
  onSuccess: (token: string) => void;
  onExpire?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        theme?: 'dark' | 'light' | 'auto';
      }) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export default function TurnstileWidget({ siteKey, onSuccess, onExpire }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Load Turnstile script if not already loaded
    const existingScript = document.querySelector('script[src*="turnstile"]');

    const initTurnstile = () => {
      if (!containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onSuccess,
        'expired-callback': onExpire,
        theme: 'dark',
      });
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = initTurnstile;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      initTurnstile();
    } else {
      existingScript.addEventListener('load', initTurnstile);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [siteKey, onSuccess, onExpire]);

  return (
    <div className="chatbot-turnstile">
      <p className="chatbot-turnstile__message">
        You've sent a lot of messages! Please confirm you're human to continue.
      </p>
      <div ref={containerRef} />
    </div>
  );
}
