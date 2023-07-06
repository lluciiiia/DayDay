declare module 'sentiment' {
    interface AnalysisResult {
      score: number;
      comparative: number;
      tokens: string[];
      words: string[];
      positive: string[];
      negative: string[];
    }
  
    interface SentimentOptions {
      extras?: Record<string, number>;
    }
  
    export default class Sentiment {
      constructor(options?: SentimentOptions);
      analyze(text: string): AnalysisResult;
    }
  }
  