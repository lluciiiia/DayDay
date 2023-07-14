// AddPage.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
  SelectCustomEvent,
  SelectChangeEventDetail,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { AddAll } from "../UpdateAll";
import { CategoriesData } from "../../GetPutData";
import ContentEditor from "./AddSub/ContentEditor";

interface LocationState {
  selectedDate: string;
}

const AddPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [content, setContent] = useState("");
  const [present] = useIonToast();
  const selectedDate = location.state?.selectedDate;
  const titleRef = useRef<HTMLIonInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = new CategoriesData();
      const categories = await categoriesData.getCategoriesData();
      setCategories(categories);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    const title = titleRef.current?.value as string;

    if (title.trim() === "") {
      presentToast("Please enter your diary title");
      return;
    }
    if (content.trim() === "") {
      presentToast("Please enter your diary content");
      return;
    }

    const entry: Entry = {
      content:   [{
        type: "text",
        text: content,
      },],
      date: selectedDate,
      title: title,
      category: selectedCategory,
    };

    try {
      AddAll(entry);

      presentToast("Your diary is saved!");
      setTimeout(() => {
        history.push("/calendar");
      }, 300);
    } catch (error) {
      console.error(error);
      presentToast("Failed to save your diary.");
    }
  };

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 300,
      position: "middle",
    });
  };

  const handleCategoryChange = (
    event: CustomEvent<SelectChangeEventDetail<any>>
  ) => {
    setSelectedCategory(event.detail.value);
  };

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
            <IonInput placeholder="Enter the title" ref={titleRef}></IonInput>
          </IonItem>
        </div>
        <div style={{ marginLeft: "18px", marginBottom: "5px" }}>
          <IonList>
            <IonSelect
              aria-label="category"
              placeholder="Select Category"
              value={selectedCategory}
              onIonChange={handleCategoryChange as any}>
              {categories.map((category: string) => (
                <IonSelectOption value={category} key={category}>
                  {category}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonList>
        </div>
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
            onClick={handleSave}>
            Save
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default AddPage;
