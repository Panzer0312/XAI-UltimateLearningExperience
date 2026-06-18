'use client';

import { useState, useEffect } from 'react';

const getPanicLevel = (delta) => {
  const days = Math.floor(delta / 86400000);
  if (delta <= 0) return "💀 It's today. YOU GOT THIS (no choice).";
  if (days <= 3) return '☠️☠️☠️ RIP. Good luck.';
  if (days <= 7) return '🔥 SEND HELP';
  if (days <= 14) return '😰 Panic Mode';
  if (days <= 30) return '😬 Getting Real';
  return '😎 Chill Mode';
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState('');
  const [panicLevel, setPanicLevel] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-06-29T00:00:00').getTime();
      const now = Date.now();
      const delta = targetDate - now;

      setPanicLevel(getPanicLevel(delta));

      if (delta <= 0) {
        return 'Shaun wa mal was es gebracht hat';
      }

      const days = Math.floor(delta / 86400000);
      const hours = Math.floor((delta % 86400000) / 3600000);
      const minutes = Math.floor((delta % 3600000) / 60000);
      const seconds = Math.floor((delta % 60000) / 1000);

      return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`;
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', margin: 0 }}>
        {timeLeft}
      </p>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-border-secondary)', marginTop: '0.5rem', fontWeight: 600, margin: '0.5rem 0 0' }}>
        {panicLevel}
      </p>
    </>
  );
}
