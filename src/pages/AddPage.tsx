import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonToast,
  IonInput,
  IonItem,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { AddAll } from "./UpdateAll";

interface LocationState {
  selectedDate: string;
}

const AddPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [present] = useIonToast();
  const selectedDate = location.state?.selectedDate;

  const handleSave = async () => {
    if (title.trim() === "") {
      presentToast("Please enter your diary title");
      return;
    }
    if (content.trim() === "") {
      presentToast("Please enter your diary content");
      return;
    }

    const entry: Entry = {
      content: [], // Modify this to match your Content interface
      date: selectedDate,
      title: title, // TODO: title input section
      category: "Your category here", // TODO: category input section
    };

    try {
      AddAll(entry);  

      presentToast("Your diary is saved!");
      setTimeout(() => {
        history.push("/calendar");
      }, 1000);
    } catch (error) {
      console.error(error);
      presentToast("Failed to save your diary.");
    }
  };

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1000,
      position: "middle",
    });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.detail.value);
  };


  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Write your day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <div style={{margin: "8px"}}>
          <IonItem style={{fontSize: "20px"}}>
            <IonInput label="Title" placeholder="Enter the title" value={title} onIonChange={handleTitleChange}></IonInput>
          </IonItem>
        </div>
        <div
          style={{
            height: 610,
            overflowY: "scroll",
            maxWidth: 370,
            margin: "auto",
            padding: "0px 3px 20px 3px",
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
              fontSize: "18px"
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
