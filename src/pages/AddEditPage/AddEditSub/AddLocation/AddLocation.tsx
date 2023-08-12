import React, { useState } from "react";
import { IonItem, IonLabel, IonChip, IonIcon } from "@ionic/react";
import LocationModal from "./LocationModal";
import { close } from "ionicons/icons";

interface AddLocationProps {
  setSelectedLocation: (value: string) => void;
  selectedLocationName: string;
  setSelectedLocationName: (value: string) => void;
  setSelectedLocationLatitude: (latitude: number) => void;
  setSelectedLocationLongitude: (longitude: number) => void;
}

const AddLocation: React.FC<AddLocationProps> = ({
  setSelectedLocation,
  selectedLocationName,
  setSelectedLocationName,
  setSelectedLocationLatitude,
  setSelectedLocationLongitude
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleChipClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedLocation("");
    setSelectedLocationName("");
  };

  return (
    <>
      <div style={{ marginLeft: "3px" }}>
        <IonItem>
          {selectedLocationName ? (
            <IonChip outline={true}>
              <IonLabel>{selectedLocationName} </IonLabel>{" "}
              <IonIcon icon={close} onClick={handleChipClose}></IonIcon>
            </IonChip>
          ) : (
            <IonLabel
              onClick={() => {
                setShowModal(true);
              }}
              style={{ fontSize: "17px", color: "rgb(150, 150, 150)" }}>
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
          setSelectedLocationLatitude={setSelectedLocationLatitude}
          setSelectedLocationLongitude={setSelectedLocationLongitude}
        />
      )}
    </>
  );
};

export default AddLocation;
