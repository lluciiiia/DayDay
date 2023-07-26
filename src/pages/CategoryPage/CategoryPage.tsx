import { useState, useRef, useEffect } from "react";
import { IonContent, IonSearchbar } from "@ionic/react";
import "../../main.css";
import CategoryModal from "./CategorySub.tsx/CategoryModal/CategoryModal";
import CategoryList from "./CategorySub.tsx/CategoryList/CategoryList";
import CategoryHeader from "./CategorySub.tsx/CategoryHeader";
import { Category } from "../../data/interfaces";
import { CategoryServiceImpl } from "../../data/DataService";
import { searchCategories } from "../../else/search";

const CategoryMain = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryRef = useRef<HTMLIonInputElement>(null);
  const page = useRef(undefined);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);
  const categoryService = new CategoryServiceImpl();

  useEffect(() => {
    const fetchCategories = async () => {
      setPresentingElement(page.current);
      const categories: Category[] = await categoryService.getAllCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  // search functionality
  const [results, setResults] = useState<Category[]>([]);
  const [inputValue, setInputValue] = useState(""); // New state variable

  const handleInput = (event: CustomEvent) => {
    const input = event.detail.value || "";
    setInputValue(input); // Store the input value

    if (input) {
      const searchResults = searchCategories(
        {
          data: Object.values(categories).map((category) => category.name),
          keys: Object.values(categories).map((category) => category.name),
        },
        input
      );
      const searchedResults: Category[] = Object.values(categories).filter(
        (category) => searchResults.includes(category.name)
      );

      setResults(searchedResults);
    } else {
      setResults([]); // Clear the search results when input is empty
    }
  };

  return (
    <IonContent scrollY={true}>
      <CategoryHeader
        editMode={editMode}
        setEditMode={setEditMode}
        setShowModal={setShowModal}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <IonSearchbar
          showClearButton="focus"
          onIonInput={handleInput}></IonSearchbar>
      </div>

      <CategoryList
        categories={inputValue === "" ? categories : results}
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
