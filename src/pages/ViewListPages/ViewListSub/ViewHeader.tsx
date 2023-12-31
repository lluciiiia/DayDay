import React from "react";
import { IonButton, IonButtons } from "@ionic/react";
import { Category } from "../../../data/interfaces";

interface ViewHeaderProps {
  selectionType: "category" | "date"; // New prop to indicate selection type
  selectedCategory?: Category;
  selectedDate?: string;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({
  selectionType,
  selectedCategory,
  selectedDate,
  editMode,
  setEditMode,
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
        {selectionType === "category" ? selectedCategory?.name : selectedDate}
      </p>

      <div style={{ position: "fixed", marginTop: "35px" }}>
        {editMode && (
          <IonButtons>
            <IonButton
              style={{ marginLeft: "330px" }}
              onClick={() => setEditMode(false)}>
              Done
            </IonButton>
          </IonButtons>
        )}
        <IonButtons>
          <IonButton
            style={{
              display: editMode ? "none" : "block",
              marginLeft: "335px",
            }}
            onClick={() => setEditMode(true)}>
            Edit
          </IonButton>
        </IonButtons>
      </div>
    </div>
  );
};

export default ViewHeader;
