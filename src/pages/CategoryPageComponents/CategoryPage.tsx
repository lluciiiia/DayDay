import { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonPopover,
  useIonToast,
  IonButtons,
  IonButton,
  IonSearchbar,
  IonList,
  IonItem,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import "../../main.css";
import { CategoriesData } from "../../GetPutData";
import CategoryModal from "./CategoryModal";
import CategoryList from "./CategoryList";

const CategoryPage = () => {
  const popover = useRef<HTMLIonPopoverElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [present] = useIonToast();
  const page = useRef(undefined);

  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const categoryRef = useRef<HTMLIonInputElement>(null);

  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const openPopover = (e: any) => {
    const itemId = e.target.id;
    if (itemId === "addCategory") {
      setSelectedCategory(""); // Clear the selected category
      setShowModal(true);
    } else if (itemId === "editCategory") {
      setSelectedCategory(categories[0]); // Set the selected category to the first category in the list
      setEditMode(!editMode); // Toggle the edit mode
    }
    popover.current!.event = e;
    setPopoverOpen(true);
  };

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
      if (selectedCategory) {
        // Modify the existing category
        const categoryIndex = categories.findIndex(
          (category) => category === selectedCategory
        );
        updatedData = [...categories];
        updatedData[categoryIndex] = newCategory;
      } else {
        // Add a new category
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p
          style={{
            fontSize: "28px",
            marginLeft: "15px",
            fontWeight: "bold",
            marginTop: "35px",
            marginBottom: "10px",
          }}>
          Category
        </p>

        {editMode && (
          <IonButtons>
            <IonButton
              style={{ marginTop: "27px", marginLeft: "190px" }}
              onClick={() => setEditMode(false)}>
              Done
            </IonButton>
          </IonButtons>
        )}
        <IonIcon
          id="popover-button"
          icon={settingsOutline}
          onClick={openPopover}
          style={{
            display: editMode ? "none" : "block",
            marginTop: "38px",
            fontSize: "28px",
            marginLeft: "210px",
          }}
        />

        <IonPopover
          ref={(ref) => {
            popover.current = ref;
          }}
          trigger="popover-button"
          dismissOnSelect={true}>
          <IonContent scrollY={false}>
            <IonList>
              <IonItem
                button={true}
                detail={false}
                onClick={openPopover}
                id="addCategory">
                Add Category
              </IonItem>
              <IonItem
                button={true}
                detail={false}
                onClick={openPopover}
                id="editCategory">
                Edit Category
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <IonSearchbar showClearButton="focus" />
      </div>

      <IonContent scrollY={true}>
        <CategoryList
          categories={categories}
          editMode={editMode}
          handleDeleteCategory={handleDeleteCategory}
          setSelectedCategory={setSelectedCategory}
          setShowModal={setShowModal}
        />
      </IonContent>

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

export default CategoryPage;
