# XAI Learning Material Template Guide

## Overview

A unified template for creating consistent XAI learning content with three main views:
1. **Zusammenfassung** (Summary) — Styled overview with colored sections
2. **Eselsbrücken** (Mnemonics) — Foldable memory bridges in German
3. **Lernkarten** (Flashcards) — Interactive flip cards for self-testing

## Files Created

### 1. `XAI_TEMPLATE.jsx` (Template File)
The master template for creating new topic files. Copy this file and customize the data sections.

### 2. Updated `xai_lernkarten.jsx` (Main Navigation)
Added "Eselsbrücken" tab with German mnemonic bridges for easier learning.

## How to Create a New Topic File

### Step 1: Copy the Template
```bash
cp content/XAI_TEMPLATE.jsx content/xai_[topic_name].jsx
```

### Step 2: Update Configuration
Edit the header section:
```javascript
const TOPIC_TITLE = "Your Topic Name";
const TOPIC_DESCRIPTION = "Brief description";
const LECTURE_NUM = "3";
const PROFESSOR = "Prof. Dr. Jannik Strötgen";
const UNIVERSITY = "Hochschule Karlsruhe";
```

### Step 3: Add Summary Sections
Replace `SUMMARY_SECTIONS` array. Each section has:
- `title` — Section heading
- `color` — Background color (light shade)
- `border` — Left border color (accent)
- `text` — Text color (optional, for contrast)
- `points` — Array of bullet points

**Color Palette Example:**
```javascript
const SUMMARY_SECTIONS = [
  {
    title: "Section 1",
    color: "#EEEDFE",      // Light purple
    border: "#534AB7",     // Dark purple
    text: "#3C3489",       // Text color
    points: [
      "Key point 1",
      "Key point 2",
      "Key point 3",
    ],
  },
  // Add more sections...
];
```

### Step 4: Add Mnemonic Bridges
Replace `MNEMONICS` array. German memory bridges to help retention:
```javascript
const MNEMONICS = [
  {
    title: "Memorable Bridge 1",
    mnemonic: "ACRONYM — What it stands for:\nA = First concept\nC = Second concept\nR = Third concept\nO = Fourth concept\nN = Fifth concept\nY = Sixth concept\nM = Seventh concept",
    keywords: ["keyword1", "keyword2", "keyword3"],
  },
];
```

**Mnemonic Format Best Practices:**
- Use German language for German students
- Use acronyms or memorable phrases
- Break down components clearly
- 2-5 keywords per mnemonic bridge
- Foldable design means users discover content on click

### Step 5: Add Flashcards
Replace `FLASHCARDS` array:
```javascript
const FLASHCARDS = [
  {
    q: "What is [concept]?",
    a: "Definition and explanation.\nUse newlines for multi-part answers.",
  },
  {
    q: "Explain the difference between X and Y.",
    a: "X is...\nY is...",
  },
];
```

**Flashcard Tips:**
- Short, clear questions
- Concise answers (can use `\n` for line breaks)
- Aim for 10-20 cards per topic
- Progress tracking shows completion rate

## Design System

### Styling Tokens (P Object)
```javascript
const P = {
  bg: "var(--color-background-primary)",
  surface: "var(--color-background-secondary)",
  card: "var(--color-background-tertiary)",
  border: "var(--color-border-tertiary)",
  text: "var(--color-text-primary)",
  sec: "var(--color-text-secondary)",
  muted: "var(--color-text-tertiary)",
};
```

All colors use CSS custom properties for consistency with the application theme.

### Color Recommendations for Summary Sections

Use light backgrounds with darker accents:
- **Purple:** `#EEEDFE` bg, `#534AB7` border
- **Green:** `#E1F5EE` bg, `#0F6E56` border
- **Blue:** `#E6F1FB` bg, `#185FA5` border
- **Orange:** `#FAECE7` bg, `#993C1D` border
- **Light Green:** `#EAF3DE` bg, `#3B6D11` border
- **Pink:** `#FBEAF0` bg, `#993556` border
- **Yellow:** `#FAEEDA` bg, `#854F0B` border
- **Gray:** `#F1EFE8` bg, `#5F5E5A` border

## Component Structure

### 1. SummaryView()
- Renders colored section cards with left border
- Each card has title + bulleted list
- No interaction required
- Scan-friendly design

### 2. MnemonicsView()
- Collapsible cards for each mnemonic bridge
- Shows keywords as preview
- Expands on click to reveal full mnemonic
- Helps with active recall learning

### 3. FlashcardsView()
- Flip card animation (click to reveal answer)
- Navigation: Previous/Next/Shuffle
- Progress bar and count tracking
- Marks cards as "learned"
- Reset button to restart learning

## Integration Steps

1. **Save the file:** `content/xai_[topic_name].jsx`
2. **Link in main app:** Import and add route in your routing system
3. **Update navigation:** Add menu entry if needed
4. **Test:** Run the dev server and verify all three tabs work

## Example: Complete File Structure

```javascript
import { useState } from "react";

const TOPIC_TITLE = "Feature Importance";
const LECTURE_NUM = "3";

const SUMMARY_SECTIONS = [
  {
    title: "Kernidee: Removal-based Explanations",
    color: "#EEEDFE",
    border: "#534AB7",
    points: [
      "Um Wichtigkeit zu verstehen: Feature entfernen → Output ändern beobachten",
      "Große Änderung = wichtiges Feature",
      "Keine Änderung = irrelevantes Feature",
    ],
  },
];

const MNEMONICS = [
  {
    title: "Removal-based Methods",
    mnemonic: "ROM — Drei Schritte:\nR = Remove (Feature entfernen)\nO = Observe (Output-Änderung messen)\nM = Measure (Wichtigkeit quantifizieren)",
    keywords: ["Removal", "Observation", "Measurement"],
  },
];

const FLASHCARDS = [
  {
    q: "Was ist Permutation Feature Importance?",
    a: "Ein Model-agnostic Verfahren, das die Wichtigkeit eines Features misst, indem die Spalte randomisiert wird und der Accuracy-Abfall gemessen wird.",
  },
];

export default function XAILearningTool() {
  // ... (rest of component uses template structure)
}
```

## Features Explanation

### Zusammenfassung Tab
- **Purpose:** Quick overview with key points
- **Best for:** Initial learning, concept review
- **User interaction:** Read-only, scrolling

### Eselsbrücken Tab
- **Purpose:** Memory aids in German
- **Best for:** Retention, acronym learning
- **User interaction:** Click sections to expand/collapse
- **Why German:** Helps German students create stronger mental associations

### Lernkarten Tab
- **Purpose:** Active recall self-testing
- **Best for:** Exam preparation, spacing repetition
- **User interaction:** Flip cards, navigate, track progress
- **Why effective:** Forces retrieval practice (proven learning technique)

## Best Practices

### Summary Section Tips
- 4-8 sections per topic
- 3-5 bullet points per section
- Use parallel structure (similar grammar/length)
- Link concepts visually with color coding
- Keep points concise (1-2 lines max)

### Mnemonic Bridge Tips
- Make acronyms memorable (funny, visual, personal)
- Explain why it works (cognitive load reduction)
- Use German terminology where appropriate
- 3-7 components per mnemonic (magic number for memory)
- Test with actual students before finalizing

### Flashcard Tips
- Question should be answerable in 30 seconds
- Mix question types: definition, application, comparison
- Use Feynman technique: explain like teaching a child
- Progressive difficulty: easy cards early, complex later
- Include both conceptual and factual questions

## Example Mnemonics (German)

### EXPE für XAI-Begriffe
```
EXPE — Vier zentrale Rollen:
E = Explanandum (Phänomen zum Erklären)
X = eXplanans (die Erklärung)
P = explainer (die Methode)
E = Explainee (wer empfängt Erklärung)
```

### SSFF für XAI-Taxonomie
```
SSFF — Vier Klassifikations-Dimensionen:
S = Scope: Local vs. Global
S = Stage: Post-hoc vs. Ante-hoc
F = Functioning: Perturbation vs. Example-based
F = Format: Text, Visual, Numerical, Rules
```

### ALT-GMN für 5-Scopes
```
ALT-GMN — Hierarchie der Interpretability:
A = Algorithm Transparency (lowest effort)
L = Global, holistic (hard!)
T = modular Global
G = Local Single Prediction
M = Local Group
N = Network effect (highest complexity)
```

## Accessibility & UX

- **Progress tracking:** Helps learner know how many cards remain
- **Keyboard support:** Tab navigation works
- **Mobile friendly:** Responsive design
- **Color contrast:** Meets WCAG AA standards
- **Readable fonts:** Uses system fonts for performance

## Maintenance

- Update mnemonics based on student feedback
- Rotate flashcards seasonally (add/remove based on difficulty data)
- Monitor progress data to identify weak spots
- Update summary sections with new research/insights
- Keep color palette consistent across all files

---

**Template Version:** 1.0  
**Last Updated:** 2026-06-19  
**Created for:** HKA SS26 XAI Lecture Series
