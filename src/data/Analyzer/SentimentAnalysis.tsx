import { Entry } from "../interfaces";
import { EntryAnalysis } from "../interfaces";
import Sentiment from "sentiment";
import * as natural from "natural";

// entry.content.text, entry.date
export interface SentimentAnalysis extends EntryAnalysis {
  analyzeSentiment(entry: Entry): Promise<number>;
}

function tokenizeContent(entry: Entry): string[] {
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
    const tokens = tokenizeContent(entry);

    const sentimentAnalyzer = new Sentiment();

    let totalScore = 0;
    for (const token of tokens) {
      const result = sentimentAnalyzer.analyze(token);
      totalScore += result.score;
    }
    console.log("totalscore in analyzer: ", totalScore);
    return totalScore;
  }
}

export class StressAnalyzer implements SentimentAnalysis {
  async analyzeSentiment(entry: Entry): Promise<number> {
    const tokens = tokenizeContent(entry);

    return 0;
  }
}
