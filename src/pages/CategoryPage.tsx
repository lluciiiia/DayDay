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
} from "@ionic/react";

const CategoryPage = () => {
  return (
    <>
      <IonHeader>
        {/* <IonToolbar>
          <IonTitle>Category</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent scrollY={true}>
        <p
          style={{
            fontSize: "28px",
            marginLeft: "15px",
            fontWeight: "bold",
            marginTop: "35px",
            marginBottom: "10px",
          }}>
          Category
        </p>
        <IonSearchbar
          showClearButton="focus"
          //onIonInput={handleInput}
        ></IonSearchbar>
        <IonList>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 1</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 2</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 3</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 4</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItem style={{ padding: "7px", fontSize: "18px" }}>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
};

export default CategoryPage;
