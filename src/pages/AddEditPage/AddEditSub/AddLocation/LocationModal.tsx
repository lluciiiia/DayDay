import React, { useState, useRef, useEffect } from "react";
import {
  IonModal,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonContent,
} from "@ionic/react";
import ModalButtons from "./ModalHeader";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { getPlaceAPI } from "../../../../data/getPlaceAPI";

interface LocationModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
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

declare global {
  interface Window {
    googleMapsLoaded: boolean;
  }
}

const LocationModal: React.FC<LocationModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const searchRef = useRef<HTMLIonSearchbarElement>(null);
  // Loading state to display while waiting for Google Maps API to load
  const [isLoading, setIsLoading] = useState(true);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Fetch the Google Places API key from the backend when the component mounts
  useEffect(() => {
    async function fetchGooglePlacesApiKey() {
      try {
        const apiKey = await new getPlaceAPI().getEntry();
        console.log("apikey: ", apiKey);
        loadGoogleMapsScript(apiKey);
      } catch (error) {
        console.error(error);
      }
    }

    if (!googleMapsLoaded) {
      fetchGooglePlacesApiKey();
    }
  }, [googleMapsLoaded]);

  const loadGoogleMapsScript = (apiKey: string) => {
    if (!window.googleMapsLoaded) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = () => {
        setGoogleMapsLoaded(true);
        setIsLoading(false); // Set isLoading to false when API is loaded
      };
      document.head.appendChild(googleMapsScript);
      window.googleMapsLoaded = true;
    } else {
      setGoogleMapsLoaded(true);
      setIsLoading(false); // Set isLoading to false if API was already loaded
    }
  };

  const handleInput = () => {
    const searchValue = searchRef.current?.value;
    console.log("searchValue: ", searchValue);
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
          setSearchResults(results as PlaceResult[]); // Cast results as PlaceResult[]
        }
      });
    }
  };

  const handleLocationClick = (selectedLocation: PlaceResult) => {
    const placeId = selectedLocation.place_id;
    console.log("Clicked Location's place_id:", placeId);
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

        {searchResults.length > 0 ? (
          <IonContent style={{ marginTop: "0px", height: "735px" }}>
            <IonList style={{ marginTop: "0px", height: "735px" }}>
              {searchResults.map((result, place_id) => (
                <IonItem key={place_id}>
                  <IonLabel
                    onClick={() => handleLocationClick(result)}
                    style={{ padding: "13px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "18px" }}>{result.name}</div>
                      <div style={{ marginTop: "3px", fontSize: "13px" }}>
                        {result.formatted_address}
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        ) : (
          <div
            style={{
              background: "rgb(0,0,0)",
              marginTop: "0px",
              height: "735px",
            }}></div>
        )}

        {isLoading ? ( // Show loading message while waiting for Google Maps API to load
          <div>Loading...</div>
        ) : googleMapsLoaded ? (
          <GoogleMap>
            {searchResults.map((result, place_id) => (
              <Marker
                key={place_id}
                position={{
                  lat: result.geometry.location.lat(),
                  lng: result.geometry.location.lng(),
                }}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Failed to load Google Maps API.</div>
        )}
      </div>
    </IonModal>
  );
};

export default LocationModal;
