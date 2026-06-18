---
name: xai-learning-site-design
description: Next.js learning site with dark cyberpunk landing page, routing between 9 XAI PDF topics, animated starfield, rotating quotes
metadata:
  type: design
  created: 2026-06-18
  status: approved
---

# XAI Learning Site Design

## Overview

Single Next.js application serving 9 topic pages (one per XAI PDF). Dark cyberpunk landing page with rainbow accents, animated starfield, and rotating ML/XAI-themed quotes. File-based routing for scalability. Local development only.

## Project Structure

```
xai-learning/
├── app/
│   ├── layout.jsx              # Global layout + dark theme
│   ├── page.jsx                # Landing page
│   └── topics/
│       └── [id]/
│           └── page.jsx        # Dynamic topic detail page
├── components/
│   ├── Starfield.jsx           # Animated stars/particles background
│   ├── QuoteRotator.jsx        # Rotating funny quotes display
│   └── NavBar.jsx              # Navigation with back-to-home
├── lib/
│   ├── quotes.js               # Hardcoded ML/XAI funny quotes (German)
│   └── topics.js               # Topic helpers/constants
├── content/
│   ├── xai_lernkarten_1.jsx    # PDF 1 (existing, reusable)
│   ├── xai_lernkarten_2.jsx    # PDF 2 (future)
│   └── ... up to 9
├── styles/
│   └── globals.css             # Dark cyberpunk theme + CSS variables
├── package.json
└── next.config.js
```

## Content Organization

### PDF Files as React Components

Each `xai_lernkarten_N.jsx` file exports:

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
  // Existing component logic: tabs, flashcards, progress tracking
}
```

Current `xai_lernkarten.jsx` is renamed to `xai_lernkarten_1.jsx` with no changes to structure.

### Dynamic Routing

File `app/topics/[id]/page.jsx` dynamically imports topic modules:

```javascript
import * as Topic1 from '@/content/xai_lernkarten_1';
import * as Topic2 from '@/content/xai_lernkarten_2';
// ... import up to Topic9

const topicModules = {
  1: Topic1, 2: Topic2, /* ... */ 9: Topic9
};

export default function TopicPage({ params }) {
  const id = parseInt(params.id);
  const module = topicModules[id];
  
  if (!module?.default) {
    return <div className="not-found">Topic {id} not found</div>;
  }
  
  return (
    <>
      <NavBar topicId={id} totalTopics={9} />
      <module.default />
    </>
  );
}
```

To add a new topic later: create `xai_lernkarten_10.jsx` and add one import + one entry to `topicModules`.

## Landing Page Design

### Visual Elements

- **Background:** Dark cyberpunk (navy/black gradient, #0f1419)
- **Starfield:** Animated canvas/CSS particles (stars twinkling, optional parallax)
- **Rainbow Accent:** Neon gradient (cyan → magenta → yellow) used on borders, glowing text, or accent lines
- **Typography:** Bold, high-contrast white text on dark background

### Content Structure

1. **Header**
   - Site title: "XAI Learning Hub" (or similar, with rainbow glow effect)
   - Subtitle: "Explainability in Machine Learning"

2. **Featured Quote**
   - `QuoteRotator` component displays rotating funny ML/XAI quotes (German)
   - Rotates every 5 seconds
   - Quotes sourced from hardcoded list in `lib/quotes.js`

3. **Topic Grid**
   - 9 cards arranged in grid (3×3 or responsive layout)
   - Each card: dark box with neon border (cyan/magenta), hover glow effect
   - Card shows: Topic number (1-9) + brief label (e.g., "Motivation für XAI", "ML-Modelltypen")
   - Click to navigate to `/topics/[id]`

### Sample Funny Quotes

- "Explainability: Because 'the neural network said so' isn't accepted in court."
- "Neural Networks: 90% Matrix multiplications, 10% hope."
- "SHAP values: Explaining why your model is wrong, but mathematically."
- "If you can't explain it simply, you probably don't understand it. —ML Engineers explaining their models"

(German versions to be written)

## Topic Pages

### Layout

- **NavBar:** Back button + "Topic N / 9" + progress indicator (optional)
- **Content:** Existing component structure (tabs: Zusammenfassung + Anki-Karten)
- **Styling:** Inherits dark cyberpunk theme from global CSS

### Navigation

- Back button returns to landing page (`/`)
- Each topic page is self-contained (can bookmark/share `/topics/3`)
- Progress tracked per topic (flashcards seen within that topic)

## Styling & Theme

### CSS Variables (Dark Cyberpunk + Rainbow)

```css
:root {
  /* Background */
  --color-background-primary: #0f1419;
  --color-background-secondary: #1a1f2e;
  
  /* Text */
  --color-text-primary: #e8eaed;
  --color-text-secondary: #9ca3af;
  --color-text-tertiary: #6b7280;
  
  /* Borders */
  --color-border-primary: #00d9ff;    /* Cyan neon */
  --color-border-secondary: #ff00ff;  /* Magenta neon */
  --color-border-tertiary: #3f4657;
  
  /* Accents (Rainbow) */
  --color-accent-rainbow: linear-gradient(90deg, #00d9ff, #ff00ff, #ffff00);
  
  /* Spacing & Radius */
  --border-radius-md: 6px;
  --border-radius-lg: 12px;
  
  /* Fonts */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Component-Specific Styling

- **Buttons:** Dark background + neon borders, glow on hover
- **Cards:** Slight glow effect on hover using `box-shadow` with neon color
- **Links:** Cyan neon color, underline on hover
- **Progress bars:** Rainbow gradient or solid neon cyan

## Development Workflow

### Initial Setup

1. Create Next.js project: `npx create-next-app@latest xai-learning --typescript` (or skip TypeScript)
2. Move `xai_lernkarten.jsx` → `content/xai_lernkarten_1.jsx`
3. Create directory structure (components, lib, styles, docs)
4. Implement landing page + routing
5. Add dark theme CSS variables
6. Test locally: `npm run dev` on `http://localhost:3000`

### Adding New PDFs

For each new PDF (currently not created):
1. Create corresponding JSX file in `content/` (e.g., `xai_lernkarten_2.jsx`)
2. Follow same structure: export `summary`, `cards`, default component
3. Add import in `app/topics/[id]/page.jsx`
4. Add entry to `topicModules` object
5. No other changes needed (routing handles it automatically)

### Local Development Only

- Run `npm run dev` to start Next.js dev server
- Hot reload on file changes
- No deployment/build step required for local use
- Can later add `npm run build && npm run start` for production if needed

## Error Handling

- Invalid topic ID (e.g., `/topics/10`): Show "Topic not found" message with link back to home
- Missing JSX file: Component will error in dev (helpful during development), graceful fallback in prod

## Scalability Considerations

- Current design handles 9 topics cleanly
- Adding 10th topic requires only adding one import + one line to routing
- No hardcoded limits (can extend beyond 9 if needed)
- Progressive enhancement: can add search, filtering, progress tracking across topics in future

## Testing Checklist

- [ ] Landing page loads with starfield animation
- [ ] Quotes rotate correctly every 5 seconds
- [ ] All 9 topic cards display and link correctly
- [ ] Each topic page shows correct content + NavBar
- [ ] Back button returns to landing page
- [ ] Dark cyberpunk + rainbow styling is consistent
- [ ] Hover effects work on cards + buttons
- [ ] Responsive layout on mobile (if needed)
- [ ] Local dev server runs without errors

## Future Extensions

- Search/filter topics
- Cross-topic progress tracking
- PDF export per topic
- Quiz mode across multiple topics
- User notes/highlights
- Analytics (most viewed topics, etc.)
