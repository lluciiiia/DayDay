import { Entry } from "../interfaces";
import { EntryAnalysis } from "../interfaces";
import Sentiment from "sentiment";

// entry.content.text, entry.date
export interface SentimentAnalysis extends EntryAnalysis {
  analyzeSentiment(entry: Entry): Promise<number>;
  analyzeStress(totalScore: number): Promise<string>;
}

function tokenizer(entry: Entry): string[] {
  const content = entry.content[0]; // TODO: check after adding other types of contents
  if (content.type === "text" && content.text) {
    const lowercontent = content.text.toLowerCase();
    const tokens = lowercontent.split(" ");
    return tokens;
  }
  return [];
}

export class SentimentTrendsAnalyzer implements SentimentAnalysis {
  async analyzeSentiment(entry: Entry): Promise<number> {
    const tokens = tokenizer(entry);

    const sentimentAnalyzer = new Sentiment();

    let totalScore = 0;
    for (const token of tokens) {
      const result = sentimentAnalyzer.analyze(token);
      totalScore += result.score;
    }
    console.log("totalscore in analyzer: ", totalScore);
    return totalScore;
  }

  async analyzeStress(totalScore: number): Promise<string> {
    if (totalScore <= -10) {
      return "High stress level";
    } else if (totalScore <= -5) {
      return "Moderate stress level";
    } else if (totalScore <= 0) {
      return "Moderate stress level";
    } else {
      return "Low stress level";
    }
  }
}
