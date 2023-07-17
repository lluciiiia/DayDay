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
  editMode: boolean;
  selectedDate: string;
  entriesData: Entry[];
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setSelectedEntry: (entry: Entry) => void;
}

const ViewList: React.FC<ViewListProps> = ({
  editMode,
  selectedDate,
  entriesData,
  entries,
  setEntries,
  setSelectedEntry,
}) => {
  const history = useHistory();

  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");

  // useEffect to filter entries based on the selectedDate
  useEffect(() => {
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

  const handleDeleteEntry = (index: number, entry: Entry) => {
    const updatedData = entries.filter((_, i) => i !== index);
    setEntries(updatedData);

    const entriesData = new EntriesData();
    entriesData.deleteEntriesData(entry);
  };

  const handleEntryClick = (selectedEntry: Entry) => {
    setSelectedEntry(selectedEntry);
    history.push("/view", { entryData: selectedEntry });
  };

  return (
    <IonList>
      {entries.map((entry, index) => (
        <IonItem key={entry.id} style={{ padding: "7px", fontSize: "18px" }}>
          {editMode && (
            <>
              <IonIcon
                id="present-alert"
                icon={closeCircleOutline}
                style={{ fontSize: "22px", marginRight: "10px" }}
              />
              <IonAlert
                header="the diary will be permanently removed"
                trigger="present-alert"
                buttons={[
                  {
                    text: "Cancel",
                  },
                  {
                    text: "Confirm",
                    handler: () => {
                      handleDeleteEntry(index, entry);
                    },
                  },
                ]}
                ></IonAlert>
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
  );
};

export default ViewList;
