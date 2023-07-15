//   // Analysis page component
//   function AnalysisPage({ cards }: { cards: AnalysisPageCard[] }) {
//     const [content, setContent] = useState<Content[]>([]);
  
//     const [analysis, setAnalysis] = useState<
//       { card: AnalysisPageCard; analysis: Analysis }[]
//     >([]);
  
//     useEffect(() => {
//       const analysisResults = [];
//       cards.forEach((card) => {
//         analysisResults.push({
//           card,
//           analysis: card.analyzer.analyze(content),
//         });
//       });
  
//       setAnalysis(analysisResults);
//     }, [content]);
  
//     return (
//       <>
//         {analysis.map((a) => {
//           if (a.analysis instanceof PlotableAnalysis) {
//             return <Graph analysis={a.analysis} {...a.card.settings} />;
//           } else if (a.analysis instanceof GeolocationAnalysis) {
//             return <Map analysis={a.analysis} {...a.card.settings} />;
//           }
//           return null;
//         })}
//       </>
//     );
//   }