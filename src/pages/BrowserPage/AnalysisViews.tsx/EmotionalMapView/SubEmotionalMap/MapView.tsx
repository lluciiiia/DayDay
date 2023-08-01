import { GoogleMap, Marker } from "@react-google-maps/api";
import FilteredEntries from "./filterEntries";
import { IonIcon } from "@ionic/react";
import { happy, sad, paw } from "ionicons/icons";

export const MapView = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = { lat: 40.72, lng: -73.96 }; // Set the initial center of the map

  // Use the filteredEntries obtained from the FilteredEntries component
  const filteredEntries = FilteredEntries();
  console.log("filteredEntries.lat: ", filteredEntries?.map((filteredEntry) => filteredEntry.lat));
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
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10} // Set an appropriate initial zoom level
    >
      {renderMarkers()}
    </GoogleMap>
  );
};

export default MapView;
