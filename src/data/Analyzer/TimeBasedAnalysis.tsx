import { Entry } from "../interfaces";
import { EntryAnalysis } from "../interfaces";

export interface TimeBasedData {}

// entry.content.text, entry.date
export interface TimeBasedAnalysis extends EntryAnalysis {
  analyzeTimeBased(entry: Entry): Promise<void>;
}

export class TimeBasedAnalyzer implements TimeBasedAnalysis {
  async analyzeTimeBased(entry: Entry): Promise<void> {
    // Implementation for time-based analysis
  }
}
