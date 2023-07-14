import React from "react";
import {
  IonList,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
} from "@ionic/react";

interface CategorySelectionProps {
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (value: string) => void;
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
          {categories.map((category: string) => (
            <IonSelectOption value={category} key={category}>
              {category}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonList>
    </div>
  );
};

export default CategorySelection;
