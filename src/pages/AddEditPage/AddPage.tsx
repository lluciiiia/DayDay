import { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { CategoryServiceImpl } from "../../data/DataService";
import ContentEditor from "./AddEditSub/ContentEditor";
import { SaveEntry } from "./AddEditSub/SaveEntry/SaveEntry";
import CategorySelection from "./AddEditSub/CategorySelection";
import { Category } from "../../data/interfaces";
import AddLocation from "./AddEditSub/AddLocation/AddLocation";

interface LocationState {
  selectedDate: string;
}

const AddPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [content, setContent] = useState("");
  const selectedDate = location.state?.selectedDate;
  const titleRef = useRef<HTMLIonInputElement>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const { handleSave } = SaveEntry();

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = new CategoryServiceImpl();
      const categories = await categoriesData.getAllCategories();
      setCategories(categories);
    };

    fetchData();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Write your day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <div style={{ margin: "5px" }}>
          <IonItem style={{ fontSize: "18px" }}>
            <IonInput
              placeholder="Enter the title"
              ref={titleRef}
              maxlength={18}></IonInput>
          </IonItem>
        </div>
        <CategorySelection
          selectedCategoryName={selectedCategoryName}
          categories={categories}
          onCategoryChange={setSelectedCategoryName}
        />

        <AddLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedLocationName={selectedLocationName}
          setSelectedLocationName={setSelectedLocationName}
        />

        <ContentEditor content={content} onContentChange={setContent} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: 10,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.5rem",
          }}>
          <IonButton
            fill="outline"
            id="save"
            style={{ width: "160px" }}
            onClick={() =>
              handleSave(
                titleRef,
                content,
                selectedDate,
                selectedCategoryName,
                history,
                categories,
                selectedLocation,
                selectedLocationName
              )
            }>
            Save
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default AddPage;
