import React, { useRef, useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonToast,
  IonInput,
  IonItem,
  IonSelectOption,
  IonSelect,
  IonList,
  SelectChangeEventDetail,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { AddAll } from "./UpdateAll";
import { CategoriesData } from "../GetPutData";

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
      content: [],
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

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
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
              onIonChange={handleCategoryChange as any}
            >
              {categories.map((category: string) => (
                <IonSelectOption value={category} key={category}>
                  {category}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonList>
        </div>
        <div
          style={{
            height: 570,
            overflowY: "scroll",
            maxWidth: 370,
            margin: "auto",
            padding: "0px 3px 20px 3px",
          }}
        >
          <textarea
            value={content}
            onChange={handleContentChange}
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              borderRadius: 10,
              borderColor: "transparent",
              fontSize: "16px",
            }}
            placeholder="Enter your diary here"
          ></textarea>
        </div>
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
          }}
        >
          <IonButton
            fill="outline"
            id="save"
            style={{ width: "160px" }}
            onClick={handleSave}
          >
            Save
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default AddPage;
