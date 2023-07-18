import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  useIonToast,
} from "@ionic/react";
import { CategoriesData } from "../../../../../GetPutData";
import { presentToast } from "../../../../../else/presentToast";
import { handleAddCategory } from "./AddCategory";
import { handleRenameCategory } from "./RenameCategory";

interface ModalButtonsProps {
  setShowModal: (show: boolean) => void;
  categoryRef: React.RefObject<HTMLIonInputElement>;
  selectedCategory: string;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
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

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
          </IonButtons>
          <IonTitle>New Category</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDoneClick}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default ModalButtons;
