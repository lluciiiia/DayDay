/* Analysis Types */
// Analysis types -> Analysis Interface
// different Analyzers -> Analyzer Interface + Analysis Interface

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
  
  // Analyzer for word count
  class WordCountAnalyzer implements IAnalyzer<PlotableAnalysis> {
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
  
  // Base interface for analysis
  interface Analysis {
    name: string;
  }
  
  // Interface for analysis that can be plotted on a graph
  interface PlotableAnalysis extends Analysis {
    data: { label: string; value: number }[];
  }
  
  // Interface for geolocation analysis
  interface GeolocationAnalysis extends Analysis {
    data: Location[];
  }
  
  // Type for analysis page cards
  type AnalysisPageCard = {
    title: string;
    analyzer: IAnalyzer<any>; // Use 'any' here if the analyzer can have different types
    settings: {
      [key: string]: any;
    };
  };
  
  const cards: AnalysisPageCard[] = [
    {
      title: "Sentiment Analysis",
      analyzer: new SentimentAnalyzer(),
      settings: {
        showPath: true,
      },
    },
    {
      title: "Word Count",
      analyzer: new WordCountAnalyzer(),
      settings: {},
    },
    //...
  ];
  
  /* Card Rendering Components */
  function Graph({ analysis }: { analysis: PlotableAnalysis }) {
    return null;
  }
  
  function Map({ analysis, showPath }: { analysis: GeolocationAnalysis }) {
    return null;
  }
  
  // Analysis page component
  function AnalysisPage({ cards }: { cards: AnalysisPageCard[] }) {
    const [content, setContent] = useState<Content[]>([]);
  
    const [analysis, setAnalysis] = useState<
      { card: AnalysisPageCard; analysis: Analysis }[]
    >([]);
  
    useEffect(() => {
      const analysisResults = [];
      cards.forEach((card) => {
        analysisResults.push({
          card,
          analysis: card.analyzer.analyze(content),
        });
      });
  
      setAnalysis(analysisResults);
    }, [content]);
  
    return (
      <>
        {analysis.map((a) => {
          if (a.analysis instanceof PlotableAnalysis) {
            return <Graph analysis={a.analysis} {...a.card.settings} />;
          } else if (a.analysis instanceof GeolocationAnalysis) {
            return <Map analysis={a.analysis} {...a.card.settings} />;
          }
          return null;
        })}
      </>
    );
  }
  