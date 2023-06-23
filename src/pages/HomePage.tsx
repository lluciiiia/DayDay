import React, { useState } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonDatetime, IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import AddPage from "./AddPage";
import ViewPage from "./ViewPage";

const HomePage = () => {
  const history = useHistory(); // To check if there's a diary on the date
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Track the selected date
  const [showButtons, setShowButtons] = useState(false); // Track whether to show the buttons

  const handleAddClick = () => {
    history.push("/add");
  };

  const handleViewClick = () => {
    history.push("/view");
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
            {/* date clicked -> show buttons (depending on checkDiaryExists) */}

            <IonDatetime onIonChange={handleDateChange}></IonDatetime>
          {/* The onchange event occurs when the value of an HTML element is changed.
            -> call the function */}
          </div>

          {showButtons && ( // showButtons True (handleDateChange)
            <div
              style={{
                marginBottom: "5px",
                width: "100%",
                maxWidth: "370px",
              }}
            >
              {checkDiaryExists() ? (
                <div style={{ marginTop: "10px" }}> {/*if checkDiaryExists True*/}
                  <IonButton expand="block" onClick={handleViewClick}>
                    View 
                  </IonButton>
                </div>
              ) : (
                <div style={{ marginTop: "10px" }}> {/*if checkDiaryExists False*/}
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
