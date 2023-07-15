import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, useIonToast, IonSearchbar } from "@ionic/react";
import "../../main.css";
import { EntriesData } from "../../../GetPutData";
import ViewHeader from "./tmpHeader";
import useFetchEntriesData from "./fetchEntriesData";

const ViewPage = () => {
  // From CalendarPage or CategoryPage
  const location = useLocation<{
    selectedDate?: string;
    selectedCategory?: string;
  }>();
  const selectedDate = location?.state?.selectedDate || "";
  const selectedCategory = location?.state?.selectedCategory || "";

  const entriesData = useFetchEntriesData();

  // TODO: dynamic? fetch (by date, category)
  const filteredEntriesByDate = entriesData.filter(
    (entry) => entry.date === selectedDate
  );
  const filteredEntriesByCategory = entriesData.filter(
    (entry) => entry.category === selectedCategory
  );

  // from here, for new header / list
  const [entries, setEntries] = useState<string[]>([]);
  const entryRef = useRef<HTMLIonInputElement>(null);
  const page = useRef(undefined);
  const [editMode, setEditMode] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  return (
    <IonContent scrollY={true}>
      {/* TODO: entriesData type -> Header props edit */}
      <ViewHeader
        editMode={editMode}
        setEditMode={setEditMode}
        selectedEntry={selectedEntry}
        setSelectedEntry={setSelectedEntry}
        entryRef={entryRef}
        entries={entries}
        // only different part: selectedDate or selectedCategory 
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <IonSearchbar showClearButton="focus" />
      </div>

      {/* <ViewList /> */}
    </IonContent>
  );
};

export default ViewPage;
