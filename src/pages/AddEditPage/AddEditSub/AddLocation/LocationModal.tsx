import React, { useState } from "react";
import {
  IonModal,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonList,
} from "@ionic/react";
import ModalButtons from "./ModalButtons/ModalButtons";

interface LocationModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  
}

const LocationModal: React.FC<LocationModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const handleInput = () => {};

//   const handleCategoryClick = (selectedLocation: ) => {};

  return (
    <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
      <div>
        <ModalButtons setShowModal={setShowModal} />
        <IonSearchbar
          showClearButton="focus"
          onIonInput={handleInput}
          style={{ marginTop: "5px" }}></IonSearchbar>
      </div>

      {/*  list of location (search result / default: nearby locations?) */}
      {/* <IonList>
        {Object.values(locations).map((location, index) => (
          <IonItem key={index} style={{ fontSize: "18px" }}>
            <IonLabel
              onClick={() => handleCategoryClick(location)}
              style={{ padding: "13px" }}>
              {location}
            </IonLabel>
          </IonItem>
        ))}
      </IonList> */}
    </IonModal>
  );
};

export default LocationModal;
