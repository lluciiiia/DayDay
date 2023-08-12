import { IonContent } from "@ionic/react";
import MapView from "./SubEmotionalMap/MapView";

export const EmotionalMapView = () => {
  return (
    <>
      <p
        style={{
          fontSize: "28px",
          marginLeft: "15px",
          fontWeight: "bold",
          marginTop: "35px",
          marginBottom: "50px",
        }}>
        Emotional Map Analysis
      </p>
      <IonContent scrollY={false}>
        <MapView />
      </IonContent>
    </>
  );
};

export default EmotionalMapView;
