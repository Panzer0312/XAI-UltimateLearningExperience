'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-06-29T00:00:00').getTime();
      const now = Date.now();
      const delta = targetDate - now;

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
    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', margin: 0 }}>
      {timeLeft}
    </p>
  );
}
