import React from "react";
import { IonButton, IonButtons } from "@ionic/react";

interface ViewCategoryHeaderProps {
  selectedCategory: string;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

const ViewCategoryHeader: React.FC<ViewCategoryHeaderProps> = ({
  selectedCategory,
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
        {selectedCategory}
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

export default ViewCategoryHeader;
