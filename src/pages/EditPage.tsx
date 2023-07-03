import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonToast,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";

import { increaseCount } from "./Functionality/UpdateList";
import { decreaseCount } from "./Functionality/UpdateList";
import { addGraph, deleteGraph } from "./Functionality/Analysis";

interface LocationState {
  selectedDate: string;
}

const EditPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [content, setContent] = useState("");
  const [present] = useIonToast();

  const selectedDate = location.state?.selectedDate;
  const savedContent = localStorage.getItem(selectedDate) || "";

  // display the prev content
  useEffect(() => {
    setContent(savedContent);
  }, [savedContent]);

  const handleSave = () => {
    if (content.trim() === "") {
      presentToast("Please enter your diary content");
      return;
    }

    saveData(selectedDate, content);

    decreaseCount(savedContent);
    increaseCount(content);

    deleteGraph(selectedDate);
    addGraph(selectedDate, content);

    // TODO: delete dictionary / add dictionary

    presentToast("Your diary is saved!");
    setTimeout(() => {
      history.replace("/");
      window.location.reload();
    }, 1000);
  };

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1000,
      position: "middle",
    });
  };

  const saveData = (key: string, value: string) => {
    localStorage.setItem(key, value);

    // TODO: Update the localStorage dictionary
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <div
          style={{
            height: 680,
            overflowY: "scroll",
            maxWidth: 370,
            margin: "0 auto",
            padding: "20px 3px",
          }}>
          <textarea
            value={content}
            onChange={handleContentChange}
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              borderRadius: 10,
              borderColor: "transparent",
            }}></textarea>
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
          }}>
          <IonButton
            fill="outline"
            id="save"
            style={{ width: "160px" }}
            onClick={handleSave}>
            Save
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditPage;
