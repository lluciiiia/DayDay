import React, { useState } from "react";
import { IonModal, IonItem, IonLabel } from "@ionic/react";
import LocationModal from "./LocationModal";

interface AddLocationProps {}

const AddLocation: React.FC<AddLocationProps> = ({}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{ marginLeft: "3px" }}>
        <IonItem
          onClick={() => {
            setShowModal(true);
          }}>
          <IonLabel style={{ fontSize: "17px", color: "rgb(150, 150, 150)" }}>
            Add Location
          </IonLabel>
        </IonItem>
      </div>

      {showModal && (
        <LocationModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default AddLocation;
