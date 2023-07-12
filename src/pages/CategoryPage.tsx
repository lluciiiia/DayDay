import React, { useState, useRef } from "react";
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
  IonButton,
  IonPopover,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";

const CategoryPage = () => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };
  return (
    <>
      <IonHeader></IonHeader>
      <IonContent scrollY={true}>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
          <IonIcon
            id="popover-button"
            icon={settingsOutline}
            onClick={openPopover}
            style={{ marginTop: "38px", fontSize: "28px", marginLeft: "210px" }}
          />
          <IonPopover trigger="popover-button" dismissOnSelect={true} >
            <IonContent scrollY={false}>
              <IonList >
                <IonItem button={true} detail={false}>
                  add category
                </IonItem>
                <IonItem button={true} detail={false}>
                  edit category
                </IonItem>
              </IonList>
            </IonContent>
          </IonPopover>
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
