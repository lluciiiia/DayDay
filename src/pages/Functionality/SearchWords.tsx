import Fuse from "fuse.js";
import Dictionary from "./InitializeDictionary";

export const SearchWords = (input: string) => {
  const options = {
    includeMatches: true,
    includeScores: true,
    keys: ["content"],
  };

  const fuse = new Fuse(Dictionary, options);

  const result = fuse.search(input);

  const searchResults = result.map((keys) => ({
    date: keys.item.date,
    content: keys.item.content,
  }));

  return searchResults;
};
