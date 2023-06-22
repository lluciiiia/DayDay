import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { IonSearchbar } from "@ionic/react";

const SearchPage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Search</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <IonSearchbar></IonSearchbar>
      </div>
    </IonContent>
  </>
);

export default SearchPage;
