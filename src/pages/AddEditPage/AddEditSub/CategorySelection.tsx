import React from "react";
import {
  IonList,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
} from "@ionic/react";
import { Category } from "../../../data/interfaces";

interface CategorySelectionProps {
  selectedCategoryName: string;
  categories: Category[];
  onCategoryChange: (value: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategoryName,
  categories,
  onCategoryChange,
}) => {
  const handleCategoryChange = (
    event: CustomEvent<SelectChangeEventDetail<any>>
  ) => {
    onCategoryChange(event.detail.value);
  };

  const categoryNames = Object.values(categories).map((value) => value.name);

  return (
    <div style={{ marginLeft: "18px", marginBottom: "5px" }}>
      <IonList>
        <IonSelect
          aria-label="category"
          placeholder="Select Category"
          value={selectedCategoryName}
          onIonChange={handleCategoryChange}>
          {categoryNames.map((name: string) => (
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
