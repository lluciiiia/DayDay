import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonSearchbar } from "@ionic/react";
import ViewList from "./ViewListSub/ViewList/ViewList";
import ViewHeader from "./ViewListSub/ViewHeader";
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
        <ViewHeader
          selectionType="category"
          selectedCategory={selectedCategory}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <IonSearchbar showClearButton="focus"></IonSearchbar>

        <ViewList
          editMode={editMode}
          selectionType="category"
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
