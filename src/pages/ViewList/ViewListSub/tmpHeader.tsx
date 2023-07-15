import React, { useRef, useState } from "react";
import {
  IonPopover,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface HeaderButtonsProps {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEntry: Entry[];
  setSelectedEntry: React.Dispatch<React.SetStateAction<string>>;
  categoryRef: React.RefObject<HTMLIonInputElement>;
  entries: Entry[]; // Add Entries prop
  selectedCategory: string;
  selectedDate: string;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = ({
  editMode,
  setEditMode,
  selectedEntry,
  setSelectedEntry,
  categoryRef,
  entries,
  selectedCategory,
  selectedDate,
}) => {
  const popover = useRef<HTMLIonPopoverElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const history = useHistory(); // Use the useHistory hook

  const openPopover = (e: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    const itemId = e.currentTarget.id;
    if (itemId === "addEntry") {
      setSelectedEntry("");
      // TODO: push to add
      history.push("/add");
      //setShowModal(true);
    } else if (itemId === "editEntry") {
      setSelectedEntry(entries[0]); // Set the selected Entry to the first entry in the list
      setEditMode(!editMode); // Toggle the edit mode
    }
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  const handleItemClicked = (
    e: React.MouseEvent<HTMLIonItemElement, MouseEvent>
  ) => {
    openPopover(
      e as unknown as React.MouseEvent<HTMLIonIconElement, MouseEvent>
    );
  };

  const handleDoneClick = () => {
    setEditMode(false); // Set editMode to false
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p
        style={{
          fontSize: "28px",
          marginLeft: "15px",
          fontWeight: "bold",
          marginTop: "35px",
          marginBottom: "10px",
        }}>
        {selectedCategory ? selectedCategory : selectedDate}
      </p>

      {editMode && (
        <IonButtons>
          <IonButton
            style={{ marginTop: "27px", marginLeft: "190px" }}
            onClick={handleDoneClick}>
            Done
          </IonButton>
        </IonButtons>
      )}
      <IonIcon
        id="popover-button"
        icon={settingsOutline}
        onClick={openPopover}
        style={{
          display: editMode ? "none" : "block",
          marginTop: "38px",
          fontSize: "28px",
          marginLeft: "210px",
        }}
      />

      <IonPopover
        ref={popover}
        trigger="popover-button"
        dismissOnSelect={true}
        isOpen={popoverOpen}
        onDidDismiss={() => setPopoverOpen(false)}>
        <IonList>
          <IonItem
            button={true}
            detail={false}
            onClick={handleItemClicked}
            id="addEntry">
            Add Diary
          </IonItem>
          <IonItem
            button={true}
            detail={false}
            onClick={handleItemClicked}
            id="editEntry">
            Edit Diary
          </IonItem>
        </IonList>
      </IonPopover>
    </div>
  );
};

export default HeaderButtons;
