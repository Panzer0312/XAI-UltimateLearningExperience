# Content Structure & Loading Guide

Complete reference for understanding how content is organized, loaded, and extended in the XAI Learning Hub.

---

## Overview

The XAI Learning Hub is a Next.js application that serves learning materials from multiple PDF sources, each converted to a React component. Content flows from individual topic modules → routing layer → user-facing pages.

**Key Design Principle:** One PDF = one .jsx file = one topic number. No database, no API—pure file-based React components.

---

## Directory Structure

```
project/
├── app/                          # Next.js App Router
│   ├── layout.jsx                # Root HTML structure + metadata
│   ├── page.jsx                  # Landing page (/)
│   ├── topics/
│   │   └── [id]/
│   │       └── page.jsx          # Dynamic topic pages (/topics/[id])
│   └── globals.css               # Global styles (dark cyberpunk theme)
│
├── components/                   # Reusable React components
│   ├── Starfield.jsx             # Animated background canvas
│   ├── QuoteRotator.jsx          # Rotating funny quotes display
│   └── NavBar.jsx                # Navigation header with back link
│
├── lib/                          # Utilities & data
│   ├── quotes.js                 # Hardcoded funny ML/XAI quotes (German)
│   └── topics.js                 # Topic metadata & helper functions
│
├── content/                      # PDF content as React components
│   ├── xai_lernkarten_1.jsx      # Topic 1 (Motivation für XAI)
│   ├── xai_lernkarten_2.jsx      # Topic 2 (ML-Modelltypen) — not yet created
│   └── ...                       # Topics 3-9 follow same pattern
│
├── styles/
│   └── globals.css               # CSS variables (colors, spacing, fonts)
│
├── public/                       # Static assets (if needed)
├── jsconfig.json                 # Path alias config (@/ = .)
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
└── README.md                     # Quick start guide
```

---

## Content Loading Pipeline

### 1. PDF → JSX Conversion (Manual Step)

**Input:** PDF file with learning material (e.g., `Lecture2_XAI.pdf`)

**Output:** `content/xai_lernkarten_N.jsx` React component

**What gets extracted from PDF:**
- Topic summaries (titles, bullet points, color coding)
- Q&A flashcards (questions + answers)

**Example structure from xai_lernkarten_1.jsx:**

```javascript
// Always export these three things:

export const summary = [
  {
    title: "Motivation für XAI",        // Section title
    color: "#EEEDFE",                  // Light purple background
    border: "#534AB7",                 // Dark purple left border
    text: "#3C3489",                   // Dark purple text
    points: [
      "Bullet point 1",
      "Bullet point 2",
      // ... up to 4-5 points per topic
    ],
  },
  // ... more topics (usually 8 per PDF)
];

export const cards = [
  { q: "Question text?", a: "Answer text." },
  { q: "Another question?", a: "Another answer." },
  // ... Q&A flashcards (usually 15-20 per PDF)
];

export default function LearningComponent() {
  // Reuse the existing component from xai_lernkarten_1.jsx
  // Shows tabs: "Zusammenfassung" (summary) + "Anki-Karten" (flashcards)
  // Handles state: current tab, flashcard index, progress tracking
}
```

**Why this structure?**
- `summary`: Lecture notes organized by topic (read to learn)
- `cards`: Q&A for spaced repetition (flashcard mode)
- `default export`: Reusable UI component (tab switching, card flipping)

---

### 2. Topic Registration (lib/topics.js)

Map topic IDs to human-readable labels:

```javascript
export const topicLabels = {
  1: 'Motivation für XAI',           // PDF 1
  2: 'ML-Modelltypen',               // PDF 2
  3: 'Ensembles & Distillation',     // PDF 3
  // ...
  9: 'TBD',                          // Not created yet
};

export const getTotalTopics = () => 9;

export const isValidTopicId = (id) => {
  const numId = parseInt(id);
  return numId >= 1 && numId <= getTotalTopics();
};
```

**These functions are used by:**
- Landing page grid: Generate topic cards numbered 1-9
- Topic detail page: Validate URL (e.g., /topics/5 is valid, /topics/99 is not)
- NavBar: Display "Topic N of 9"

---

### 3. Dynamic Module Loading (app/topics/[id]/page.jsx)

Maps URL parameter → React component:

```javascript
const topicModules = {
  1: Topic1,  // import * as Topic1 from '@/content/xai_lernkarten_1'
  2: Topic2,  // import * as Topic2 from '@/content/xai_lernkarten_2' (not yet)
  // ...
  9: Topic9,  // import * as Topic9 from '@/content/xai_lernkarten_9' (not yet)
};

export default function TopicPage() {
  const params = useParams();
  const topicId = parseInt(params.id);  // Extract [id] from URL
  
  const module = topicModules[topicId]; // Get the right .jsx file
  const Component = module.default;      // Get the React component
  
  return <Component />;                  // Render it
}
```

**Flow:**
1. User clicks "Topic 3" card on landing page
2. Browser navigates to `/topics/3`
3. Next.js router extracts `id=3` from URL
4. topicModules[3] → xai_lernkarten_3.jsx
5. Component renders with Topic 3 summary + cards

---

### 4. Landing Page (app/page.jsx)

Generates grid of clickable topic cards:

```javascript
export default function Home() {
  const totalTopics = getTotalTopics(); // = 9
  
  return (
    <div>
      <Starfield /> {/* Animated background */}
      <QuoteRotator /> {/* Rotating quotes */}
      
      {/* Grid of 9 cards */}
      {Array.from({ length: totalTopics }, (_, i) => i + 1).map((num) => (
        <Link href={`/topics/${num}`}> {/* Navigate to /topics/1, /topics/2, etc */}
          <h3>{topicLabels[num]}</h3>
          <p>Topic {num} of {totalTopics}</p>
        </Link>
      ))}
    </div>
  );
}
```

**What happens when grid generates:**
- Creates 9 cards (one per topic)
- Each card links to `/topics/[1-9]`
- Card shows topic label (from lib/topics.js)
- Card shows progress badge ("Topic 3 of 9")

---

### 5. Topic Detail Page (app/topics/[id]/page.jsx)

Displays selected topic with NavBar:

```javascript
export default function TopicPage() {
  const topicId = parseInt(params.id);
  
  // Validate topic exists
  if (!isValidTopicId(topicId)) {
    return <ErrorPage message="Topic not found" />;
  }
  
  // Load component
  const Component = topicModules[topicId].default;
  
  return (
    <>
      <NavBar topicId={topicId} totalTopics={getTotalTopics()} />
      <Component />
    </>
  );
}
```

**User sees:**
- NavBar: "← Home" + "Topic 3 of 9"
- Two tabs: "Zusammenfassung" (summary) + "Anki-Karten" (flashcards)
- Summary tab: 8 collapsible sections with bullet points
- Cards tab: Interactive flashcard Q&A with navigation

---

## How to Add a New Topic (PDF 2-9)

### Step 1: Create JSX File

Create `content/xai_lernkarten_2.jsx` (replace 2 with your topic number):

```javascript
import { useState } from "react";

const summary = [
  {
    title: "First Topic in PDF 2",
    color: "#E1F5EE",
    border: "#0F6E56",
    text: "#085041",
    points: [
      "Point 1 from the PDF",
      "Point 2 from the PDF",
      "Point 3",
      "Point 4",
    ],
  },
  {
    title: "Second Topic in PDF 2",
    color: "#E6F1FB",
    border: "#185FA5",
    text: "#0C447C",
    points: [
      "Another topic's points",
      // ... more bullets
    ],
  },
  // ... add all topics from the PDF (usually 8)
];

const cards = [
  { q: "Question 1?", a: "Answer 1." },
  { q: "Question 2?", a: "Answer 2." },
  // ... add all Q&A flashcards (usually 15-20)
];

export default function XAILernApp() {
  // Copy the entire component from xai_lernkarten_1.jsx
  // It handles: tab switching, flashcard flipping, progress tracking
  // No changes needed—just paste and reuse!
}
```

**Key points:**
- Copy `summary` and `cards` arrays from PDF
- Copy entire `export default` component from xai_lernkarten_1.jsx
- Change only the data, not the component logic
- Export exactly these three things: `summary`, `cards`, `default`

### Step 2: Register in Module Map

Edit `app/topics/[id]/page.jsx`:

```javascript
// Add import at top:
import * as Topic2 from '@/content/xai_lernkarten_2';

// Add to topicModules:
const topicModules = {
  1: Topic1,
  2: Topic2,  // ← Add this line
  // ... rest
};
```

### Step 3: Update Topic Label

Edit `lib/topics.js`:

```javascript
export const topicLabels = {
  1: 'Motivation für XAI',
  2: 'ML-Modelltypen',    // ← Add this line with PDF 2's title
  // ... rest
};
```

### Step 4: Test

```bash
npm run dev
# Visit http://localhost:3000/topics/2
# Should see Topic 2 summary + flashcards
```

---

## Data Flow Diagram

```
User Action
    ↓
Landing Page (app/page.jsx)
    ├─ Reads: getTotalTopics() → 9
    ├─ Reads: topicLabels → human-readable names
    └─ Generates: 9 clickable cards linking to /topics/1, /topics/2, ..., /topics/9

User clicks Topic 3
    ↓
Browser navigates to /topics/3
    ↓
Next.js Router matches [id]/page.jsx
    ├─ Extracts: id = "3"
    ├─ Validates: isValidTopicId(3) → true
    └─ Loads: topicModules[3] → xai_lernkarten_3.jsx

Topic Detail Page renders
    ├─ Imports component: import * as Topic3 from '@/content/xai_lernkarten_3'
    ├─ Extracts: summary[], cards[]
    └─ Renders default component with that data

User sees Topic 3
    ├─ NavBar: "← Home" + "Topic 3 of 9"
    ├─ Tab 1: Zusammenfassung
    │   └─ Shows 8 topics with bullet points (from summary[])
    └─ Tab 2: Anki-Karten
        └─ Shows flashcards (from cards[])

User navigates back
    └─ NavBar "← Home" link → /
```

---

## Component Responsibilities

### Landing Page (app/page.jsx)
- **Renders:** Starfield, QuoteRotator, topic grid, footer
- **Reads:** getTotalTopics(), topicLabels
- **Does:** Generates 9 cards, each linking to /topics/N

### Topic Detail Page (app/topics/[id]/page.jsx)
- **Renders:** NavBar + selected component
- **Reads:** topicModules, isValidTopicId()
- **Does:** Validates URL, loads right .jsx, renders component

### Topic Components (content/xai_lernkarten_N.jsx)
- **Renders:** Tab UI, summary sections, flashcard viewer
- **Reads:** summary[], cards[]
- **Does:** Tab switching, flashcard flipping, progress tracking

### NavBar (components/NavBar.jsx)
- **Renders:** Back link + topic counter
- **Reads:** topicId, totalTopics (props)
- **Does:** Displays context info, provides back navigation

### Starfield (components/Starfield.jsx)
- **Renders:** Canvas with twinkling stars
- **Does:** Animates on page load, handles window resize

### QuoteRotator (components/QuoteRotator.jsx)
- **Renders:** Rotating quote display
- **Reads:** quotes array from lib/quotes.js
- **Does:** Cycles through quotes every 5 seconds with fade animation

---

## Styling & Theme

All colors defined as CSS variables in `styles/globals.css`:

```css
:root {
  --color-background-primary: #0f1419;    /* Dark navy */
  --color-border-primary: #00d9ff;        /* Cyan neon */
  --color-border-secondary: #ff00ff;      /* Magenta neon */
  --color-accent-rainbow: linear-gradient(90deg, #00d9ff, #ff00ff, #ffff00);
}
```

**Usage in components:**
- Inline styles: `background: 'var(--color-background-primary)'`
- CSS classes: `.neon-glow`, `.rainbow-text`, `.neon-border`

**When adding new PDFs:**
- Reuse existing color pairs from other topics in summary[]
- Or create new color combinations that fit cyberpunk aesthetic

---

## Topic Color Palette (for Reference)

Existing colors from xai_lernkarten_1.jsx:

| Topic | Color | Border | Text |
|-------|-------|--------|------|
| 1 | #EEEDFE (light purple) | #534AB7 | #3C3489 |
| 2 | #E1F5EE (light green) | #0F6E56 | #085041 |
| 3 | #E6F1FB (light blue) | #185FA5 | #0C447C |
| 4 | #FAECE7 (light orange) | #993C1D | #712B13 |
| 5 | #EAF3DE (light yellow-green) | #3B6D11 | #27500A |
| 6 | #FBEAF0 (light pink) | #993556 | #72243E |
| 7 | #FAEEDA (light tan) | #854F0B | #633806 |
| 8 | #F1EFE8 (light gray) | #5F5E5A | #444441 |

**Create Topic 9+ colors by:**
- Following the same light/dark pattern
- Ensuring at least 2-3 color distinctness
- Maintaining contrast (WCAG AA minimum)

---

## Common Tasks & How To Do Them

### Add a new quote
Edit `lib/quotes.js` and add to quotes array:
```javascript
export const quotes = [
  // ... existing quotes
  "New funny quote about XAI",
];
```

### Change topic 5's title
Edit `lib/topics.js`:
```javascript
export const topicLabels = {
  // ...
  5: 'New Title Here',
};
```

### Hide a topic (don't delete yet)
Edit `lib/topics.js`, change getTotalTopics():
```javascript
export const getTotalTopics = () => 8; // Was 9, now only 1-8 exist
```

### Change color scheme
Edit `styles/globals.css`:
```css
:root {
  --color-background-primary: #000000; /* Change any color here */
}
```
(All components use CSS variables, so one change updates everything)

### Fix a flashcard answer
Edit `content/xai_lernkarten_N.jsx`:
```javascript
const cards = [
  // ... 
  { q: "Question?", a: "Fixed answer here" },
];
```
Save file → dev server hot-reloads automatically

---

## File Naming Convention

- **PDFs:** Generic title (e.g., "Lecture 2 - XAI Fundamentals.pdf")
- **JSX files:** `xai_lernkarten_N.jsx` where N = topic number (1-9)
- **Components:** PascalCase (Starfield, QuoteRotator, NavBar)
- **Utilities:** camelCase (quotes.js, topics.js)

This makes content easily discoverable: xai_lernkarten_5 = Topic 5.

---

## Debugging Guide

### Topic not appearing in grid
1. Check `getTotalTopics()` in lib/topics.js
2. Ensure topicLabels has entry for that ID
3. If should appear: increment getTotalTopics()

### /topics/5 shows "Content not loaded yet"
1. Check xai_lernkarten_5.jsx exists
2. Check it's imported in app/topics/[id]/page.jsx
3. Check it exports default function, summary, cards

### Styling looks wrong on new topic
1. Check color values in summary[] match CSS colors
2. Verify color contrast (text on background readable)
3. Check CSS variables loaded: `var(--color-xxx)`

### Component state not updating
1. Check you're using useState (in xai_lernkarten_N.jsx)
2. Check event handlers are wired correctly
3. Clear browser cache and restart dev server

---

## Performance Notes

- **Static generation:** Landing page pre-renders at build time
- **Dynamic rendering:** Topic pages render on-demand (fast, lazy-loaded)
- **Bundle size:** Each topic adds ~10KB to JavaScript bundle
- **CSS-in-JS:** Inline styles in components (minimal CSS file size)

No optimization needed for 9 topics. If extending beyond 20 topics, consider:
- Code-splitting topic components
- Loading components dynamically with next/dynamic
- Moving large arrays to JSON files

---

## Future Extensions

**Possible enhancements without breaking current structure:**

1. **Search:** Add search bar, filter topics/flashcards by keyword
2. **Progress tracking:** Save seen cards across sessions (localStorage)
3. **Export:** Generate PDF or flashcard deck from selected topics
4. **User notes:** Let users annotate bullet points or answers
5. **Difficulty levels:** Mark cards as easy/medium/hard, track study progress
6. **Multi-language:** Duplicate topicLabels for German/English toggle
7. **Dark/Light mode toggle:** Add button to switch theme (already have CSS vars)
8. **Spaced repetition:** Implement SM2 algorithm for flashcard scheduling

All can be added without touching content structure or topic registration.

---

## Summary

**For developers extending this project:**

1. **To add Topic N:** Create `content/xai_lernkarten_N.jsx`, import in routing, register label
2. **To modify content:** Edit the .jsx file directly (hot-reload works)
3. **To add features:** Modify landing page, topic page, or create new components
4. **To debug:** Check module imports, validate topic IDs, verify CSS variables
5. **To style:** Use CSS variables, not hardcoded colors

The structure separates concerns:
- Content lives in `/content` (just data)
- Routing lives in `/app` (URL → component mapping)
- Metadata lives in `/lib` (labels, helpers, quotes)
- Components live in `/components` (reusable UI)
- Styling lives in `/styles` (theme, colors)

Adding Topic 2-9 is as simple as: create .jsx, import, register. Same pattern, minimal cognitive load.
