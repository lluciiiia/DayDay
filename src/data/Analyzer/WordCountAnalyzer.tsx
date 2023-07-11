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
  analyze(entry: Entry): Promise<PlotableAnalysis> {
    const wordCount: { word: string; count: number }[] = [];

    entry.content.forEach((content) => {
      if (content.type === "text" && content.text) {
        const words = content.text
          .toLowerCase()
          .split(/\s+|(?=[^\w\s])|(?<=[^\w\s])/);

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

    return axios
    // analyze sends a GET request to fetch the existing word count data from the backend server.
      .get("http://localhost:3003/api/wordcount") 
      .then((response) => {
        const existingWordCountData = response.data;

        wordCount.forEach((item) => {
          const existingItem = existingWordCountData.find(
            (dataItem: { word: string; count: number }) => dataItem.word === item.word
          );
          if (existingItem) {
            existingItem.count += item.count;
          } else {
            existingWordCountData.push(item);
          }
        });

        return axios
        // analyze sends a PUT request to update the word count data on the backend server.
          .put("http://localhost:3003/api/wordcount", existingWordCountData)
          .then(() => {
            const data = existingWordCountData.map((item: { word: string; count: number }) => ({
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
            throw new Error("Failed to update word count data.");
          });
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch existing word count data.");
      });
  }
}

export default WordCountAnalyzer;
