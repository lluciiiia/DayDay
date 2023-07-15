import React from "react";
import { IonItem, IonList, IonIcon, IonLabel } from "@ionic/react";
import { closeCircleOutline, informationCircleOutline } from "ionicons/icons";
import { CategoriesData } from "../../../GetPutData";
import { useHistory } from "react-router-dom";

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
  const history = useHistory(); // Use the useHistory hook

  const handleDeleteCategory = (index: number) => {
    const updatedData = categories.filter((_, i) => i !== index);
    const categoriesData = new CategoriesData();
    categoriesData.putCategoriesData(updatedData);
    setCategories(updatedData);
  };

  const handleCategoryClick = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    history.push("/viewCategory", {selectedCategory}); // Navigate to "/viewCategory" route
  };

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
        </IonItem>
      ))}
    </IonList>
  );
};

export default CategoryList;
