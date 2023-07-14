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
        categories={categories}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <IonSearchbar showClearButton="focus" />
      </div>

      <CategoryList
        categories={categories}
        editMode={editMode}
        setCategories={setCategories}
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
          setCategories={setCategories}
          categories={categories}
        />
      )}
    </IonContent>
  );
};

export default CategoryMain;
