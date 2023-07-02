import React from "react";
import Sentiment from "sentiment";
import graphDot from "./InitializeDot";

// Define an interface for the sentiment scores
interface SentimentScores {
  [key: string]: number;
}

// Create a sentiment analyzer using the Sentiment library
const sentimentAnalyzer = new Sentiment();

export const addGraph = (key: string, value: string) => {
  const totalScore = sentimentScore(value);

  graphDot.push({ date: key, score: totalScore });
  localStorage.setItem("graphDot", JSON.stringify(graphDot));
};

export const deleteGraph = (selectedDate: string) => {
  const dotIndex = graphDot.findIndex((dot) => dot.date === selectedDate);

  if (dotIndex !== -1) {
    graphDot.splice(dotIndex, 1);
    localStorage.setItem("graphDot", JSON.stringify(graphDot));
  }
};

const sentimentScore = (value: string) => {
  const content = value.toLowerCase();
  const tokens = content.split(" ");

  let totalScore = 0;
  for (const token of tokens) {
    const result = sentimentAnalyzer.analyze(token);
    totalScore += result.score;
  }

  return totalScore;
};
