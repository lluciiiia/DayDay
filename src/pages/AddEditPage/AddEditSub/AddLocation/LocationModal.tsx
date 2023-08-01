import React, { useState, useRef } from "react";
import { IonModal, IonSearchbar } from "@ionic/react";
import ModalButtons from "./ModalHeader";

import LoadGoogleMap from "./LoadGoogleMap";

interface LocationModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setSelectedLocation: (value: string) => void;
  setSelectedLocationName: (value: string) => void;
  setSelectedLocationLatitude: (latitude: number) => void;
  setSelectedLocationLongitude: (longitude: number) => void;
}

interface PlaceResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  name: string;
  place_id: string;
}

const LocationModal: React.FC<LocationModalProps> = ({
  showModal,
  setShowModal,
  setSelectedLocation,
  setSelectedLocationName,
  setSelectedLocationLatitude,
  setSelectedLocationLongitude
}) => {
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const searchRef = useRef<HTMLIonSearchbarElement>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const handleInput = () => {
    const searchValue = searchRef.current?.value;
    setSearchResults([]); // Reset the state when handling new input
    if (googleMapsLoaded && searchValue) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request = {
        query: searchValue,
        fields: ["formatted_address", "geometry"],
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          setSearchResults(results as PlaceResult[]);
        }
      });
    }
  };

  return (
    <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
      <div className="modal-content">
        <div>
          <ModalButtons setShowModal={setShowModal} />
          <IonSearchbar
            showClearButton="focus"
            ref={searchRef}
            onIonInput={handleInput}
            style={{ marginTop: "5px" }}></IonSearchbar>
        </div>

        <LoadGoogleMap
          setShowModal={setShowModal}
          setSelectedLocation={setSelectedLocation}
          setSelectedLocationName={setSelectedLocationName}
          searchResults={searchResults}
          googleMapsLoaded={googleMapsLoaded}
          setGoogleMapsLoaded={setGoogleMapsLoaded}
        />
      </div>
    </IonModal>
  );
};

export default LocationModal;
