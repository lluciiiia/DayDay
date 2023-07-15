import { IonDatetime } from "@ionic/react";

interface CalendarViewProps {
  diaryDates: string[];
  onDateChange: (date: string) => void;
  setShowButtons: (show: boolean) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  diaryDates,
  onDateChange,
  setShowButtons,
}) => {
  const handleDateChange = (event: CustomEvent<any>) => {
    const date = event.detail.value.split("T")[0];
    onDateChange(date);
    setShowButtons(true);
  };

  return (
    <div
      style={{
        alignSelf: "center",
        paddingTop: 30,
      }}
    >
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
