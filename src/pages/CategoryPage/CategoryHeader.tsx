import React from "react";
import {
  IonPopover,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";

interface CategoryHeaderProps {
  editMode: boolean;
  openPopover: (e: any) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>; // Add setEditMode prop
  popover: React.MutableRefObject<HTMLIonPopoverElement | null>;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  editMode,
  openPopover,
  setEditMode,
  popover,
}) => {
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
        }}
      >
        Category
      </p>

      {editMode && (
        <IonButtons>
          <IonButton
            style={{ marginTop: "27px", marginLeft: "190px" }}
            onClick={handleDoneClick} // Call handleDoneClick
          >
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
      >
        <IonList>
          <IonItem button={true} detail={false} onClick={openPopover} id="addCategory">
            Add Category
          </IonItem>
          <IonItem button={true} detail={false} onClick={openPopover} id="editCategory">
            Edit Category
          </IonItem>
        </IonList>
      </IonPopover>
    </div>
  );
};

export default CategoryHeader;
