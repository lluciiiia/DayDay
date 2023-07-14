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
  popover: React.MutableRefObject<HTMLIonPopoverElement | null>; // Add popover ref prop
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  editMode,
  openPopover,
  popover,
}) => {
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
        Category
      </p>

      {editMode && (
        <IonButtons>
          <IonButton
            style={{ marginTop: "27px", marginLeft: "190px" }}
            onClick={() => {}} // Update this with the appropriate function
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
        ref={popover} // Assign the popover ref
        trigger="popover-button"
        dismissOnSelect={true}>
        <IonList>
          <IonItem
            button={true}
            detail={false}
            onClick={openPopover}
            id="addCategory">
            Add Category
          </IonItem>
          <IonItem
            button={true}
            detail={false}
            onClick={openPopover}
            id="editCategory">
            Edit Category
          </IonItem>
        </IonList>
      </IonPopover>
    </div>
  );
};

export default CategoryHeader;
