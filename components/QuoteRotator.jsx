// components/QuoteRotator.jsx
'use client';

import { useState, useEffect } from 'react';
import { quotes } from '@/lib/quotes';

export default function QuoteRotator() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '3rem',
        minHeight: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
          maxWidth: '600px',
          lineHeight: 1.8,
          animation: 'fadeInOut 5s ease-in-out',
        }}
      >
        "{quotes[currentQuote]}"
      </p>
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
