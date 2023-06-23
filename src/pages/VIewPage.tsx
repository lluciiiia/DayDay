import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from "@ionic/react";

const ViewPage = () => {
  const handleUpdate = () => {
    // Add your logic to update the diary entry
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>View Diary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* document.getElementById("demo").innerHTML = localStorage.getItem("lastname"); */}
        {/* Add your content here */}
        <IonButton expand="block" onClick={handleUpdate}>
          Update
        </IonButton>
      </IonContent>
    </>
  );
};

export default ViewPage;
