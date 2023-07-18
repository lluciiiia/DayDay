import React from "react";
import { IonIcon, IonLabel } from "@ionic/react";
import { informationCircleOutline, closeCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface EachCategoryProps {
  category: string;
  editMode: boolean;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedCategory: (category: string) => void;
  setShowModal: (show: boolean) => void;
}

export const EachCategory: React.FC<EachCategoryProps> = ({
  category,
  editMode,
  showAlert,
  setShowAlert,
  setDeletingCategory,
  setSelectedCategory,
  setShowModal,
}) => {
  const history = useHistory();

  const handleCategoryClick = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    history.push("/viewCategory", { selectedCategory });
  };

  return (
    <>
      {editMode && category !== "Default" && category !== "Achievement" && (
        <IonIcon
          icon={closeCircleOutline}
          style={{
            fontSize: "22px",
            marginRight: "10px",
          }}
          onClick={() => {
            if (!showAlert) {
              setShowAlert(true);
              setDeletingCategory(category);
            }
          }}
        />
      )}
      <IonLabel onClick={() => handleCategoryClick(category)}>
        {category}
      </IonLabel>
      {editMode && category !== "Default" && category !== "Achievement" && (
        <IonIcon
          icon={informationCircleOutline}
          style={{ fontSize: "22px" }}
          onClick={() => {
            setSelectedCategory(category);
            setShowModal(true);
          }}
        />
      )}
    </>
  );
};

export default EachCategory;
