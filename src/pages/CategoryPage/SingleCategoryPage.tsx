// TODO: dynamic category page 

// (1) view a list of diaries 
// (2) addPage (selectedCategory) in the list / 
// (3) if click on a diary: viewPage of it

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
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from "@ionic/react";

const SingleCategoryPage = () => {

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
        category name
      </p>
      <IonSearchbar
        showClearButton="focus"
        //onIonInput={handleInput}
      ></IonSearchbar>
      <IonList>

      </IonList>
    </>
  );
};

export default SingleCategoryPage;
