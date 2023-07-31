import React, { useState } from "react";
import { IonItem, IonLabel, IonChip } from "@ionic/react";
import LocationModal from "./LocationModal";

interface AddLocationProps {
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedLocationName: string;
  setSelectedLocationName: (value: string) => void;
}

const AddLocation: React.FC<AddLocationProps> = ({
  selectedLocation,
  setSelectedLocation,
  selectedLocationName,
  setSelectedLocationName,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{ marginLeft: "3px" }}>
        <IonItem
          onClick={() => {
            setShowModal(true);
          }}>
          {selectedLocationName ? (
            <IonChip outline={true}>{selectedLocationName}</IonChip>
          ) : (
            <IonLabel style={{ fontSize: "17px", color: "rgb(150, 150, 150)" }}>
              Add Location
            </IonLabel>
          )}
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
