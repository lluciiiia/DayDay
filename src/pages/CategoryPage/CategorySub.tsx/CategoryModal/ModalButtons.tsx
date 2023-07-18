import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  useIonToast,
} from "@ionic/react";
import { CategoriesData, EntriesData } from "../../../../GetPutData";
import { presentToast } from "../../../../else/presentToast";

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

  const handleRenameCategory = async (
    newCategory: string,
    categoriesData: CategoriesData
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

  const handleAddCategory = async (
    newCategory: string,
    categoriesData: CategoriesData
  ) => {
    const updatedData = [...categories, newCategory];
    setCategories(updatedData);
    console.log(updatedData);
    console.log(newCategory);
    await categoriesData.putCategoriesData(newCategory);
  };

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
            await handleRenameCategory(newCategory, categoriesData);
          } else {
            await handleAddCategory(newCategory, categoriesData);
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
