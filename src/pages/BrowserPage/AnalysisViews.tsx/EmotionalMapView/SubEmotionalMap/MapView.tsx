import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import FilteredEntries from "./filterEntries";
import { IonIcon } from "@ionic/react";
import { happy, sad, paw } from "ionicons/icons";
import { getPlaceAPI } from "../../../../../data/getPlaceAPI";
import { useEffect, useState } from "react";

export const MapView = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const [apiKey, setApiKey] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false); // New state to track map load

  const center = { lat: 40.72, lng: -73.96 }; // Set the initial center of the map

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
  }, [apiKey]); // Add apiKey to the dependencies array to re-fetch if apiKey changes

  // Use the filteredEntries obtained from the FilteredEntries component
  const filteredEntries = FilteredEntries();
  if (filteredEntries === null) {
    return [];
  }

  console.log("filteredEntries.lat: ", filteredEntries.map((filteredEntry) => filteredEntry.lat));

  const renderMarkers = () => {
    return filteredEntries.map((filteredEntry) => (
      <Marker
        key={filteredEntry.placeId}
        position={{ lat: filteredEntry.lat, lng: filteredEntry.lng }}
        label={{
          text: filteredEntry.placeName,
          color: "black",
          fontWeight: "bold",
        }}
      >
        {filteredEntry.sentimentScore <= 0 ? (
          <IonIcon icon={sad} />
        ) : filteredEntry.sentimentScore <= 5 ? (
          <IonIcon icon={paw} />
        ) : (
          <IonIcon icon={happy} />
        )}
      </Marker>
    ));
  };

  console.log("apiKey before Load: ", apiKey);

  return apiKey ? ( // Conditionally render LoadScript based on apiKey
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setMapLoaded(true)}>
      {mapLoaded && ( // Conditionally render the GoogleMap component after the map has loaded
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
          {renderMarkers()}
        </GoogleMap>
      )}
    </LoadScript>
  ) : (
    <div>Loading...</div>
  );
};

export default MapView;
