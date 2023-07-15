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
import ContentEditor from "./AddSub/ContentEditor";
import EditEntry from "./AddSub/EditEntry";
import CategorySelection from "./AddSub/CategorySelection";

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
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
          {/* TODO: before the user edits the title, it must be {entry.title} as a default */}
          <IonItem style={{ fontSize: "18px" }}>
            <IonInput
              placeholder="Enter the title"
              ref={titleRef}
              value={entryData?.title}></IonInput>
          </IonItem>
        </div>
        {/* TODO: before the user edits the category, it must be {entry.category} as a default */}
        <CategorySelection
          selectedCategory={entryData?.category ?? ""}
          categories={categories}
          onCategoryChange={setSelectedCategory}
        />
        {/* TODO: before the user edits the content, it must be {entry.content[0]} as a default */}
        <ContentEditor
          content={entryData?.content[0]?.text ?? ""}
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
            onClick={() => {
              handleEdit(
                titleRef,
                content,
                selectedDate,
                selectedCategory,
                history
              );
            }}>
            Save
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default EditPage;
