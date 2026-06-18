// components/NavBar.jsx
'use client';

import Link from 'next/link';

export default function NavBar({ topicId, totalTopics }) {
  return (
    <nav
      style={{
        padding: '1.5rem 2rem',
        borderBottom: '1px solid var(--color-border-tertiary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--color-background-secondary)',
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: '0.9rem',
          padding: '0.5rem 1rem',
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--border-radius-md)',
          color: 'var(--color-border-primary)',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 0 10px var(--color-border-primary)';
          e.target.style.backgroundColor = 'rgba(0, 217, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = 'none';
          e.target.style.backgroundColor = 'transparent';
        }}
      >
        ← Home
      </Link>
      {topicId && totalTopics && (
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
          Topic {topicId} of {totalTopics}
        </span>
      )}
    </nav>
  );
}
