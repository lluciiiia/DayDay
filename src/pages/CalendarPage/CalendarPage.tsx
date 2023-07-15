import { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import CalendarView from "./CalendarSub/CalendarView";
import ShowButtons from "./CalendarSub/ShowButtons";
import { fetchDatesData } from "./CalendarSub/fetchDatesData";
import { Entry } from "./CalendarSub/IEntry";

const DiaryPage = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetchDatesData()
    .then((entries: any) => {
        setDiaryEntries(entries);
    })
    .catch((error: any) => {
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
      return diaryEntries.some((entry) => entry.date === date);
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
          }}
        >
          <CalendarView
            diaryDates={diaryEntries.map((entry) => entry.date)}
            onDateChange={handleDateChange}
          />

          {showButtons && (
            <div
              style={{
                marginBottom: "5px",
                width: "100%",
                maxWidth: "370px",
              }}
            >
              <ShowButtons
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

export default DiaryPage;
