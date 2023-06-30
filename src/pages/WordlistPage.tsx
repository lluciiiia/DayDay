import React from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";

const WordlistPage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Word list</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}>
        <div style={{
          position: "absolute",
          top: 5,
        }}>
          <p style={{ fontSize: "25px" }}>Top 50 Frequently Used Words</p>
        </div>

        <IonList inset={true}>
          <IonItem>
            <IonLabel>element1</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>element2</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>element3</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>element4</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>element5</IonLabel>
          </IonItem>
        </IonList>
      </div>
    </IonContent>
  </>
);

export default WordlistPage;
