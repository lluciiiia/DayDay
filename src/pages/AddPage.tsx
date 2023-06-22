import React, { useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { mic, document, images } from "ionicons/icons";

const AddPage = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    const text = textareaRef.current?.value;
    if (text) {
      // Add your logic to save the diary entry
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Write your day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
          <div
            style={{
              height: 680,
              overflowY: "scroll",
              maxWidth: 370,
              margin: "0 auto",
              padding: "20px 3px"
            }}
          >
            <textarea
              ref={textareaRef}
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 10,
                borderColor: "transparent",
              }}
              placeholder="Enter your diary here"
            ></textarea>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: 10,
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0.5rem",
            }}
          >
            <IonButton fill="outline" id="voice">
              <IonIcon icon={mic} />
            </IonButton>
            <IonButton fill="outline" id="scan">
              <IonIcon icon={document} />
            </IonButton>
            <IonButton fill="outline" id="attachment">
              <IonIcon icon={images} />
            </IonButton>
            <IonButton
              fill="outline"
              id="save"
              style={{ width: "160px" }}
              onClick={handleSave}
            >
              Save
            </IonButton>
          </div>
       
      </IonContent>
    </>
  );
};

export default AddPage;
