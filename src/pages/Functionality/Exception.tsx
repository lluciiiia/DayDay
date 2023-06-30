function isException(word: string, category: string): boolean {
  switch (category) {
    case "verbs":
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
      return !auxiliaryVerbs.includes(word.toLowerCase());

    case "articles":
      const articleExceptions = ["a", "an", "the"];
      return !articleExceptions.includes(word.toLowerCase());

    case "conjunctions":
      const conjunctionExceptions = ["and", "or", "but", "so"];
      return !conjunctionExceptions.includes(word.toLowerCase());

    case "prepositions":
      // Define your comprehensive list of prepositions
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
      return !prepositionExceptions.includes(word.toLowerCase());

    case "pronouns":
      // Define your comprehensive list of pronouns
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
      return !pronounExceptions.includes(word.toLowerCase());

    case "nouns":
      // Add any additional exceptions for nouns here
      const nounExceptions = ["exception1", "exception2"];
      return !nounExceptions.includes(word.toLowerCase());

    default:
      return false;
  }
}
