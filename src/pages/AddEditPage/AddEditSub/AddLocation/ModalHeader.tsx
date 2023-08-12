import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
} from "@ionic/react";

interface ModalHeaderProps {
  setShowModal: (show: boolean) => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ setShowModal }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
          </IonButtons>
          <IonTitle>Add Location</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default ModalHeader;
