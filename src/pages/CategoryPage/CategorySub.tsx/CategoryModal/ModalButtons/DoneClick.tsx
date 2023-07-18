import React from "react";
import { CategoriesData } from "../../../../../GetPutData";
import { presentToast } from "../../../../../else/presentToast";
import { handleAddCategory } from "./AddCategory";
import { handleRenameCategory } from "./RenameCategory";
import { useIonToast, IonButtons, IonButton } from "@ionic/react";

interface DoneClickProps {
  setShowModal: (show: boolean) => void;
  categoryRef: React.RefObject<HTMLIonInputElement>;
  selectedCategory: string;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
}

const DoneClick: React.FC<DoneClickProps> = ({
  setShowModal,
  categoryRef,
  selectedCategory,
  setCategories,
  categories,
}) => {
  const [present] = useIonToast();

  const handleDoneClick = async () => {
    const newCategory = categoryRef.current?.value as string;
    if (newCategory) {
      const categoriesData = new CategoriesData();

      try {
        const existingCategories = await categoriesData.getCategoriesData();
        if (
          existingCategories.includes(newCategory) &&
          newCategory !== selectedCategory
        ) {
          presentToast(present, "Category already exists!"); // except keeping the same name
        } else {
          if (selectedCategory) {
            await handleRenameCategory(
              newCategory,
              categoriesData,
              selectedCategory,
              setCategories,
              categories
            );
          } else {
            await handleAddCategory(
              newCategory,
              categoriesData,
              setCategories,
              categories
            );
          }
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error handling category update:", error);
      }
    } else {
      presentToast(present, "Enter a new category");
    }
  };

  // Render nothing since this is not a component that returns JSX
  return (
    <IonButtons slot="end">
      <IonButton onClick={handleDoneClick}>Done</IonButton>
    </IonButtons>
  );
};

export default DoneClick;
