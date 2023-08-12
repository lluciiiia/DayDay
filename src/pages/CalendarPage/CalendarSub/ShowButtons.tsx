import { IonButton } from "@ionic/react";

interface ShowbuttonsProps {
  selectedDate: string | null;
  checkDiaryExists: (date: string | null) => boolean;
  handleAddClick: () => void;
  handleViewClick: () => void;
}

const Showbuttons = ({
  selectedDate,
  checkDiaryExists,
  handleAddClick,
  handleViewClick,
}: ShowbuttonsProps) => {
  return (
    <>
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
    </>
  );
};

export default Showbuttons;
