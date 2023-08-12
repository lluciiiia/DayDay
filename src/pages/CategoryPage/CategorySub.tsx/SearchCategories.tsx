import Fuse from "fuse.js";
import { CategoryServiceImpl } from "../../../data/DataService";

const categoriesData = new CategoryServiceImpl();

export const SearchCategories = async (input: string) => {
  const categories = await categoriesData.getAllCategories(); // Wait for the promise to resolve

  const options = {
    includeMatches: true,
    shouldSort: true,
    //keys: ["content"],
  };

  const fuse = new Fuse(categories, options);
  const result = fuse.search(input);

  const searchResults = result.map((item) => ({
    category: item,
  }));

  return searchResults;
};
