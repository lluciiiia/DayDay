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
import { CategoriesData } from "../../GetPutData";
import ContentEditor from "./AddEditSub/ContentEditor";
import EditEntry from "./AddEditSub/EditEntry";
import CategorySelection from "./AddEditSub/CategorySelection";

interface LocationState {
  selectedDate: string;
  entryData?: Entry;
}

const EditPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const selectedDate = location.state?.selectedDate;
  const titleRef = useRef<HTMLIonInputElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const { handleEdit } = EditEntry();
  const entryData = location.state?.entryData;
  // Initialize it with the entry's category
  const [selectedCategory, setSelectedCategory] = useState(
    entryData?.category ?? ""
  );
  // Initialize it with the first content's text from the entry
  const [content, setContent] = useState(entryData?.content[0]?.text ?? "");

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = new CategoriesData();
      const categories = await categoriesData.getCategoriesData();
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
              value={entryData?.title}></IonInput>
          </IonItem>
        </div>
        <CategorySelection
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={(newCategory) => setSelectedCategory(newCategory)}
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
                history
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
