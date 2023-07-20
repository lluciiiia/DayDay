import { Entry, LocationData } from "./interfaces";

export interface EntryAnalysis {
  analyzeSentiment(entry: Entry): Promise<string>;
  analyzeLocation(entry: Entry): Promise<LocationData>;
}

//the methods that the plotter class should implement to handle the visualization of different types of analysis results
export interface AnalysisPlot {
  plotSentiment(sentiment: string): void;
  plotLocation(location: LocationData): void;
  // Add other plot methods for different analysis types if needed in the future
}
