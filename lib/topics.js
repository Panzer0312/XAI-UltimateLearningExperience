// lib/topics.js
export const topicLabels = {
  1: '2: Introduction',
  2: '3: Feature Importance Explanations',
  3: '4: Shapley Values',
  4: '5: Feature Importance Explanations II',
  5: '6: Concept-based Explanations',
  6: '7: Concept-based Explanations II',
  7: '8: Neural Network Interpretation',
  8: '9: Mechanistic Interpretability',
};

export const topicFunnyLines = {
  1: "How to explain what you can't explain. Welcome to your new problem.",
  2: "Some features matter more than others. Just like people. Sorry.",
  3: "Game theory for blaming your model. Spoiler: you'll blame yourself.",
  4: "Yes, again. No, it doesn't get easier. Yes, this is intentional.",
  5: "What even is a concept? Great question. Nobody knows.",
  6: "Electric boogaloo. Still no concept. More math though.",
  7: "Opening the black box. What you find inside may haunt you forever.",
  8: "The final boss. We're all rooting for you. Statistically.",
};

export const topicPainRatings = {
  1: '😊 Mild',
  2: '🤔 Spicy',
  3: '💀💀 Existential',
  4: '😭 Suffering',
  5: '🧠 Brain Melt',
  6: '🧠🧠 Melting',
  7: '🔥 Hazardous',
  8: '☠️☠️☠️ RIP',
};

export const getTotalTopics = () => 8;

export const isValidTopicId = (id) => {
  const numId = parseInt(id);
  return numId >= 1 && numId <= getTotalTopics();
};

export const getTopicLabel = (id) => {
  return topicLabels[parseInt(id)] || `Topic ${id}`;
};
