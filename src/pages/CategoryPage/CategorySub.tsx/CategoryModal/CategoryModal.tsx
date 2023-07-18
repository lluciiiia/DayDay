import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  useIonToast,
} from "@ionic/react";
import { CategoriesData } from "../../../../GetPutData";
import { EntriesData } from "../../../../GetPutData";
import ModalInput from "./ModalInput";

interface CategoryModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  presentingElement: HTMLElement | undefined;
  selectedCategory: string;
  categoryRef: React.RefObject<HTMLIonInputElement>;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  showModal,
  setShowModal,
  presentingElement,
  selectedCategory,
  categoryRef,
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
          presentToast("Category already exists!"); // except keeping the same name
        } else {
          // rename a category
          if (selectedCategory) {
            const updatedData: string[] = [...categories];
            const categoryIndex = categories.findIndex(
              (category) => category === selectedCategory
            );
            updatedData[categoryIndex] = newCategory;
            setCategories(updatedData);

            // rename it in categoriesData in backend
            await categoriesData.modifyCategoriesData([
              selectedCategory,
              newCategory,
            ]);

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

            // add a new category
          } else {
            const updatedData = [...categories, newCategory];
            setCategories(updatedData);
            console.log(updatedData);
            console.log(newCategory);
            await categoriesData.putCategoriesData(newCategory); // Request the backend to add a new category
          }
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error handling category update:", error);
      }
    } else {
      presentToast("Enter a new category");
    }
  };

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 100,
      position: "middle",
    });
  };

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      presentingElement={presentingElement}>
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

      <IonContent scrollY={false}>
        <ModalInput
          categoryRef={categoryRef}
          selectedCategory={selectedCategory}
        />
      </IonContent>
    </IonModal>
  );
};

export default CategoryModal;
