import React from "react";
import natural from "natural";
import graphDot from "./InitializeDot";

// Define an interface for the sentiment scores
interface SentimentScores {
  [key: string]: number;
}

// Create a sentiment analyzer using the Natural library
const sentimentAnalyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
const tokenizer = new natural.WordTokenizer();

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
  const tokens = tokenizer.tokenize(content);

  let totalScore = 0;
  if (tokens !== null) {
    for (const token of tokens) {
      const stemmedToken = natural.PorterStemmer.stem(token);
      const score = sentimentAnalyzer.getSentiment([stemmedToken]);
      totalScore += score;
    }
  }

  return totalScore;
};
