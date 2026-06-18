# XAI Learning Hub

A Next.js learning site with dark cyberpunk aesthetic for exploring explainable AI topics.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Structure

- `/app` — Next.js App Router pages
- `/components` — Reusable React components (Starfield, QuoteRotator, NavBar)
- `/lib` — Utilities, quotes, metadata, topic helpers
- `/content` — Learning topic components (one per PDF)
- `/styles` — Global CSS with dark cyberpunk theme

## Adding Topics

Create `content/xai_lernkarten_N.jsx` following the structure in `xai_lernkarten_1.jsx`:

```javascript
export const summary = [
  {
    title: "Topic Name",
    color: "#EEEDFE",
    border: "#534AB7",
    text: "#3C3489",
    points: [ /* bullet points */ ]
  },
  // ... more topics
];

export const cards = [
  { q: "Question?", a: "Answer." },
  // ... Q&A cards
];

export default function LearningComponent() {
  // Reuse existing component logic
}
```

Then add to `app/topics/[id]/page.jsx`:

```javascript
import * as TopicN from '@/content/xai_lernkarten_N';
const topicModules = { /* ... */, N: TopicN };
```

Update `lib/topics.js` with the topic label.

## Tech Stack

- Next.js 14+
- React 18+
- Vanilla CSS (no UI libraries)

## Design

Dark cyberpunk theme with:
- Neon cyan (#00d9ff) and magenta (#ff00ff) accents
- Animated starfield background on landing page
- Rotating funny ML/XAI quotes
- Rainbow gradient effects
- Responsive grid layout for topics
