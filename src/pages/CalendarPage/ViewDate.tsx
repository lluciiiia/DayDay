import React from "react";
import { useLocation } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from "@ionic/react";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>View Date Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p
          style={{
            fontSize: "28px",
            marginLeft: "15px",
            fontWeight: "bold",
            marginTop: "35px",
            marginBottom: "10px",
          }}>
          {selectedDate}
        </p>
        <IonSearchbar showClearButton="focus"></IonSearchbar>
        <IonList></IonList>
      </IonContent>
    </>
  );
};

export default ViewDatePage;
