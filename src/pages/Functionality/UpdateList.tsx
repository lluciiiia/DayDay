  // TODO: a dictionary (wordCountMap) => initialized and accessible in this function
  import wordCountMap from './wordCountMap'; // Path to the wordCountMap.js file


const increaseCount = (key: string, value: string) => {
  const content = value.toLowerCase();
  const words = content.split(" ");

  words.forEach((word) => {
    // Check if the word passes the isException method (returns boolean)
    if (isException(word)) {
      if (wordCountMap.hasOwnProperty(word)) {
        wordCountMap[word] += 1;
      } else {
        wordCountMap[word] = 1; // initialize it in the map
      }
    }
  });
};

const decreaseCount = (key: string, value: string) => {
  const content = value.toLowerCase();
  const words = content.split(" ");

  words.forEach((word) => {
    // iterates each word in content
    if (isException(word)) {
      wordCountMap[word] -= 1;
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
  const nounExceptions = ["exception1", "exception2"];

  return (
    !auxiliaryVerbs.includes(word) &&
    !articleExceptions.includes(word) &&
    !conjunctionExceptions.includes(word) &&
    !prepositionExceptions.includes(word) &&
    !pronounExceptions.includes(word) &&
    !nounExceptions.includes(word)
  );
}
