import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
} from "@ionic/react";
import DoneClick from "./DoneClick";

interface ModalButtonsProps {
  setShowModal: (show: boolean) => void;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({ setShowModal }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
          </IonButtons>
          <IonTitle>Add Location</IonTitle>

          <DoneClick setShowModal={setShowModal} />
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default ModalButtons;
