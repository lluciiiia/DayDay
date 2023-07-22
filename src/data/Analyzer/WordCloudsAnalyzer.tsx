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

// entry.content.text, entry.date
export interface WordCloudsAnalysis extends EntryAnalysis {
  analyzeWords(entry: Entry): Promise<object>;
}

//TODO: Word Clouds: Create word clouds from diary entries to highlight the most frequently used words, offering a quick overview of the user's main concerns or interests.
// entry.content.text, entry.id
export interface WordClouds extends WordCloudsAnalysis {}

export class WordCloudsAnalyzer implements WordClouds {
  async analyzeWords(entry: Entry): Promise<object> {
    console.log("Analyzing");
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

      console.log('wordFrequency: ' + wordFrequency);
      return wordFrequency;
    }
    return {};
  }
}