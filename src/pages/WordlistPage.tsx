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

import wordCount from "./Functionality/InitializeCount";

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
        <div
          style={{
            position: "absolute",
            top: 5,
          }}>
          <p style={{ fontSize: "25px" }}>Top 50 Frequently Used Words</p>
        </div>

        <IonList inset={true}>
          {Object.entries(wordCount).map(([word, count]) => (
            <IonItem key={word}>
              <IonLabel>{`${word}: ${count}`}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </div>
    </IonContent>
  </>
);

export default WordlistPage;
