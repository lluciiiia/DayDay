import React from "react";
import { CategoryServiceImpl } from "../../../../../data/DataService";
import { Category } from "../../../../../data/interfaces";

export const handleAddCategory = async (
  newCategory: string,
  categoriesData: CategoryServiceImpl,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
) => {
  try {
    console.log("newCategory in AddCategory: ", newCategory);
    await categoriesData.addCategory(newCategory);
    const updatedData: Category[] = await categoriesData.getAllCategories();
    setCategories(updatedData);
  } catch (error) {
    console.error("Error adding a new category:", error);
  }
};
