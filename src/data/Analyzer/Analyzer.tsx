// Interface for analyzers
interface IAnalyzer<T extends Analysis> {
  analyze(entries: Entry[]): Promise<T>;
}

// Analyzer for sentiment analysis
class SentimentAnalyzer implements IAnalyzer<PlotableAnalysis> {
  analyze(entries: Entry[]): Promise<PlotableAnalysis> {
    throw new Error("Method not implemented.");
  }
}

// Analyzer for location analysis
class LocationAnalyzer implements IAnalyzer<GeolocationAnalysis> {
  analyze(entries: Entry[]): Promise<GeolocationAnalysis> {
    throw new Error("Method not implemented.");
  }
}
