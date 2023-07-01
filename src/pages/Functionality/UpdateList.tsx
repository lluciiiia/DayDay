import wordCount from "./InitializeCount";

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

  updateLocalStorage();
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

  updateLocalStorage();
};

function isException(word: string): boolean {
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

  const articleExceptions = ["a", "an", "the"];

  const conjunctionExceptions = ["and", "or", "but", "so"];

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

function updateLocalStorage() {
  localStorage.setItem('wordCount', JSON.stringify(wordCount));
}
