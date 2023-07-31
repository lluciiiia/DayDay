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
import { Entry, Category } from "../../data/interfaces";
import { CategoryServiceImpl } from "../../data/DataService";
import ContentEditor from "./AddEditSub/ContentEditor";
import EditEntry from "./AddEditSub/EditEntry";
import CategorySelection from "./AddEditSub/CategorySelection";
import AddLocation from "./AddEditSub/AddLocation/AddLocation";

interface LocationState {
  entryData: Entry;
}

const EditPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const entryData = location.state?.entryData;

  const entryid = entryData?.id;
  const selectedDate = entryData?.date;

  const [title, setTitle] = useState(entryData?.title);
  const titleRef = useRef<HTMLIonInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    entryData?.category.name
  );
  const [selectedLocation, setSelectedLocation] = useState(
    entryData?.location?.placeId ?? ""
  );
  const [selectedLocationName, setSelectedLocationName] = useState(
    entryData?.location?.name ?? ""
  );
  const [content, setContent] = useState(entryData?.content[0]?.text ?? "");
  const { handleEdit } = EditEntry();

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
          <IonTitle>Edit your diary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <div style={{ margin: "5px" }}>
          <IonItem style={{ fontSize: "18px" }}>
            <IonInput
              placeholder="Enter the title"
              ref={titleRef}
              maxlength={20}
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
          </IonItem>
        </div>
        <CategorySelection
          selectedCategoryName={selectedCategory}
          categories={categories}
          onCategoryChange={(newCategory) => setSelectedCategory(newCategory)}
        />

        <AddLocation
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedLocationName={selectedLocationName}
          setSelectedLocationName={setSelectedLocationName}
        />

        <ContentEditor
          content={content}
          onContentChange={(newContent) => setContent(newContent)}
        />
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
              handleEdit(
                titleRef,
                content,
                selectedDate,
                selectedCategory,
                history,
                entryid, 
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

export default EditPage;
