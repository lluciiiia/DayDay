import Fuse from "fuse.js";
import Dictionary from "./InitializeDictionary";

export const SearchWords = (input: string) => {
  console.log("input", input);
  const options = {
    includeScore: true,
    keys: ["content"],
  };

  const fuse = new Fuse(Dictionary, options);

  const result = fuse.search(input);

  console.log("result", result);

  const searchResults = result.map((keys) => ({
    date: keys.item.date,
    content: keys.item.content,
  }));


  console.log("searchResults", searchResults)

  return searchResults;
};
