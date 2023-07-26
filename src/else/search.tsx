import Fuse from "fuse.js";

// generic search function
export interface SearchData<T> {
  data: T[];
  keys: string[];
}

export interface SearchResult<T> {
  item: T;
  matches?: readonly Fuse.FuseResultMatch[] | undefined;
}

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

// BrowsePage
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

// CategoryPage
interface CategorySearchData {
  data: string[];
  keys: string[];
}

export const searchCategories = (
  data: CategorySearchData,
  input: string
): String[] => {
  const results = search(data, input);
  
  return results.map((result) => result.item);
};

// Example usage for searching entries and returning the matched entries
interface EntrySearchData {
  data: string[];
  keys: string[];
}

export const searchEntries = (
  data: EntrySearchData,
  input: string
): string[] => {
  const results = search(data, input);

  return results.map((result) => result.item);
};
