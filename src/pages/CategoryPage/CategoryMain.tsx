import { useState, useRef, useEffect } from "react";
import { IonContent, useIonToast, IonSearchbar } from "@ionic/react";
import "../../main.css";
import { CategoriesData } from "../../GetPutData";
import CategoryModal from "./CategorySub.tsx/CategoryModal";
import CategoryList from "./CategorySub.tsx/CategoryList";
import CategoryHeader from "./CategorySub.tsx/CategoryHeader";

const CategoryMain = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const categoryRef = useRef<HTMLIonInputElement>(null);
  const [present] = useIonToast();
  const page = useRef(undefined);

  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
    // get data from backend
    const categoriesData = new CategoriesData();
    categoriesData
      .getCategoriesData()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleDoneClick = () => {
    const newCategory = categoryRef.current?.value as string;
    if (newCategory) {
      let updatedData;
      // Rename the existing category
      if (selectedCategory) {
        const categoryIndex = categories.findIndex(
          (category) => category === selectedCategory
        );
        updatedData = [...categories];
        updatedData[categoryIndex] = newCategory;
      } // Add a new category
      else {
        updatedData = [...categories, newCategory];
      }
      const categoriesData = new CategoriesData();
      categoriesData.putCategoriesData(updatedData);
      setCategories(updatedData);
      setShowModal(false);
    } else {
      presentToast("Enter new category");
    }
  };

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 100,
      position: "middle",
    });
  };

  const handleDeleteCategory = (index: number) => {
    const updatedData = categories.filter((_, i) => i !== index);
    const categoriesData = new CategoriesData();
    categoriesData.putCategoriesData(updatedData);
    setCategories(updatedData);
  };

  return (
    <IonContent scrollY={true}>
      <CategoryHeader
        editMode={editMode}
        setEditMode={setEditMode}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryRef={categoryRef}
        handleDoneClick={handleDoneClick}
        categories={categories}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <IonSearchbar showClearButton="focus" />
      </div>

      <CategoryList
        categories={categories}
        editMode={editMode}
        handleDeleteCategory={handleDeleteCategory}
        setSelectedCategory={setSelectedCategory}
        setShowModal={setShowModal}
      />

      {showModal && (
        <CategoryModal
          showModal={showModal}
          setShowModal={setShowModal}
          presentingElement={presentingElement}
          selectedCategory={selectedCategory}
          categoryRef={categoryRef}
          handleDoneClick={handleDoneClick}
        />
      )}
    </IonContent>
  );
};

export default CategoryMain;
