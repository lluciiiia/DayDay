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
  IonInput,
  IonButtons,
  IonPage,
} from "@ionic/react";
import { flame, reload, settingsOutline, list } from "ionicons/icons";
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
                Add Category
              </IonItem>

              <IonItem button={true} detail={false}>
                Edit Category
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
      </div>

      {/* TODO: search the name of the list (fusy.js) */}
      <IonSearchbar showClearButton="focus"></IonSearchbar>

      {/* TODO: make the list dynamic. It can be added from addCategory Modal && The list (data) of the categories must be saved in backend server */}
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
                  }}>
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>New Category</IonTitle>
              <IonButtons slot="end">
                {/* TODO: Done onclick -> add the list */}
                <IonButton onClick={() => {}}>Done</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent scrollY={false}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}>
              <div
                style={{
                  background: "rgba(70, 70, 70, 0.5)",
                  width: "350px",
                  height: "200px",
                  borderRadius: "10px",
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                  }}>
                  <IonIcon
                    icon={list}
                    style={{
                      fontSize: "68px",
                      background: "rgba(56, 128, 255)",
                      padding: "15px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                  }}>
                  <IonInput
                    placeholder="Category Name"
                    style={{
                      background: "rgba(120, 120, 120, 0.5)",
                      width: "300px",
                      borderRadius: "10px",
                      fontSize: "25px",
                      textAlign: "center",
                    }}></IonInput>
                </div>
              </div>
            </div>
          </IonContent>
        </IonModal>
      )}
    </IonContent>
  );
};

export default CategoryPage;
