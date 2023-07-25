// import Fuse from "fuse.js";

// export const SearchWords = (input: string) => {
//   const options = {
//     includeMatches: true,
//     shouldSort: true,
//     keys: ["content"],
//   };

//   const fuse = new Fuse(data, options);
//   const result = fuse.search(input);

//   const searchResults = result.map((item) => ({
//     date: item.item.date,
//     content: item.item.content,
//   }));

//   return searchResults;
// };

import Fuse from "fuse.js";
import { Entry, Category } from "../data/interfaces";


// Define a generic interface for the search data
export interface SearchData<T> {
  data: T[];
  keys: string[];
}

// Define a generic interface for the search result
export interface SearchResult<T> {
  item: T;
  matches?: readonly Fuse.FuseResultMatch[] | undefined;
}

// Generic search function that can handle different data types
export function search<T>(
  searchData: SearchData<T>,
  input: string
): SearchResult<T>[] {
  const options = {
    includeMatches: true,
    shouldSort: true,
    keys: searchData.keys,
  };

  const fuse = new Fuse(searchData.data, options);
  const result = fuse.search(input);

  return result;
}

// Example usage for searching categories by name and returning the category names
// interface CategorySearchData {
//   data: Category[];
//   keys: string[];
// }

// export const searchCategories = (
//   data: CategorySearchData,
//   input: string
// ): string[] => {
//   const results = search(data, input);

//   return results.map((result) => result.item.name);
// };

// Example usage for searching analysis names and returning the analysis names
interface AnalysisSearchData {
  data: string[];
  keys: string[];
}

export const searchAnalysisNames = (
  data: AnalysisSearchData,
  input: string
): string[] => {
  const results = search(data, input);

  return results.map((result) => result.item);
};

// // Example usage for searching entries and returning the matched entries
// interface EntrySearchData {
//   data: Entry[];
//   keys: string[];
// }

// export const searchEntries = (
//   data: EntrySearchData,
//   input: string
// ): Entry[] => {
//   const results = search(data, input);

//   return results.map((result) => result.item);
// };
