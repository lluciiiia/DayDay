import React, { useState } from "react";
import { IonItem, IonList } from "@ionic/react";
import CategoryAlert from "./CategoryAlert";
import EachCategory from "./EachCategory";
import { Category } from "../../../../data/interfaces";

interface CategoryListProps {
  categories: Category[];
  editMode: boolean;
  setSelectedCategory: (category: Category) => void;
  setShowModal: (show: boolean) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  editMode,
  setSelectedCategory,
  setShowModal,
  setCategories,
}) => {

  const [showAlert, setShowAlert] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  return (
    <>
      <IonList>
        {categories.map((category, index) => (
          <IonItem key={index} style={{ padding: "7px", fontSize: "18px" }}>
            <EachCategory
              category={category}
              editMode={editMode}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              setDeletingCategory={setDeletingCategory}
              setSelectedCategory={setSelectedCategory}
              setShowModal={setShowModal}
            />
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
