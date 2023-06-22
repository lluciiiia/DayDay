import React, { useState } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonDatetime, IonButton } from "@ionic/react";
import { useHistory } from "react-router";

const HomePage = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Track the selected date
  const [showButtons, setShowButtons] = useState(false); // Track whether to show the buttons

  const handleAddClick = () => {
    if (!selectedDate) return; // If no date selected, do nothing

    // Check if diary exists for selected date
    const diaryExists = checkDiaryExists(); // Remove the argument

    if (!diaryExists) {
      history.push("/add"); // Navigate to AddPage if no diary exists
    }
  };

  const handleEditClick = () => {
    if (!selectedDate) return; // If no date selected, do nothing

    // Check if diary exists for selected date
    const diaryExists = checkDiaryExists(); // Remove the argument

    if (diaryExists) {
      history.push("/edit"); // Navigate to EditPage if diary exists
    }
  };

  const handleDateChange = (event: CustomEvent<any>) => {
    setSelectedDate(event.detail.value);
    setShowButtons(true); // Show the buttons when a date is selected
  };

  const checkDiaryExists = () => {
    // Replace this with your actual logic to check if a diary exists for the given date
    // Return true if diary exists, false otherwise
    return false;
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Write your diary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 60,
            alignItems: "center",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              paddingTop: 30,
            }}
          >
            <IonDatetime onIonChange={handleDateChange}></IonDatetime>
          </div>

          {showButtons && (
            <div
              style={{
                marginBottom: "5px",
                width: "100%",
                maxWidth: "370px",
              }}
            >
              {checkDiaryExists() ? (
                <div style={{ marginTop: "10px" }}>
                  <IonButton expand="block" onClick={handleEditClick}>
                    Edit
                  </IonButton>
                </div>
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <IonButton expand="block" onClick={handleAddClick}>
                    Add
                  </IonButton>
                </div>
              )}
            </div>
          )}
        </div>
      </IonContent>
    </>
  );
};

export default HomePage;
