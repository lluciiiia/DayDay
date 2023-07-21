import React from "react";
import {
  IonList,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
} from "@ionic/react";
import { Category } from "../../../data/interfaces";

interface CategorySelectionProps {
  selectedCategory: Category | undefined;
  categories: Category[];
  onCategoryChange: (value: Category) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategory,
  categories,
  onCategoryChange,
}) => {
  const handleCategoryChange = (
    event: CustomEvent<SelectChangeEventDetail<any>>
  ) => {
    onCategoryChange(event.detail.value);
  };

  return (
    <div style={{ marginLeft: "18px", marginBottom: "5px" }}>
      <IonList>
        <IonSelect
          aria-label="category"
          placeholder="Select Category"
          value={selectedCategory}
          onIonChange={handleCategoryChange}>
          {categories.map((category: Category) => (
            <IonSelectOption value={category.name} key={category.name}>
              {category.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonList>
    </div>
  );
};

export default CategorySelection;
