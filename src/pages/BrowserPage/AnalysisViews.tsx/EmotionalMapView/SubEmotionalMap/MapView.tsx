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
