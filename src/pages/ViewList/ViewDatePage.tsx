import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  IonContent,
  IonSearchbar,
  IonIcon,
  IonButton,
  IonButtons,
} from "@ionic/react";
import ViewList from "./ViewListSub/ViewList";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";
import { closeCircleOutline } from "ionicons/icons";
import { EntriesData } from "../../GetPutData";

const ViewDatePage = () => {
  const location = useLocation<{ selectedDate?: string }>();
  const selectedDate = location?.state?.selectedDate || "";
  const entriesData = useFetchEntriesData();

  const filteredEntries = entriesData.filter(
    (entry) => entry.date === selectedDate
  );

  const [editMode, setEditMode] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);


  useEffect(() => {
    //setPresentingElement(page.current);
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

  const handleEditClick = () => {
    setEditMode(true); 
  };

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
              onClick={handleEditClick}>
              Edit
            </IonButton>
          </IonButtons>
        </div>

        <IonSearchbar showClearButton="focus"></IonSearchbar>
        <ViewList
          editMode={editMode}
          setEditMode={setEditMode}
          entries={filteredEntries}
          selectedDate={selectedDate}
        />
      </IonContent>
    </>
  );
};

export default ViewDatePage;
