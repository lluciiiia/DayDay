import wordCount from "./InitializeCount";
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

export const increaseCount = (value: string) => {
  const content = value.toLowerCase();
  console.log("CONTENT: ", content);

  let words = content.split(/\s+|(?=[^\w\s])|(?<=[^\w\s])/); // Split by whitespace or symbols
  console.log("BEFORE: ", words);

  words = removeStopwords(words, eng);
  words = words.map((word) => word.replace(/[^a-zA-Z]+/g, "")); // Remove symbols from words
  words = words.filter((word) => !ignoredWords.includes(word)); // Remove ignored words

  console.log("AFTER: ", words);

  words = words.filter((word) => word.trim() !== ""); // Remove empty strings

  words.forEach((word) => {
    const index = wordCount.findIndex((item) => item.word === word);
    if (index !== -1) {
      wordCount[index].count += 1;
    } else {
      wordCount.push({ count: 1, word });
    }
  });

  updateLocalStorage();
};

export const decreaseCount = (value: string) => {
  const content = value.toLowerCase();
  let words = content.split(/\s+|(?=[^\w\s])|(?<=[^\w\s])/); // Split by whitespace or symbols

  words = removeStopwords(words, eng);
  words = words.map((word) => word.replace(/[^a-zA-Z]+/g, "")); // Remove symbols from words
  words = words.filter((word) => !ignoredWords.includes(word)); // Remove ignored words
  words = words.filter((word) => word.trim() !== ""); // Remove empty strings

  words.forEach((word) => {
    const index = wordCount.findIndex((item) => item.word === word);
    if (index !== -1) {
      wordCount[index].count -= 1;
      if (wordCount[index].count === 0) {
        wordCount.splice(index, 1);
      }
    }
  });

  updateLocalStorage();
};

function updateLocalStorage() {
  localStorage.setItem("wordCount", JSON.stringify(wordCount));
}
