import { Entry, LocationData } from "./interfaces";

export interface EntryAnalysis {
  analyzeSentiment(entry: Entry): Promise<string>;
  analyzeLocation(entry: Entry): Promise<LocationData>;
  analyzeEmotionalMapping(entry: Entry): Promise<void>;
  analyzeActivityAndGoal(entry: Entry): Promise<void>;
  analyzeTimeBased(entry: Entry): Promise<void>;
}

// take the same variables of data in each analysis
export class EntryAnalyzer implements EntryAnalysis {
  async analyzeSentiment(entry: Entry): Promise<string> {
    // (entry.content.text, entry.date)
    // Implementation for sentiment analysis
    const sentimentResult = /* Perform sentiment analysis */ "";
    return sentimentResult;
  }

  async analyzeLocation(entry: Entry): Promise<LocationData> {
    //  (entry.location.latitude, entry.location.longitude, entry.content.text, entry.date)
    // Implementation for location-based analysis
    return { latitude: 0, longitude: 0 };
  }

  async analyzeEmotionalMapping(entry: Entry): Promise<void> {
    // entry.content.text, entry.date, entry.location
    // Implementation for emotional mapping analysis
  }

  async analyzeActivityAndGoal(entry: Entry): Promise<void> {
    // (entry.content.text, entry.date, entry.category)
    // Implementation for activity and goal analysis
  }

  async analyzeTimeBased(entry: Entry): Promise<void> {
    // (entry.content.text, entry.date)
    // Implementation for time-based analysis
  }
}
