import { useState, useRef, useEffect } from "react";
import { IonContent, useIonToast, IonSearchbar } from "@ionic/react";
import "../../main.css";
import { EntriesData } from "../../../GetPutData";

const CategoryMain = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const entryRef = useRef<HTMLIonInputElement>(null);
  const page = useRef(undefined);
  const [editMode, setEditMode] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
    // get data from backend
    const entriesData = new EntriesData();
    entriesData
      .getEntriesData()
      .then((data) => {
        setEntries(data);
      })
      .catch((error) => {
        console.error("Error fetching entries:", error);
      });
  }, []);

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
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <IonSearchbar showClearButton="focus" />
      </div>

      {/* <ViewList /> */}
    </IonContent>
  );
};

export default CategoryMain;
