import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
} from "@ionic/react";
import DoneClick from "./DoneClick";
import { Category } from "../../../../../data/interfaces";

interface ModalButtonsProps {
  setShowModal: (show: boolean) => void;
  categoryRef: React.RefObject<HTMLIonInputElement>;
  selectedCategory: Category | undefined;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categories: Category[];
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
  setShowModal,
  categoryRef,
  selectedCategory,
  setCategories,
  categories,
}) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
          </IonButtons>
          <IonTitle>New Category</IonTitle>

          <DoneClick
            setShowModal={setShowModal}
            categoryRef={categoryRef}
            selectedCategory={selectedCategory}
            setCategories={setCategories}
            categories={categories}
          />
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default ModalButtons;
