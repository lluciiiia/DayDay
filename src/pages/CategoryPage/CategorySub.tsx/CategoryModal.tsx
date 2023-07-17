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

  const handleDoneClick = () => {
    const newCategory = categoryRef.current?.value as string;
    if (newCategory) {
      let updatedData: any;
      // Rename the existing category
      if (selectedCategory) {
        const categoryIndex = categories.findIndex(
          (category) => category === selectedCategory
        );
        updatedData = [...categories];
        updatedData[categoryIndex] = newCategory;
      } // Add a new category
      else {
        updatedData = [...categories, newCategory];
      }
      const categoriesData = new CategoriesData();
      categoriesData
        .putCategoriesData(updatedData)
        .then(() => {
          setCategories(updatedData);
          setShowModal(false);
        })
        .catch((error: any) => {
          console.error("Error updating categories:", error);
        });
    } else {
      presentToast("Enter new category");
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
