// Interface for analyzers
interface IAnalyzer<Output> {
  analyze(entry: Entry): Promise<Output>;
  
}

// Analyzer for sentiment analysis
class SentimentAnalyzer implements IAnalyzer<PlotableAnalysis> {
  analyze(entry: Entry): Promise<PlotableAnalysis> {
    throw new Error("Method not implemented.");
  }
}

// Analyzer for location analysis
class LocationAnalyzer implements IAnalyzer<GeolocationAnalysis> {
  analyze(entry: Entry): Promise<GeolocationAnalysis> {
    throw new Error("Method not implemented.");
  }
}
