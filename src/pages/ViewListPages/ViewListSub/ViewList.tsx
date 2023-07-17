import { useEffect, useState } from "react";
import {
  IonItem,
  IonList,
  IonIcon,
  IonLabel,
  IonButton,
  IonAlert,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { EntriesData } from "../../../GetPutData";
import { useHistory } from "react-router-dom";

interface ViewListProps {
  selectionType: "category" | "date";
  selectedCategory?: string;
  selectedDate?: string;
  editMode: boolean;
  entriesData: Entry[];
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setSelectedEntry: (entry: Entry) => void;
}

const ViewList: React.FC<ViewListProps> = ({
  selectionType,
  selectedCategory,
  selectedDate,
  editMode,
  entriesData,
  entries,
  setEntries,
  setSelectedEntry,
}) => {
  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const [deletingEntry, setDeletingEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await entriesData;
        let filteredEntries: Entry[] = [];

        if (selectionType === "date") {
          filteredEntries = data.filter((entry) => entry.date === selectedDate);
        } else if (selectionType === "category") {
          filteredEntries = data.filter(
            (entry) => entry.category === selectedCategory
          );
        }

        setEntries(filteredEntries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchData();
  }, [entriesData, selectedDate, selectedCategory, selectionType]);

  const handleDeleteEntry = (entryToDelete: Entry) => {
    const entryIndex = entries.indexOf(entryToDelete);
    if (entryIndex !== -1) {
      const updatedData = [...entries];
      updatedData.splice(entryIndex, 1);
      setEntries(updatedData);

      const entriesDataInstance = new EntriesData();
      entriesDataInstance.deleteEntriesData(entryToDelete);
    }
  };
  

  const handleEntryClick = (selectedEntry: Entry) => {
    setSelectedEntry(selectedEntry);
    history.push("/view", { entryData: selectedEntry });
  };

  return (
    <>
      <IonList>
        {entries.map((entry) => (
          <IonItem key={entry.id} style={{ padding: "7px", fontSize: "18px" }}>
            {editMode && (
              <>
                <IonIcon
                  id="present-alert"
                  icon={closeCircleOutline}
                  style={{ fontSize: "22px", marginRight: "10px" }}
                  onClick={() => {
                    // Show the alert only for the first item
                    if (!showAlert) {
                      setShowAlert(true);
                      setDeletingEntry(entry);
                    }
                  }}
                />
              </>
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
                    position: "relative",
                    fontSize: "21px",
                    fontWeight: "bold",
                    flexGrow: 1,
                  }}>
                  {entry.title}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    fontSize: "14px",
                    color: "rgb(165, 165, 165)",
                    marginTop: "28px",
                    marginRight: "10px",
                  }}>
                  {selectionType === "category" ? entry.date : entry.category}
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

      {/* Alert */}
      <IonAlert
        isOpen={showAlert}
        header="The diary will be permanently removed"
        buttons={[
          {
            text: "Cancel",
            handler: () => {
              setShowAlert(false); 
              setDeletingEntry(null);
            },
          },
          {
            text: "Confirm",
            handler: () => {
              handleDeleteEntry(deletingEntry!); 
              setShowAlert(false); 
              setDeletingEntry(null);
            },
          },
        ]}
      ></IonAlert>
    </>

  );
};

export default ViewList;
