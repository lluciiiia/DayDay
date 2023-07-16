import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IonContent, IonSearchbar, IonButton, IonButtons } from "@ionic/react";
import ViewList from "./ViewListSub/ViewList";
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
        <div style={{ display: "flex", flexDirection: "row" }}>
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

          {editMode && (
            <IonButtons>
              <IonButton
                style={{ marginTop: "27px", marginLeft: "168px" }}
                onClick={() => setEditMode(false)}>
                Done
              </IonButton>
            </IonButtons>
          )}
          <IonButtons>
            <IonButton
              style={{
                display: editMode ? "none" : "block",
                marginTop: "27px",
                marginLeft: "174px",
              }}
              onClick={() => setEditMode(true)}>
              Edit
            </IonButton>
          </IonButtons>
        </div>

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
