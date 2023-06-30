import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonToast,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";

interface LocationState {
  selectedDate: string;
}

const AddPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [content, setContent] = useState("");
  const [present] = useIonToast();
  const selectedDate = location.state?.selectedDate;
  console.log("date in AddPage:", selectedDate);

  const handleSave = () => {
    if (content.trim() === "") {
      presentToast("Please enter your diary content");
      return;
    }

    if (selectedDate) {
      saveData(selectedDate, content);
      updateList(selectedDate, content);
    }

    presentToast("Your diary is saved!");
    setTimeout(() => {
      history.push("/home");
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
  };

  // TODO: complete here
  const updateList = (key: string, value: string) => {};

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
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
            }}
            placeholder="Enter your diary here"></textarea>
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
    </>
  );
};

export default AddPage;
