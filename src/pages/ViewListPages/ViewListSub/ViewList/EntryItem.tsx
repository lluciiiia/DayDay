import React from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";

interface EntryItemProps {
  entry: Entry;
  selectionType: "category" | "date";
  editMode: boolean;
  onSelect: (entry: Entry) => void;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingEntry: React.Dispatch<React.SetStateAction<Entry | null>>;
}

export const EntryItem: React.FC<EntryItemProps> = ({
  entry,
  selectionType,
  editMode,
  onSelect,
  showAlert,
  setShowAlert,
  setDeletingEntry
}) => {

  const handleEntryClick = () => {
    onSelect(entry);
  };

  return (
    <IonItem key={entry.id} style={{ padding: "7px", fontSize: "18px" }}>
      {editMode && (
        <>
          <IonIcon
            icon={closeCircleOutline}
            style={{ fontSize: "22px", marginRight: "10px" }}
            onClick={() => {
              if (!showAlert) {
                setShowAlert(true);
                setDeletingEntry(entry);
              }
            }}
          />
        </>
      )}
      <IonLabel onClick={() => handleEntryClick()}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                position: "relative",
                fontSize: "21px",
                fontWeight: "bold",
                flexGrow: 1,
              }}>
              {entry.title}
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                fontSize: "14px",
                color: "rgb(165, 165, 165)",
                marginTop: "28px",
                marginRight: "10px",
              }}>
              {selectionType === "category" ? entry.date : entry.category}
            </div>
          </div>

          <div
            style={{
              fontSize: "16px",
              marginTop: "5px",
              marginBottom: "15px",
            }}>
            {entry.content && entry.content[0] && entry.content[0].text
              ? entry.content[0].text.length > 30
                ? `${entry.content[0].text.substring(0, 88)}...`
                : entry.content[0].text
              : ""}
          </div>
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default EntryItem;
