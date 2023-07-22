import { IonAlert } from "@ionic/react";
import React from "react";
import { Entry, Category } from "../../../../data/interfaces";
import { UpdateResults } from "../../../../data/updateResults";
import {
  EntryServiceImpl,
  CategoryServiceImpl,
} from "../../../../data/DataService";

interface CategoryAlertProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  deletingCategory: Category | null;
  setDeletingCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const CategoryAlert: React.FC<CategoryAlertProps> = ({
  showAlert,
  setShowAlert,
  deletingCategory,
  setDeletingCategory,
  categories,
  setCategories,
}) => {
  const handleDeleteCategory = async (index: number) => {
    const categoryToDelete = categories[index];

    try {
      // delete every entry in the category
      const entriesData = new EntryServiceImpl();
      const updateResults = new UpdateResults();

      const currentEntriesData = await entriesData.getAllEntries();

      const filteredEntries: Entry[] = currentEntriesData.filter(
        (entry: Entry) => entry.category.name === categoryToDelete.name
      );

      filteredEntries.forEach((entry: Entry) => {
        entriesData.deleteEntry(entry.id); // update entry
        updateResults.deleteResultData(entry.id); // update analysis
      });

      // Delete the category
      const categoriesData = new CategoryServiceImpl();
      await categoriesData.deleteCategory(categoryToDelete.id);

      // update the UI
      const updatedData = await categoriesData.getAllCategories();
      setCategories(updatedData);
    } catch (error) {
      console.error("Error fetching entries data:", error);
    }
  };

  return (
    <IonAlert
      isOpen={showAlert}
      header="Every diary will be permanently removed"
      buttons={[
        {
          text: "Cancel",
          handler: () => {
            setShowAlert(false);
            setDeletingCategory(null);
          },
        },
        {
          text: "Confirm",
          handler: () => {
            if (deletingCategory) {
              const indexToDelete =
                Object.values(categories).indexOf(deletingCategory);
              handleDeleteCategory(indexToDelete);
            }
            setShowAlert(false);
            setDeletingCategory(null);
          },
        },
      ]}
    />
  );
};

export default CategoryAlert;
