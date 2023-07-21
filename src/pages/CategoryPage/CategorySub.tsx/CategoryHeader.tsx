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
import { Category } from "../../../data/interfaces";

interface CategoryHeaderProps {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category|undefined>>;
  categories: Category[]; // Add categories prop
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  editMode,
  setEditMode,
  setShowModal,
  setSelectedCategory,
  categories,
}) => {
  const popover = useRef<HTMLIonPopoverElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    const itemId = e.currentTarget.id;
    if (itemId === "addCategory") {
      setSelectedCategory(undefined); // Clear the selected category
      setShowModal(true);
    } else if (itemId === "editCategory") {
      setSelectedCategory(categories[0]); // Set the selected category to the first category in the list
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
        isOpen={popoverOpen}
        onDidDismiss={() => setPopoverOpen(false)}>
        <IonList>
          <IonItem
            button={true}
            detail={false}
            onClick={handleItemClicked}
            id="addCategory">
            Add Category
          </IonItem>
          <IonItem
            button={true}
            detail={false}
            onClick={handleItemClicked}
            id="editCategory">
            Edit Category
          </IonItem>
        </IonList>
      </IonPopover>
    </div>
  );
};

export default CategoryHeader;
