import { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { EntriesData } from "../../GetPutData";
import Showbuttons from "./CalendarSub/ShowButtons";
import CalendarView from "./CalendarSub/CalendarView";

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
    const entriesData = new EntriesData();
    const entriesResultPromise = entriesData.getEntriesData();

    entriesResultPromise
      .then((entriesResult) => {
        if (Array.isArray(entriesResult)) {
          const dates = entriesResult.map((entry: Entry) => entry.date);
          setDiaryDates(dates);
        } else {
          console.error("The returned value is not an array.");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch entries data: ", error);
      });
  }, []);

  const handleAddClick = () => {
    history.push("/add", { selectedDate });
  };

  const handleViewClick = () => {
    history.push("/viewDate", { selectedDate });
  };

  const handleDateChange = (date: string) => {
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
          <IonTitle>Write your day</IonTitle>
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
          <CalendarView
            diaryDates={diaryDates}
            onDateChange={handleDateChange}
          />

          {showButtons && (
            <div
              style={{
                marginBottom: "5px",
                width: "100%",
                maxWidth: "370px",
              }}>
              <Showbuttons
                selectedDate={selectedDate}
                checkDiaryExists={checkDiaryExists}
                handleAddClick={handleAddClick}
                handleViewClick={handleViewClick}
              />
            </div>
          )}
        </div>
      </IonContent>
    </>
  );
};

export default CalendarPage;
