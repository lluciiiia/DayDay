import React, { useState } from "react";
import { IonItem, IonList, IonIcon, IonLabel } from "@ionic/react";
import { closeCircleOutline, informationCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import CategoryAlert from "./CategoryAlert";

interface CategoryListProps {
  categories: string[];
  editMode: boolean;
  setSelectedCategory: (category: string) => void;
  setShowModal: (show: boolean) => void;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  editMode,
  setSelectedCategory,
  setShowModal,
  setCategories,
}) => {
  if (!Array.isArray(categories)) {
    console.error("categories is not an array!");
    return null; // Return null or some appropriate JSX if categories is not an array
  }
  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);

  const handleCategoryClick = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    history.push("/viewCategory", { selectedCategory });
  };

  return (
    <>
      <IonList>
        {categories.map((category, index) => (
          <IonItem key={index} style={{ padding: "7px", fontSize: "18px" }}>
            {editMode &&
              category !== "Default" &&
              category !== "Achievement" && (
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
            {editMode &&
              category !== "Default" &&
              category !== "Achievement" && (
                <IonIcon
                  icon={informationCircleOutline}
                  style={{ fontSize: "22px" }}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowModal(true);
                  }}
                />
              )}
          </IonItem>
        ))}
      </IonList>
      <CategoryAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        deletingCategory={deletingCategory}
        setDeletingCategory={setDeletingCategory}
        categories={categories}
        setCategories={setCategories}
      />
    </>
  );
};

export default CategoryList;
