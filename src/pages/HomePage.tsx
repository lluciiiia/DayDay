import React from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonDatetime,
  IonButton,
} from "@ionic/react";

const HomePage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Write your diary</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          paddingBottom: 60,
          alignItems: "center",
        }}
      >
        <div
          style={{
            alignSelf: "center",
            paddingTop: 30,
          }}
        >
          <IonDatetime></IonDatetime>
        </div>

        <div
          style={{
            marginBottom: "5px",
            width: "100%",
            maxWidth: "370px",
          }}
        >
          <div style={{ marginTop: "10px" }}>
            <IonButton expand="block">Add</IonButton>
          </div>
          <div style={{ marginTop: "10px" }}>
            <IonButton expand="block">Edit</IonButton>
          </div>
        </div>
      </div>
    </IonContent>
  </>
);

export default HomePage;
