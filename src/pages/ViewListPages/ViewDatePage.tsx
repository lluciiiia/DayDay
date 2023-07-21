import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonSearchbar } from "@ionic/react";
import ViewList from "./ViewListSub/ViewList/ViewList";
import ViewHeader from "./ViewListSub/ViewHeader";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";
import { Entry } from "../../data/interfaces";

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
          selectionType="date"
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
