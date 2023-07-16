import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonSearchbar } from "@ionic/react";
import ViewList from "./ViewListSub/ViewList";
import ViewHeader from "./ViewListSub/ViewHeader";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";
  const entriesData = useFetchEntriesData();

  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const page = useRef(undefined);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  // always update filtered entries
  useEffect(() => {
    setPresentingElement(page.current);
    const fetchData = async () => {
      try {
        const data = await entriesData;
        setEntries(data.filter((entry) => entry.date === selectedDate));
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };
    fetchData();
  }, [entriesData, selectedDate]);

  return (
    <>
      <IonContent>
        <ViewHeader
          selectedDate={selectedDate}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <IonSearchbar showClearButton="focus"></IonSearchbar>

        <ViewList
          entries={entries}
          editMode={editMode}
          setEntries={setEntries}
          setSelectedEntry={setSelectedEntry}
        />
      </IonContent>
    </>
  );
};

export default ViewDatePage;
