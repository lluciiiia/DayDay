import wordCount from "./InitializeCount";

// Usage example
console.log(wordCount); // Access the wordCountMap object

export const increaseCount = (key: string, value: string) => {
  const content = value.toLowerCase();
  const words = content.split(" ");

  words.forEach((word) => {
    if (isException(word)) {
      const index = wordCount.findIndex((item) => item.word === word);
      if (index !== -1) {
        wordCount[index].count += 1;
      } else {
        wordCount.push({ count: 1, word });
      }
    }
  });
};

export const decreaseCount = (key: string, value: string) => {
  const content = value.toLowerCase();
  const words = content.split(" ");

  words.forEach((word) => {
    if (isException(word)) {
      const index = wordCount.findIndex((item) => item.word === word);
      if (index !== -1) {
        wordCount[index].count -= 1;
      }
    }
  });
};

function isException(word: string): boolean {
  // Check if the word ends with "ed" or "ing"
  if (word.endsWith("ed") || word.endsWith("ing")) {
    return false;
  }

  // Check if the word is an auxiliary or modal verb
  const auxiliaryVerbs = [
    "be",
    "have",
    "do",
    "can",
    "could",
    "may",
    "might",
    "must",
    "shall",
    "should",
    "will",
    "would",
  ];

  // Check if the word is an article
  const articleExceptions = ["a", "an", "the"];

  // Check if the word is a conjunction
  const conjunctionExceptions = ["and", "or", "but", "so"];

  // Check if the word is a preposition
  const prepositionExceptions = [
    "in",
    "on",
    "at",
    "for",
    "to",
    "with",
    "from",
    "by",
    "about",
    "through",
    "over",
  ];

  // Check if the word is a pronoun
  const pronounExceptions = [
    "I",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
  ];

  // Check if the word is a specific noun
  const nounExceptions = [
    "thing",
    "stuff",
    "something",
    "nothing",
    "everything",
    "anything",
    "people",
    "person",
    "place",
    "time",
  ];

  return (
    !auxiliaryVerbs.includes(word) &&
    !articleExceptions.includes(word) &&
    !conjunctionExceptions.includes(word) &&
    !prepositionExceptions.includes(word) &&
    !pronounExceptions.includes(word) &&
    !nounExceptions.includes(word)
  );
}


