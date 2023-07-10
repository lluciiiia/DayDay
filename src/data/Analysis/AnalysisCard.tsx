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
  
 
  

  