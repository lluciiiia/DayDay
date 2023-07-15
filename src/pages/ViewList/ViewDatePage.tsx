import {useState, useRef} from "react";
import { useLocation,  } from "react-router-dom";
import { IonContent, IonSearchbar,  } from "@ionic/react";
import ViewList from "./ViewListSub/ViewList";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";
import CategoryHeader from "../CategoryPage/CategorySub.tsx/CategoryHeader";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";
  const entriesData = useFetchEntriesData();
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const categoryRef = useRef<HTMLIonInputElement>(null);
  const page = useRef(undefined);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const filteredEntries = entriesData.filter(
    (entry) => entry.date === selectedDate
  );

  return (
    <>
      <IonContent>
        <p
          style={{
            fontSize: "28px",
            marginLeft: "15px",
            fontWeight: "bold",
            marginTop: "35px",
            marginBottom: "10px",
          }}>
          {selectedDate}
        </p>
        {/* <CategoryHeader
        editMode={editMode}
        setEditMode={setEditMode}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryRef={categoryRef}
        categories={categories}
      /> */}

        <IonSearchbar showClearButton="focus"></IonSearchbar>
        <ViewList entries={filteredEntries} />
      </IonContent>
    </>
  );
};

export default ViewDatePage;
