import { useHistory } from "react-router-dom";
import { IonItem, IonList, IonIcon, IonLabel } from "@ionic/react";
import { EntriesData } from "../../../GetPutData";
import { closeCircleOutline, informationCircleOutline } from "ionicons/icons";

interface ViewListProps {
  editMode: boolean;
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setSelectedEntry: (entry: Entry) => void;
  selectedDate: string;
}

const ViewList: React.FC<ViewListProps> = ({
  editMode,
  entries,
  setEntries,
  setSelectedEntry,
  selectedDate,
}) => {
  const history = useHistory();

  const filteredEntries = entries.filter(
    (entry) => entry.date === selectedDate
  );

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

  return (
    <IonList>
      {filteredEntries.map((entry, index) => (
        <IonItem key={entry.id} style={{ padding: "7px", fontSize: "18px" }}>
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
  );
};

export default ViewList;
