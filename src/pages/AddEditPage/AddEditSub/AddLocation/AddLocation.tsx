import React, { useState } from "react";
import { IonModal, IonItem, IonLabel, IonChip } from "@ionic/react";
import LocationModal from "./LocationModal";

interface AddLocationProps {
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
}

const AddLocation: React.FC<AddLocationProps> = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLocationName, setSelectedLocationName] = useState("");

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
          {selectedLocationName ? (
            <IonChip outline={true}>{selectedLocationName}</IonChip>
          ) : null}
        </IonItem>
      </div>

      {showModal && (
        <LocationModal
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedLocation={setSelectedLocation}
          setSelectedLocationName={setSelectedLocationName}
        />
      )}
    </>
  );
};

export default AddLocation;
