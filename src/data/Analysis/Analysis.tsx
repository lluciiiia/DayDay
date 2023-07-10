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
  
 