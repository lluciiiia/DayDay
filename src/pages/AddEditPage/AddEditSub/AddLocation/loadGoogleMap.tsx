import React, { useEffect } from "react";
import { IonList, IonItem, IonLabel, IonContent } from "@ionic/react";
import ModalButtons from "./ModalHeader";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { getPlaceAPI } from "../../../../data/getPlaceAPI";

interface LoadGoogleMapProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setSelectedLocation: (value: string) => void;
  setSelectedLocationName: (value: string) => void;
  searchResults: PlaceResult[];
  setSearchResults: (value: PlaceResult[]) => void;
  googleMapsLoaded: boolean;
  setGoogleMapsLoaded: (value: boolean) => void;
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

const LoadGoogleMap: React.FC<LoadGoogleMapProps> = ({
  showModal,
  setShowModal,
  setSelectedLocation,
  setSelectedLocationName,
  searchResults,
  setSearchResults,
  googleMapsLoaded,
  setGoogleMapsLoaded,
}) => {
  useEffect(() => {
    let apiLoaded = false;
    async function fetchGooglePlacesApiKey() {
      try {
        const apiKey = await new getPlaceAPI().getEntry();
        console.log("apikey: ", apiKey);
        setTimeout(function () {
          loadGoogleMapsScript(apiKey);
          if (!googleMapsLoaded) {
            fetchGooglePlacesApiKey();
            // repeat the process til googleMapsLoaded is true
          }
        }, 5000);
        apiLoaded = true;
      } catch (error) {
        console.error(error);
      }
    }
    if (!apiLoaded) {
      fetchGooglePlacesApiKey();
      // repeat the process til googleMapsLoaded is true
    }
  });

  const loadGoogleMapsScript = (apiKey: string) => {
    setTimeout(() => {
      if (!window.googleMapsLoaded) {
        const googleMapsScript = document.createElement("script");
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`;
        googleMapsScript.async = true;
        googleMapsScript.defer = true;
        googleMapsScript.onload = () => {};
        document.head.appendChild(googleMapsScript);
        window.googleMapsLoaded = true;
        setGoogleMapsLoaded(true);
      }
      if (!googleMapsLoaded) {
        // repeat the process til googleMapsLoaded is true
      }
    }, 5000);
  };

  const handleLocationClick = (selectedLocation: PlaceResult) => {
    const placeId = selectedLocation.place_id;
    const placeName = selectedLocation.name;

    setSelectedLocation(placeId);
    setSelectedLocationName(placeName);
    setShowModal(false);
  };

  return (
    <>
      {googleMapsLoaded && searchResults.length > 0 ? (
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

      {!googleMapsLoaded ? ( // Show loading message while waiting for Google Maps API to load
        <div>Loading...</div>
      ) : (
        <GoogleMap
          center={{ lat: 0, lng: 0 }} // Set the initial center to some default value
          zoom={10} // Set the initial zoom level to some default value
          mapContainerStyle={{ height: "400px", width: "100%" }} // Set the map container style
        >
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
      )}
    </>
  );
};

export default LoadGoogleMap;
