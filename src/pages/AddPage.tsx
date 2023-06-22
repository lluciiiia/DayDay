import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from "@ionic/react";

const AddPage = () => {
  const handleSave = () => {
    // Add your logic to save the diary entry
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Diary Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Add your content here */}
        <IonButton expand="block" onClick={handleSave}>
          Save
        </IonButton>
      </IonContent>
    </>
  );
};

export default AddPage;
