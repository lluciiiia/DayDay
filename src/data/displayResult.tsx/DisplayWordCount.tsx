class DisplayWordCount implements IAnalyzer<PlotableAnalysis> {
    analyze(entry: Entry): Promise<PlotableAnalysis> {
      throw new Error("Method not implemented.");
    }

    // TODO: Get word count data from the server and make it a plot
  }