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

const CategoryPage = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}></IonContent>
    </>
  );
};

export default CategoryPage;
