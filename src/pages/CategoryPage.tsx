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
  IonIcon,
} from "@ionic/react";
import { flame, settingsOutline } from "ionicons/icons";

const CategoryPage = () => {
  return (
    <>
      <IonHeader></IonHeader>
      <IonContent scrollY={true}>
        <div style={{display:"flex", flexDirection: "row"}}>
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
          <IonIcon icon={settingsOutline} style={{ marginTop: "38px", fontSize: "28px", marginLeft: "210px"}} />
        </div>

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
