import React from "react";
import {
  CategoryServiceImpl,
  EntryServiceImpl,
} from "../../../../../data/DataService";
import { Entry, Category } from "../../../../../data/interfaces";

export const handleRenameCategory = async (
  newCategory: string,
  categoriesData: CategoryServiceImpl,
  selectedCategory: Category,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  categories: Category[]
) => {
  const updatedData: Category[] = [...Object.values(categories)];
  const categoryIndex = Object.values(categories).findIndex(
    (category) => category === selectedCategory
  );
  updatedData[categoryIndex].name = newCategory;
  setCategories(updatedData);

  // rename it in categoriesData in the backend
  await categoriesData.editCategory(selectedCategory.id, newCategory);

  // rename the category in every diary
  const entriesData = new EntryServiceImpl();
  const entries = await entriesData.getAllEntries();
  let filteredEntries: Entry[] = [];

  console.log(selectedCategory.name);
  filteredEntries = entries.filter(
    (entry: Entry) => entry.category.id === selectedCategory.id
  );

  console.log(filteredEntries);

  filteredEntries.forEach((entry) => {
    entry.category.name = newCategory;
    console.log(entry.category.name);
    entriesData.editEntry(entry.id, entry);
  });
};
