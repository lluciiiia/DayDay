import { useState, useEffect } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router";
import CalendarView from "./CalendarSub/CalendarView";
import ShowButtons from "./CalendarSub/ShowButtons";
import { Entry } from "../../data/interfaces";
import { EntryServiceImpl } from "../../data/DataService";

const DiaryPage = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState<Entry[]>([]);

  const entryService = new EntryServiceImpl();

  useEffect(() => {
    async function fetchAllEntries() {
      try {
        const entries: Entry[] = await entryService.getAllEntries();

        setDiaryEntries(entries);
      } catch (error) {
        console.error("Error fetching all entries:", error);
      }
    }
    fetchAllEntries();
  }, []);

  const handleAddClick = () => {
    history.push("/add", { selectedDate });
  };

  const handleViewClick = () => {
    history.push("/viewDate", { selectedDate });
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
          }}>
          <CalendarView
            diaryDates={diaryEntries.map((entry) => entry.date)}
            onDateChange={setSelectedDate}
            setShowButtons={setShowButtons}
          />

          {showButtons && (
            <div
              style={{
                marginBottom: "5px",
                width: "100%",
                maxWidth: "370px",
              }}>
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
