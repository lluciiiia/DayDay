import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonSearchbar } from "@ionic/react";
import ViewList from "./ViewListSub/ViewDateList";
import ViewHeader from "./ViewListSub/ViewHeader";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";
  const entriesData = useFetchEntriesData();

  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  return (
    <>
      <IonContent>
        <ViewHeader
          selectionType="date"
          selectedDate={selectedDate}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <IonSearchbar showClearButton="focus"></IonSearchbar>

        <ViewList
          editMode={editMode}
          selectedDate={selectedDate}
          entriesData={entriesData}
          entries={entries}
          setEntries={setEntries}
          setSelectedEntry={setSelectedEntry}
        />
      </IonContent>
    </>
  );
};

export default ViewDatePage;
