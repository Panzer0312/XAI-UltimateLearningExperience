'use client';

import { useState, useEffect } from 'react';

const chaosQuotes = [
  "SHAP values don't lie. Your model does. 🔥",
  "The exam is just a feature importance test. You are the least important feature. 💀",
  "Neural networks: millions of parameters, zero explanations. Just like your life choices. 🧠",
  "YOU WILL PASS. SHAPLEY WILLS IT. 🔥🔥🔥",
  "Mechanistic interpretability: understanding brains to understand brains. It's fine. 🤯",
  "Your attention is not where you think it is. (LIME confirmed.) 🔍",
  "Concept Activation Vectors: because 'vibes' needed a math degree. 📐",
  "The model is a black box. You are also a black box. We are all black boxes. 📦",
  "GradCAM: see where your network looks. Then cry about it. 😭",
  "Feature importance: finding out which inputs actually matter. Unlike your opinions. 💅",
  "You have studied 0% of the material. You are already ahead of where you'll be tomorrow. 📈",
  "Shapley: the fairest way to distribute blame since 1953. ⚖️",
  "EVERY. FEATURE. MATTERS. (Some just matter more.) 🎯",
  "Interpretability: making AI explain itself so you don't have to. 🤝",
  "The exam approaches. The SHAP plots multiply. Stay strong. 💪",
];

export default function ChaosQuotes() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * chaosQuotes.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId;
    const interval = setInterval(() => {
      setVisible(false);
      timeoutId = setTimeout(() => {
        setIndex((prev) => (prev + 1) % chaosQuotes.length);
        setVisible(true);
      }, 500);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
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
          transition: 'opacity 0.5s ease',
          opacity: visible ? 1 : 0,
        }}
      >
        "{chaosQuotes[index]}"
      </p>
    </div>
  );
}
