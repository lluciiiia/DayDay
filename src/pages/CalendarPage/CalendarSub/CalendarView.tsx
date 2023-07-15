import { useState } from "react";
import { IonDatetime } from "@ionic/react";

interface CalendarViewProps {
  onDateChange: (date: string | null) => void;
  diaryDates: string[];
}

const CalendarView = ({ onDateChange, diaryDates }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const handleDateChange = (event: CustomEvent<any>) => {
    const date = event.detail.value.split("T")[0];
    console.log("Selected Date:", date);
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div style={{ alignSelf: "center", paddingTop: 30 }}>
      <IonDatetime
        onIonChange={handleDateChange}
        presentation="date"
        highlightedDates={diaryDates.map((date) => ({
          date,
          textColor: "rgb(68, 10, 184)",
          backgroundColor: "rgb(211, 200, 229)",
        }))}
      ></IonDatetime>
    </div>
  );
};

export default CalendarView;
