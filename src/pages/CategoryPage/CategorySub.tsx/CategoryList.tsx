import React, { useState } from "react";
import { IonItem, IonList, IonIcon, IonLabel, IonAlert } from "@ionic/react";
import { closeCircleOutline, informationCircleOutline } from "ionicons/icons";
import { CategoriesData } from "../../../GetPutData";
import { useHistory } from "react-router-dom";
import { EntriesData } from "../../../GetPutData";

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
  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);

  const handleDeleteCategory = async (index: number) => {
    const categoryToDelete = categories[index];

    try {
      const entriesData = new EntriesData();
      const currentEntriesData = await entriesData.getEntriesData();

      const filteredEntries: Entry[] = currentEntriesData.filter(
        (entry: Entry) => entry.category === categoryToDelete
      );

      // delete every entry in the category
      filteredEntries.forEach((entry: Entry) => {
        entriesData.deleteEntriesData(entry);
      });
    } catch (error) {
      console.error("Error fetching entries data:", error);
    }

    // Delete the category & update the UI
    // TODO: improve the algorithm instead of filtering
    const updatedData = categories.filter((_, i) => i !== index);
    const categoriesData = new CategoriesData();
    categoriesData.putCategoriesData(updatedData);
    setCategories(updatedData);
  };

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
      <IonAlert
        isOpen={showAlert}
        header="Every diary will be permanently removed"
        buttons={[
          {
            text: "Cancel",
            handler: () => {
              setShowAlert(false);
              setDeletingCategory(null);
            },
          },
          {
            text: "Confirm",
            handler: () => {
              if (deletingCategory) {
                const indexToDelete = categories.indexOf(deletingCategory);
                handleDeleteCategory(indexToDelete);
              }
              setShowAlert(false);
              setDeletingCategory(null);
            },
          },
        ]}
      />
    </>
  );
};

export default CategoryList;
