import React from "react";
import { CategoriesData, EntriesData } from "../../../../../GetPutData";

export const handleRenameCategory = async (
  newCategory: string,
  categoriesData: CategoriesData,
  selectedCategory: string,
  setCategories: React.Dispatch<React.SetStateAction<string[]>>,
  categories: string[]
) => {
  const updatedData: string[] = [...categories];
  const categoryIndex = categories.findIndex(
    (category) => category === selectedCategory
  );
  updatedData[categoryIndex] = newCategory;
  setCategories(updatedData);

  // rename it in categoriesData in the backend
  await categoriesData.modifyCategoriesData([selectedCategory, newCategory]);

  // rename the category in every diary
  const entriesData = new EntriesData();
  const entries = await entriesData.getEntriesData();
  let filteredEntries: Entry[] = [];

  filteredEntries = entries.filter(
    (entry: Entry) => entry.category === selectedCategory
  );

  filteredEntries.forEach((entry) => {
    entriesData.modifyEntriesData({
      entryToChange: entry,
      newChange: newCategory,
      changeType: "category",
    });
  });
};
