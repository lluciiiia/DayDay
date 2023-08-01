import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import FilteredEntries from "./filterEntries";
import { IonIcon } from "@ionic/react";
import { happy, sad, paw } from "ionicons/icons";
import { getPlaceAPI } from "../../../../../data/getPlaceAPI";
import { useEffect, useState } from "react";

const libraries = ["places"];

export const MapView = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const [apiKey, setApiKey] = useState("");
  const center = { lat: 40.72, lng: -73.96 }; // Set the initial center of the map
  useEffect(() => {
    let apiLoaded = false;
    async function fetchGooglePlacesApiKey() {
      try {
        const apiKey = await new getPlaceAPI().getEntry();
        console.log("apikey: ", apiKey);
        setApiKey(apiKey);
        apiLoaded = true;
      } catch (error) {
        console.error(error);
      }
    }
    if (!apiLoaded) {
      fetchGooglePlacesApiKey();
    }
  }, []);

  // Use the filteredEntries obtained from the FilteredEntries component
  const filteredEntries = FilteredEntries();
  if (filteredEntries === null) {
    return [];
  }
  console.log(
    "filteredEntries.lat: ",
    filteredEntries.map((filteredEntry) => filteredEntry.lat)
  );
  if (filteredEntries === null) {
    return [];
  }

  const renderMarkers = () => {
    return filteredEntries.map((filteredEntry) => (
      <Marker
        key={filteredEntry.placeId}
        position={{ lat: filteredEntry.lat, lng: filteredEntry.lng }}
        label={{
          text: filteredEntry.placeName,
          color: "black",
          fontWeight: "bold",
        }}>
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

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}>
        {renderMarkers()}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
