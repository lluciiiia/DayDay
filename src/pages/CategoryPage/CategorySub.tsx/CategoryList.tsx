import React from "react";
import { IonItem, IonList, IonIcon, IonLabel } from "@ionic/react";
import { closeCircleOutline, informationCircleOutline } from "ionicons/icons";

interface CategoryListProps {
  categories: string[];
  editMode: boolean;
  handleDeleteCategory: (index: number) => void;
  setSelectedCategory: (category: string) => void;
  setShowModal: (show: boolean) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  editMode,
  handleDeleteCategory,
  setSelectedCategory,
  setShowModal,
}) => {
  return (
    <IonList>
      {categories.map((category, index) => (
        <IonItem key={index} style={{ padding: "7px", fontSize: "18px" }}>
          {editMode && category !== "Default" && category !== "Achievement" && (
            <IonIcon
              icon={closeCircleOutline}
              style={{
                fontSize: "22px",
                marginRight: "10px",
              }}
              onClick={() => handleDeleteCategory(index)}
            />
          )}
          <IonLabel>{category}</IonLabel>
          {editMode && category !== "Default" && category !== "Achievement" && (
            <IonIcon
              icon={informationCircleOutline}
              style={{ fontSize: "22px" }}
              onClick={() => {
                setSelectedCategory(category); // Set the selected category
                setShowModal(true);
              }}
            />
          )}
        </IonItem>
      ))}
    </IonList>
  );
};

export default CategoryList;
