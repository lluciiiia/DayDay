import React, { useState, useRef, useEffect } from "react";
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
  IonModal,
  IonCheckbox,
  IonButtons,
  IonPage,
} from "@ionic/react";
import { flame, reload, settingsOutline } from "ionicons/icons";
import "../main.css";

const CategoryPage = () => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    const itemId = e.target.id;
    if (itemId === "addCategory") {
      setShowModal(true);
    } else {
      popover.current!.event = e;
      setPopoverOpen(true);
    }
  };

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
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
          style={{
            marginTop: "38px",
            fontSize: "28px",
            marginLeft: "210px",
          }}
        />
        <IonPopover trigger="popover-button" dismissOnSelect={true}>
          <IonContent scrollY={false}>
            <IonList>
              <IonItem
                button={true}
                detail={false}
                onClick={openPopover}
                id="addCategory">
                add category
              </IonItem>

              <IonItem button={true} detail={false}>
                edit category
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
      </div>

      <IonSearchbar showClearButton="focus"></IonSearchbar>
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
      {/* add category section  */}
      {showModal && (
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          presentingElement={presentingElement}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  onClick={() => {
                    setShowModal(false);
                  }}
                 >
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>add category</IonTitle>
              <IonButtons slot="end">
                {/* TODO: Done onclick -> add the list */}
                <IonButton onClick={() => {}} > 
                  Done
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        </IonModal>
      )}
    </IonContent>
  );
};

export default CategoryPage;
