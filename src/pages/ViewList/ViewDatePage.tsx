import { useState, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  IonContent,
  IonSearchbar,
  IonIcon,
  IonButton,
  IonButtons,
  IonLabel,
  IonList,
  IonItem,
} from "@ionic/react";
//import ViewList from "./ViewListSub/ViewList";
import useFetchEntriesData from "./ViewListSub/fetchEntriesData";
import { EntriesData } from "../../GetPutData";
import { closeCircleOutline } from "ionicons/icons";

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
  const history = useHistory();

  useEffect(() => {
    setPresentingElement(page.current);
    // get data from backend
    const fetchData = async () => {
      try {
        const data = await entriesData;
        setEntries(data.filter((entry) => entry.date === selectedDate));
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };
    fetchData();
  }, [entriesData, selectedDate]); // Update filteredEntries when entriesData or selectedDate changes


  const handleDeleteEntry = (index: number, entry: Entry) => {
    console.log("delete clicked");
    console.log("entry before updating", entry);
    const updatedData = entries.filter((_, i) => i !== index);
    console.log("entry after updating", updatedData);
    setEntries(updatedData);

    const entriesData = new EntriesData();
    entriesData.deleteEntriesData(entry);
  };

  const handleEntryClick = (selectedEntry: Entry) => {
    console.log("entry clicked");
    setSelectedEntry(selectedEntry);
    history.push("/view", { entryData: selectedEntry });
  };

  const handleEditClick = () => {
    // Set the selected entry to the first entry in the list
    setSelectedEntry(entries[0]);
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
        <IonList>
          {entries.map((entry, index) => (
            <IonItem
              key={entry.id}
              style={{ padding: "7px", fontSize: "18px" }}>
              {editMode && (
                <IonIcon
                  icon={closeCircleOutline}
                  style={{
                    fontSize: "22px",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    setSelectedEntry(entry);
                    handleDeleteEntry(index, entry);
                  }}
                />
              )}
              <IonLabel onClick={() => handleEntryClick(entry)}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        fontSize: "21px",
                        fontWeight: "bold",
                        marginRight: "auto",
                      }}>
                      {entry.title}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgb(165, 165, 165)",
                        marginLeft: "auto",
                        marginTop: "10px",
                      }}>
                      {entry.category}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "16px",
                      marginTop: "5px",
                      marginBottom: "15px",
                    }}>
                    {entry.content && entry.content[0] && entry.content[0].text
                      ? entry.content[0].text.length > 30
                        ? `${entry.content[0].text.substring(0, 88)}...`
                        : entry.content[0].text
                      : ""}
                  </div>
                </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default ViewDatePage;
