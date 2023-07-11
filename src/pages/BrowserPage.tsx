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

const BrowserPage = () => {
  // Enable to reorder the list
  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);
    event.detail.complete();
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Browser</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonSearchbar
            showClearButton="focus"
            //onIonInput={handleInput}
          ></IonSearchbar>
      <IonList>
        {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
          <IonItem>
            <IonLabel>Item 1</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 2</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 3</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 4</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
        </IonReorderGroup>
      </IonList>
    </>
  );
};

export default BrowserPage;
