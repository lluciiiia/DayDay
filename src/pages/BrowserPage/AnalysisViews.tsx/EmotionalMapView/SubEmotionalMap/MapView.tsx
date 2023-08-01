import {
  GoogleMap,
  Marker,
  LoadScript,
  OverlayView,
} from "@react-google-maps/api";
import FilteredEntries from "./filterEntries";
import { getPlaceAPI } from "../../../../../data/getPlaceAPI";
import { useEffect, useState } from "react";
import { HappyDataUrl, SadDataUrl, MiddleDataUrl } from "./iconUrls";

export const MapView = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const [apiKey, setApiKey] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false); // New state to track map load

  const center = { lat: 10.7, lng: 106.7 }; // Set the initial center of the map

  useEffect(() => {
    async function fetchGooglePlacesApiKey() {
      try {
        const apiKey = await new getPlaceAPI().getEntry();
        console.log("apikey: ", apiKey);
        setApiKey(apiKey);
      } catch (error) {
        console.error(error);
      }
    }

    if (!apiKey) {
      fetchGooglePlacesApiKey();
    }
  }, [apiKey]); 

  const filteredEntries = FilteredEntries();
  if (filteredEntries === null) {
    return [];
  }

  console.log(
    "filteredEntries.lat: ",
    filteredEntries.map((filteredEntry) => filteredEntry.lat)
  );
  console.log(
    "filteredEntries.lng: ",
    filteredEntries.map((filteredEntry) => filteredEntry.lng)
  );
  console.log(
    "filteredEntries.placeId: ",
    filteredEntries.map((filteredEntry) => filteredEntry.placeId)
  );
  console.log(
    "filteredEntries.placeName: ",
    filteredEntries.map((filteredEntry) => filteredEntry.placeName)
  );

//   const happyIcon = `
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//     <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zM8 11V9a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm8-2v2a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0zm-8 5h8a4 4 0 0 1-8 0z"/>
//   </svg>
// `;

//   const sadIcon = `
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//     <path d="M8 11V9a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm7 1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm-3 2a6.036 6.036 0 0 0-4.775 2.368 1 1 0 1 0 1.55 1.264 4 4 0 0 1 6.45 0 1 1 0 0 0 1.55-1.264A6.036 6.036 0 0 0 12 14zm11-2A11 11 0 1 1 12 1a11.013 11.013 0 0 1 11 11zm-2 0a9 9 0 1 0-9 9 9.01 9.01 0 0 0 9-9z"/>
//   </svg>
// `;

//   const middleIcon = `
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//     <path d="M10 9v2a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0zm5-1a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1zm8 4A11 11 0 1 1 12 1a11.013 11.013 0 0 1 11 11zm-2 0a9 9 0 1 0-9 9 9.01 9.01 0 0 0 9-9z"/>
//   </svg>
// `;

//   // SVG code for icons
//   const HappyDataUrl = `data:image/svg+xml;base64,${btoa(happyIcon)}`;
//   const SadDataUrl = `data:image/svg+xml;base64,${btoa(sadIcon)}`;
//   const MiddleDataUrl = `data:image/svg+xml;base64,${btoa(middleIcon)}`;

  const renderMarkers = () => {
    return filteredEntries.map((filteredEntry) => (
      <Marker
        key={filteredEntry.placeId}
        position={{ lat: filteredEntry.lat, lng: filteredEntry.lng }}
        icon={{
          url:
            filteredEntry.sentimentScore <= 0
              ? SadDataUrl
              : filteredEntry.sentimentScore <= 5
              ? MiddleDataUrl
              : HappyDataUrl,
          scaledSize: new window.google.maps.Size(30, 30), // Adjust the size as needed
        }}>
        <OverlayView
          position={{ lat: filteredEntry.lat, lng: filteredEntry.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div
            style={{
              background: "white",
              color: "black",
              border: "2px solid black",
              padding: "5px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "10px",
              transform: "translate(-100%, 0%)", // Center the div horizontally
              width: "80px",
              height: "25px",
              marginLeft: "40px",
            }}>
            {filteredEntry.placeName}
          </div>
        </OverlayView>
      </Marker>
    ));
  };

  console.log("apiKey before Load: ", apiKey);

  return apiKey ? ( 
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setMapLoaded(true)}>
      {mapLoaded && ( 
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}>
          {renderMarkers()}
        </GoogleMap>
      )}
    </LoadScript>
  ) : (
    <div>Loading...</div>
  );
};

export default MapView;
