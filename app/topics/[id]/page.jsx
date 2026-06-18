// app/topics/[id]/page.jsx
'use client';

import { useParams } from 'next/navigation';
import * as Topic1 from '@/content/xai_lernkarten_1';
import * as Topic2 from '@/content/xai_lernkarten_2';
import * as Topic3 from '@/content/xai_lernkarten_3';
import * as Topic4 from '@/content/xai_lernkarten_4';
import * as Topic5 from '@/content/xai_lernkarten_5';
import * as Topic6 from '@/content/xai_lernkarten_6';
import * as Topic7 from '@/content/xai_lernkarten_7';
import * as Topic8 from '@/content/xai_lernkarten_8';
import { isValidTopicId, getTotalTopics } from '@/lib/topics';
import NavBar from '@/components/NavBar';

const topicModules = {
  1: Topic1,
  2: Topic2,
  3: Topic3,
  4: Topic4,
  5: Topic5,
  6: Topic6,
  7: Topic7,
  8: Topic8,
};

export default function TopicPage() {
  const params = useParams();
  const id = params.id;
  const topicId = parseInt(id);

  if (!isValidTopicId(topicId)) {
    return (
      <>
        <NavBar />
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '4rem auto',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-border-secondary)' }}>
            Topic Not Found
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
            Topic {topicId} doesn't exist yet. Available topics: 1-{getTotalTopics()}
          </p>
          <a
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--color-border-primary)',
              borderRadius: 'var(--border-radius-md)',
              color: 'var(--color-border-primary)',
              display: 'inline-block',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 10px var(--color-border-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          >
            Back to Home
          </a>
        </div>
      </>
    );
  }

  const module = topicModules[topicId];
  if (!module?.default) {
    return (
      <>
        <NavBar />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>Content not loaded yet.</p>
        </div>
      </>
    );
  }

  const Component = module.default;

  return (
    <>
      <NavBar topicId={topicId} totalTopics={getTotalTopics()} />
      <div style={{ padding: '0' }}>
        <Component />
      </div>
    </>
  );
}
