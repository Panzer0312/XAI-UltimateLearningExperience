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

export const getTotalTopics = () => 8;

export const isValidTopicId = (id) => {
  const numId = parseInt(id);
  return numId >= 1 && numId <= getTotalTopics();
};

export const getTopicLabel = (id) => {
  return topicLabels[parseInt(id)] || `Topic ${id}`;
};
