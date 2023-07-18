import React from "react";
import { CategoriesData } from "../../../../../GetPutData";

interface AddCategoryProps {
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
}

export const handleAddCategory = async (
  newCategory: string,
  categoriesData: CategoriesData,
  setCategories: React.Dispatch<React.SetStateAction<string[]>>,
  categories: string[]
) => {
  const updatedData = [...categories, newCategory];
  setCategories(updatedData);
  await categoriesData.putCategoriesData(newCategory);
};
