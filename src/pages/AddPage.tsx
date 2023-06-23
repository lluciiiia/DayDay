import React, { useState, useRef } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonDatetime, IonButton, IonIcon, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import { mic, document, images } from "ionicons/icons";

const AddPage = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [present] = useIonToast();

  const handleSave = () => {
    if (content.trim() === "") {
      presentToast("Please enter your diary content");
      return;
    }
  
    // Save the diary entry in local storage
    saveData('diaryEntry', content); // TODO: key => Date
  
    // Show success toast and navigate back to the home page after a short delay
    presentToast("Your diary is saved!");
    setTimeout(() => {
      history.push("/home");
    }, 1000);
  };
  

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1500,
      position: "middle",
    });
  };

  const saveData = (key: string, value: string) => {
    localStorage.setItem(key, value); // key=date, value=content
  };
  

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleImageClick = () => {
    // implement API
  };

  const handleVoiceClick = () => {
    // Implement voice recording functionality using an API or the Web Speech API
    // Convert the recorded voice to text and insert it into the textarea
  };

  const handleDocumentClick = () => {
    // Implement document scanning functionality using an OCR API or OpenCV.js
    // Extract text from the scanned document and append it to the textarea
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
            value={content}
            onChange={handleContentChange}
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
          <IonButton fill="outline" id="voice" onClick={handleVoiceClick}>
            <IonIcon icon={mic} />
          </IonButton>
          <IonButton fill="outline" id="scan" onClick={handleDocumentClick}>
            <IonIcon icon={document} />
          </IonButton>
          <IonButton fill="outline" id="attachment" onClick={handleImageClick}>
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
