import React, { useState, useRef, useEffect } from "react";
import {
  IonModal,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import ModalButtons from "./ModalButtons/ModalButtons";
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
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]); // Specify the type as PlaceResult[]
  const searchRef = useRef<HTMLIonSearchbarElement>(null);

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    // Fetch the Google Places API key from the backend when the component mounts
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
      googleMapsScript.onload = () => setGoogleMapsLoaded(true);
      document.head.appendChild(googleMapsScript);
      window.googleMapsLoaded = true;
    } else {
      setGoogleMapsLoaded(true);
    }
  };

  const handleInput = () => {
    const searchValue = searchRef.current?.value;
    console.log("searchValue: ",searchValue);
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

  const handleLocationClick = (selectedLocation: any) => {
    // Handle the click on a location from the search results
    // Here, you can use the selectedLocation object to get details about the place like name, address, etc.
  };

  return (
    <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
      <div>
        <ModalButtons setShowModal={setShowModal} />
        <IonSearchbar
          showClearButton="focus"
          ref={searchRef}
          onIonInput={handleInput}
          style={{ marginTop: "5px" }}></IonSearchbar>
      </div>

      <IonList>
        {searchResults.map((result, index) => (
          <IonItem key={index} style={{ fontSize: "18px" }}>
            <IonLabel
              onClick={() => handleLocationClick(result)}
              style={{ padding: "13px" }}>
              {result.formatted_address}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      {googleMapsLoaded && (
        <GoogleMap
        // Specify map options like center and zoom here if needed
        >
          {/* Add markers for search results on the map */}
          {searchResults.map((result, index) => (
            // <Marker
            //   key={index}
            //   position={{
            //     lat: result.geometry.location.lat(),
            //     lng: result.geometry.location.lng(),
            //   }}
            // />
            <IonList>

                <IonItem><IonLabel>{index}</IonLabel></IonItem>
            </IonList>
          ))}
        </GoogleMap>
      )}
    </IonModal>
  );
};

export default LocationModal;
