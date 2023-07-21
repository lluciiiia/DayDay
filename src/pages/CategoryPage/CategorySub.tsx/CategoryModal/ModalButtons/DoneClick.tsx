import React from "react";
import { CategoryServiceImpl } from "../../../../../data/DataService";
import { presentToast } from "../../../../../else/presentToast";
import { handleAddCategory } from "./AddCategory";
import { handleRenameCategory } from "./RenameCategory";
import { useIonToast, IonButtons, IonButton } from "@ionic/react";
import { Category } from "../../../../../data/interfaces";

interface DoneClickProps {
  setShowModal: (show: boolean) => void;
  categoryRef: React.RefObject<HTMLIonInputElement>;
  selectedCategory: Category | undefined;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categories: Category[];
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
      const categoriesData = new CategoryServiceImpl();

      try {
        const existingCategories = await categoriesData.getAllCategories();
        if (
          Object.values(existingCategories).some(
            (category) => category.name === newCategory
          ) &&
          selectedCategory && newCategory !== selectedCategory.name
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
