import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonSearchbar } from "@ionic/react";
import ViewCategoryList from "./ViewListSub/ViewCategoryList";
import ViewCategoryHeader from "./ViewListSub/ViewCategoryHeader";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";

const ViewCategoryPage = () => {
  const location = useLocation<{ selectedCategory?: string }>();
  const selectedCategory = location?.state?.selectedCategory || "";
  const entriesData = useFetchEntriesData();

  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  return (
    <>
      <IonContent>
        <ViewCategoryHeader
          selectedCategory={selectedCategory}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <IonSearchbar showClearButton="focus"></IonSearchbar>

        <ViewCategoryList
          editMode={editMode}
          selectedCategory={selectedCategory}
          entriesData={entriesData}
          entries={entries}
          setEntries={setEntries}
          setSelectedEntry={setSelectedEntry}
        />
      </IonContent>
    </>
  );
};

export default ViewCategoryPage;
