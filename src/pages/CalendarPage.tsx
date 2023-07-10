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
import connection from "../data/db"; // Import the MySQL connection
import { RowDataPacket } from "mysql2/promise";

const CalendarPage = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [diaryDates, setDiaryDates] = useState<string[]>([]);

  useEffect(() => {
    fetchDiaryDatesFromDatabase();
  }, []);

  const fetchDiaryDatesFromDatabase = async () => {
    try {
      const [result] = await connection.promise().execute(
        "SELECT DISTINCT date FROM diary_entries"
      );
  
      if (Array.isArray(result)) {
        const rows = result as RowDataPacket[];
        const dates = rows.map((row) => row.date);
        setDiaryDates(dates);
      } else {
        console.error("Invalid result format:", result);
      }
    } catch (error) {
      console.error("Error fetching diary dates:", error);
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
      return new Promise<boolean>((resolve) => {
        connection.query(
          "SELECT COUNT(*) as count FROM diary_entries WHERE date = ?",
          [date],
          (error: any, rows: any) => {
            const count = rows[0].count;
            resolve(!error && count > 0);
          }
        );
      });
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
