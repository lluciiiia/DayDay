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
    const selectedName = event.detail.value;
    console.log(selectedName);
    // Find the corresponding Category object based on the selected name
    const selectedCategory = Object.values(categories).find(
      (category) => category.name === selectedName
    );

    if (selectedCategory) {
      onCategoryChange(selectedCategory);
    }
  };

  const categoryNames = Object.values(categories).map((value) => value.name);

  return (
    <div style={{ marginLeft: "18px", marginBottom: "5px" }}>
      <IonList>
        <IonSelect
          aria-label="category"
          placeholder="Select Category"
          value={selectedCategory}
          onIonChange={handleCategoryChange}>
          {categoryNames.map((name) => (
            <IonSelectOption value={name} key={name}>
              {name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonList>
    </div>
  );
};

export default CategorySelection;
