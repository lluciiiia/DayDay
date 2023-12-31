import { Entry } from "../interfaces";
import { EntryAnalysis } from "../interfaces";
import { removeStopwords, eng } from "stopword";

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

export interface WordCloudsAnalysis extends EntryAnalysis {
  analyzeWords(entry: Entry): Promise<object>;
}

// entry.content.text, entry.id
export interface WordClouds extends WordCloudsAnalysis {}

export class WordCloudsAnalyzer implements WordClouds {
  async analyzeWords(entry: Entry): Promise<object> {
    const content = entry.content[0]; // TODO: check after adding other types of contents
    if (content.type === "text" && content.text) {
      let words = content.text.split(/\s+|(?=[^\w\s])|(?<=[^\w\s])/); // Split by whitespace or symbols

      words = removeStopwords(words, eng);
      words = words.map((word: string) => word.replace(/[^a-zA-Z]+/g, "")); // Remove symbols from words
      words = words.filter((word: string) => !ignoredWords.includes(word)); // Remove ignored words
      words = words.filter((word: string) => word.trim() !== ""); // Remove empty strings

      // Count the frequency of each word using a dictionary
      const wordFrequency: { [word: string]: number } = {};
      words.forEach((word) => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      });

      return wordFrequency;
    }
    return {};
  }
}
