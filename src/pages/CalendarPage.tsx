import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonDatetime,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router";
import axios from "axios";

interface Entry {
  content: any;
  date: string;
  title: string;
  category: string;
}

const CalendarPage = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [diaryDates, setDiaryDates] = useState<string[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3004/api/entries");
      const entries = response.data;
      console.log(entries);

      const dates = entries.map((entry: Entry) => entry.date);
      setDiaryDates(dates);

    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClick = () => {
    history.push("/add", { selectedDate });
  };

  const handleViewClick = () => {
    history.push("/view", { selectedDate });
  };

  const handleDateChange = (event: CustomEvent<any>) => {
    const date = event.detail.value.split("T")[0];
    console.log("Selected Date:", date);
    setSelectedDate(date);
    setShowButtons(true);
  };

  const checkDiaryExists = (date: string | null) => {
    if (date) {
      return diaryDates.includes(date);
    }
    return false;
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Write your diary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 60,
            alignItems: "center",
          }}>
          <div
            style={{
              alignSelf: "center",
              paddingTop: 30,
            }}>
            <IonDatetime
              onIonChange={handleDateChange}
              presentation="date"
              highlightedDates={diaryDates.map((date) => ({
                date,
                textColor: "rgb(68, 10, 184)",
                backgroundColor: "rgb(211, 200, 229)",
              }))}></IonDatetime>
          </div>

          {showButtons && (
            <div
              style={{
                marginBottom: "5px",
                width: "100%",
                maxWidth: "370px",
              }}>
              {checkDiaryExists(selectedDate) ? (
                <div style={{ marginTop: "10px" }}>
                  <IonButton expand="block" onClick={handleAddClick}>
                    Add
                  </IonButton>
                  <IonButton expand="block" onClick={handleViewClick}>
                    View
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

export default CalendarPage;
