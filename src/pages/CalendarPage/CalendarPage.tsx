import { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonDatetime,
} from "@ionic/react";
import { useHistory } from "react-router";
import { EntriesData } from "../../GetPutData";
import Showbuttons from "./CalendarSub/ShowButtons";
import { checkDiaryExists } from "./CalendarSub/checkDiaryExists";

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

  const handleDateChange = (event: CustomEvent<any>) => {
    const date = event.detail.value.split("T")[0];
    console.log("Selected Date:", date);
    setSelectedDate(date);
    setShowButtons(true);
  };

  const checkDiaryEntryExists = () => {
    return checkDiaryExists(selectedDate, diaryDates);
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
              <Showbuttons
                selectedDate={selectedDate}
                checkDiaryExists={checkDiaryEntryExists}
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
