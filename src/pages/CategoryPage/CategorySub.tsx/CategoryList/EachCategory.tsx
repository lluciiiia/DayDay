import React from "react";
import { IonIcon, IonLabel } from "@ionic/react";
import { informationCircleOutline, closeCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { Category } from "../../../../data/interfaces";

interface EachCategoryProps {
  category: Category;
  editMode: boolean;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  setSelectedCategory: (category: Category) => void;
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

  const handleCategoryClick = (selectedCategory: Category) => {
    setSelectedCategory(selectedCategory);
    history.push("/viewCategory", { selectedCategory });
  };

  return (
    <>
      {editMode && category.name !== "Default" && category.name !== "Achievement" && (
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
        {category.name}
      </IonLabel>
      {editMode && category.name !== "Default" && category.name !== "Achievement" && (
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
