import Fuse from "fuse.js";
import Dictionary from "./InitializeDictionary";

export const SearchWords = (input: string) => {
  const options = {
    includeScore: true,
    keys: ["content"],
  };

  const fuse = new Fuse(Dictionary, options);

  const result = fuse.search(input);

  const searchResults = result.map((item) => ({
    date: item.item.date,
    content: item.item.content,
  }));

  return searchResults;
};
