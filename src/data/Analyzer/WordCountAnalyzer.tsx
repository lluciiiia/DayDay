import axios from "axios";

const ignoredWords = [
  "the",
  "when",
  "where",
  "how",
  "why",
  "what",
  "who",
  "that",
  "day",
  "today",
  "yesterday",
  "tomorrow",
  "really",
  "not",
  "no",
  "bit",
  "wasn",
  "isn",
  "t",
  "m",
  "s",
];


class WordCountAnalyzer implements IAnalyzer<PlotableAnalysis> {
  analyze(entries: Entry[]): Promise<PlotableAnalysis> {
    const wordCount: { word: string; count: number }[] = [];

    entries.forEach((entry) => {
      entry.content.forEach((content) => {
        if (content.type === "text" && content.text) {
          const words = content.text.toLowerCase().split(/\s+|(?=[^\w\s])|(?<=[^\w\s])/); // Split by whitespace or symbols

          words.forEach((word) => {
            if (!ignoredWords.includes(word.trim())) {
              const index = wordCount.findIndex((item) => item.word === word);
              if (index !== -1) {
                wordCount[index].count += 1;
              } else {
                wordCount.push({ count: 1, word });
              }
            }
          });
        }
      });
    });

    // Update the word count data in your backend API
    return axios
      .post("http://localhost:3001/api/wordcount", wordCount)
      .then(() => {
        const data = wordCount.map((item) => ({
          label: item.word,
          value: item.count,
        }));

        const plotableAnalysis: PlotableAnalysis = {
          name: "Word Count Analysis", 
          data,
          // Add any additional properties required for your analysis
        };

        return plotableAnalysis;
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to analyze word count.");
      });
  }
}

export default WordCountAnalyzer;