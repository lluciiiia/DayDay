import { Entry, LocationData } from "../interfaces";
import { EntryAnalysis } from "../interfaces";

export interface MappingData {}

// Emotional Mapping analysis
export interface EmotionalMapping extends EntryAnalysis {
  getEmotionalMap(): Promise<Map<LocationData, string[]>>;
}

// entry.content.text, entry.date, entry.location
export interface EmotionMappingAnalysis extends EntryAnalysis {
  analyzeEmotionalMapping(entry: Entry): Promise<void>;
}

export class EmotionalMappingAnalyzer implements EmotionMappingAnalysis {
  async analyzeEmotionalMapping(entry: Entry): Promise<void> {
    // Implementation for emotional mapping analysis
  }
}
