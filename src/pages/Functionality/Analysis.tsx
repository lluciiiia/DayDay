import React from "react";
import afinn from "afinn-111";
import graphDot from "./InitializeDot";

// Define an interface for the sentiment scores
interface AfinnScores {
  [key: string]: number;
}
export const addGraph = (key: string, value: string) => {
  // Get the overall score for the content
  const totalScore = sentimentScore(value);

  // Update the graphDot array in localStorage
  graphDot.push({ date: key, score: totalScore });
  localStorage.setItem("graphDot", JSON.stringify(graphDot));
};

export const deleteGraph = (selectedDate: string) => {
  // Find the index of the dot with the selected date
  const dotIndex = graphDot.findIndex(dot => dot.date === selectedDate);

  // If the date exists in the graphDot array, remove the dot
  if (dotIndex !== -1) {
    graphDot.splice(dotIndex, 1);

    // Update the graphDot array in localStorage
    localStorage.setItem('graphDot', JSON.stringify(graphDot));
  }
};

const sentimentScore = (value: string) => {
  // Define the input text and split it into tokens
  const content = value.toLowerCase();
  const tokens = content.split(" ");

  let totalScore = 0;
  for (const token of tokens) {
    if (token in afinn) {
      const scores = afinn as unknown as AfinnScores;
      totalScore += scores[token];
    }
  }

  return totalScore;
};
