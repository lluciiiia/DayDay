import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonSearchbar,
  IonLabel,
} from "@ionic/react";

const BrowserPage = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Browser</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}></IonContent>
    </>
  );
};

export default BrowserPage;
