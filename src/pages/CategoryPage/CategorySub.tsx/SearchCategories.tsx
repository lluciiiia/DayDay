import Fuse from "fuse.js";
import { CategoriesData } from "../../../GetPutData";

const categoriesData = new CategoriesData();

export const SearchCategories = async (input: string) => {
  const categories = await categoriesData.getCategoriesData(); // Wait for the promise to resolve

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
