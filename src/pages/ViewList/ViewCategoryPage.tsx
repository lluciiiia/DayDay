import React, { useState } from "react";
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

const ViewCategoryPage = () => {
  const location = useLocation<{ category?: string }>();
  const category = location?.state?.category || "";

  return (
    <>
      <IonHeader></IonHeader>
      <p
        style={{
          fontSize: "28px",
          marginLeft: "15px",
          fontWeight: "bold",
          marginTop: "35px",
          marginBottom: "10px",
        }}>
        {category}
      </p>
      <IonSearchbar
        showClearButton="focus"
        //onIonInput={handleInput}
      ></IonSearchbar>
      <IonList></IonList>
    </>
  );
};

export default ViewCategoryPage;
