import axios from "axios";
import { ApiURL } from "../BackendURL";
const apiURL = ApiURL + "/wordcount";

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
  async analyze(entry: Entry): Promise<PlotableAnalysis> {
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

    const existingWordCountData = await this.getData();

    wordCount.forEach((item) => {
      const existingItem = existingWordCountData.find(
        (dataItem: { word: string; count: number }) =>
          dataItem.word === item.word
      );
      if (existingItem) {
        existingItem.count += item.count;
      } else {
        existingWordCountData.push(item);
      }
    });

    await this.putData(existingWordCountData);

    const data = existingWordCountData.map(
      (item: { word: string; count: number }) => ({
        label: item.word,
        value: item.count,
      })
    );

    const plotableAnalysis: PlotableAnalysis = {
      name: "Word Count Analysis",
      data,
      // Add any additional properties required for your analysis
    };

    return plotableAnalysis;
  }

  async getData(): Promise<any> {
    try {
      const response = await axios.get(apiURL);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch existing word count data.");
    }
  }

  async putData(data: any): Promise<void> {
    try {
      await axios.put(apiURL, data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update word count data.");
    }
  }

  async increaseWordCount(entry: Entry): Promise<void> {
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

    const existingWordCountData = await this.getData();

    wordCount.forEach((item) => {
      const existingItem = existingWordCountData.find(
        (dataItem: { word: string; count: number }) =>
          dataItem.word === item.word
      );
      if (existingItem) {
        existingItem.count += item.count;
      } else {
        existingWordCountData.push(item);
      }
    });

    await this.putData(existingWordCountData);
  }

  async decreaseWordCount(entry: Entry): Promise<void> {
    const content = entry.content
      .map((c) => c.text)
      .join(" ")
      .toLowerCase();
    let words = content.split(/\s+|(?=[^\w\s])|(?<=[^\w\s])/);

    words = words.filter((word) => !ignoredWords.includes(word.trim()));
    words = words.map((word) => word.replace(/[^a-zA-Z]+/g, ""));
    words = words.filter((word) => word.trim() !== "");

    const existingWordCountData = await this.getData();

    words.forEach((word) => {
      const index = existingWordCountData.findIndex(
        (item: { word: string; count: number }) => item.word === word
      );
      if (index !== -1) {
        existingWordCountData[index].count -= 1;
        if (existingWordCountData[index].count === 0) {
          existingWordCountData.splice(index, 1);
        }
      }
    });

    await this.putData(existingWordCountData);
  }
}
export default WordCountAnalyzer;