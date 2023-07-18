import React, { useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonInput,
  useIonToast,
} from "@ionic/react";
import { list } from "ionicons/icons";
import { CategoriesData } from "../../../GetPutData";
import { EntriesData } from "../../../GetPutData";

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
                entry: entry,
                selectedCategory: selectedCategory,
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}>
          <div
            style={{
              background: "rgba(70, 70, 70, 0.5)",
              width: "350px",
              height: "200px",
              borderRadius: "10px",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15px",
              }}>
              <IonIcon
                icon={list}
                style={{
                  fontSize: "68px",
                  background: "rgba(56, 128, 255)",
                  padding: "15px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}>
              <IonInput
                ref={categoryRef}
                placeholder="Category Name"
                maxlength={10}
                style={{
                  background: "rgba(120, 120, 120, 0.4)",
                  width: "300px",
                  borderRadius: "10px",
                  fontSize: "20px",
                  color: "rgba(255, 255, 255, 0.5)",
                  textAlign: "center",
                }}
                value={selectedCategory} // Set the initial value of the input field
              ></IonInput>
            </div>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default CategoryModal;
