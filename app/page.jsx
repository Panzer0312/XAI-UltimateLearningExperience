'use client';

import Link from 'next/link';
import Starfield from '@/components/Starfield';
import QuoteRotator from '@/components/QuoteRotator';
import Countdown from '@/components/Countdown';
import { topicLabels, getTotalTopics } from '@/lib/topics';

export default function Home() {
  const totalTopics = getTotalTopics();

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Starfield />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 2rem',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              background: 'var(--color-accent-rainbow)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(0, 217, 255, 0.3)',
              filter: 'drop-shadow(0 0 20px rgba(0, 217, 255, 0.2))',
            }}
            className="neon-glow"
          >
            XAI Learning Hub
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
            Explainability in Machine Learning
          </p>
        </div>

        {/* Quote Rotator */}
        <QuoteRotator />

        {/* Topic Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {Array.from({ length: totalTopics }, (_, i) => i + 1).map((num) => (
            <Link
              key={num}
              href={`/topics/${num}`}
              style={{
                padding: '1.5rem',
                background: 'var(--color-background-secondary)',
                border: `2px solid var(--color-border-primary)`,
                borderRadius: 'var(--border-radius-lg)',
                textDecoration: 'none',
                color: 'var(--color-text-primary)',
                transition: 'all 0.15s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-secondary)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-primary)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--color-border-secondary)',
                  }}
                >
                  {num}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
                  {totalTopics > 0 ? 'of ' + totalTopics : ''}
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                {topicLabels[num] || `Topic ${num}`}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Click to explore →
              </p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border-tertiary)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
            XAI Learning Materials · Hochschule Karlsruhe · Summer 2026
          </p>
          <Countdown />
        </div>
      </div>
    </div>
  );
}
