import { IonAlert } from "@ionic/react";
import React from "react";
import { EntriesData } from "../../../../GetPutData";
import { CategoriesData } from "../../../../GetPutData";

interface CategoryAlertProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  deletingCategory: string | null;
  setDeletingCategory: React.Dispatch<React.SetStateAction<string | null>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
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
      const entriesData = new EntriesData();
      const currentEntriesData = await entriesData.getEntriesData();

      const filteredEntries: Entry[] = currentEntriesData.filter(
        (entry: Entry) => entry.category === categoryToDelete
      );
      filteredEntries.forEach((entry: Entry) => {
        entriesData.deleteEntriesData(entry);
      });

      // Delete the category
      const categoriesData = new CategoriesData();
      await categoriesData.deleteCategoriesData(categoryToDelete);

      // update the UI
      const updatedData = await categoriesData.getCategoriesData();
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
              const indexToDelete = categories.indexOf(deletingCategory);
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
