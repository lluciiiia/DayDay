import React from "react";
import {
  IonModal,
  IonContent,
} from "@ionic/react";
import ModalInput from "./ModalInput";
import ModalButtons from "./ModalButtons/ModalButtons";
import { Category } from "../../../../data/interfaces";

interface CategoryModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  presentingElement: HTMLElement | undefined;
  selectedCategory: Category | undefined;
  categoryRef: React.RefObject<HTMLIonInputElement>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categories: Category[];
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
  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={() => setShowModal(false)}
      presentingElement={presentingElement}>
      <ModalButtons
        setShowModal={setShowModal}
        categoryRef={categoryRef}
        selectedCategory={selectedCategory}
        setCategories={setCategories}
        categories={categories}
      />

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
